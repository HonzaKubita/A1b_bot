const { SlashCommandBuilder } = require('discord.js');
const db = require('../../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reactionrole')
    .setDescription('prida novou reaction role')

    .addStringOption(option =>
      option.setName('emoji')
        .setDescription('reaction role emoji')
        .setRequired(true))

    .addRoleOption(option =>
      option.setName('role')
        .setDescription('reaction role role')
        .setRequired(true))
        
    .addStringOption(option =>
      option.setName('messageid')
        .setDescription('message id')
        .setRequired(true)),

  async execute(interaction, client) {

    const guild = interaction.guild;

    const emoji= interaction.options.getString('emoji').trim();
    const role = interaction.options.getRole('role');
    const messageid = interaction.options.getString('messageid');

    const queryValues_reactioncallback = [guild.id, messageid, "reactionrole"];
    const queryValues_reactionrole = [guild.id, messageid, emoji, role]

    const message = await interaction.channel.messages.fetch(messageid);
    message.react(emoji);

    let newMessage = "";

    await db.query("INSERT INTO reactioncallback(guild, messageid, callback) VALUES ($1, $2, $3)", queryValues_reactioncallback); // Register callback

    await db.query("INSERT INTO reactionrole(guild, messageid, emoji, role) VALUES ($1, $2, $3, $4)", queryValues_reactionrole, (err, res) => {
      if (err) {
        newMessage = "Nastala chyba při přidávání reactionrole";
      } else {
        newMessage = "Reactionrole přidána";
      }

      interaction.reply({
        content: newMessage
      })
    });
  }
}