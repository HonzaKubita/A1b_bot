const { SlashCommandBuilder } = require('discord.js');
const db = require('../../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reactionrole')
    .setDescription('prida/odebere novou reaction role')

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
        .setRequired(true))

    .addBooleanOption(option =>
      option.setName('odebrat')
        .setDescription('odebrat tuto reactionrole')
        .setRequired(true)),

  async execute(interaction, client) {

    const guild = interaction.guild;

    const emoji= interaction.options.getString('emoji').trim();
    const roleid = interaction.options.getRole('role').id;
    const messageid = interaction.options.getString('messageid');
    const remove = interaction.options.getBoolean('odebrat');

    const queryValues_reactioncallback = [guild.id, messageid, "reactionrole"];
    const queryValues_reactionrole = [guild.id, messageid, emoji, roleid]

    const message = await interaction.channel.messages.fetch(messageid);

    if (remove) {
      try {
        await db.query(`DELETE FROM "reactioncallback" WHERE "guild"='${guild}' and "messageid"='${messageid}' and "callback"='reactionrole'`);
        await db.query(`DELETE FROM "reactionrole" WHERE "guild"='${guild}' and "messageid"='${messageid}' and "emoji"='${emoji}' and "roleid"='${roleid}'`);
        
        message.reactions.resolve(emoji).users.remove(client.id);
        
        interaction.reply({
          content: "Reaction role odebrána",
          ephemeral: true
        })

      } catch (err) {
        console.error(err);
        interaction.reply({
          content: "Nastala chyba při odebírání reaction role",
          ephemeral: true
        })
      }
    } else {
      try {
        await db.query("INSERT INTO reactioncallback(guild, messageid, callback) VALUES ($1, $2, $3)", queryValues_reactioncallback); // Register callback
        await db.query("INSERT INTO reactionrole(guild, messageid, emoji, roleid) VALUES ($1, $2, $3, $4)", queryValues_reactionrole);
        
        message.react(emoji);

        interaction.reply({
          content: "Reaction role přidána",
          ephemeral: true
        })

      } catch (err) {
        interaction.reply({
          content: "Nastala chyba při přidávání reactionrole",
          ephemeral: true
        })
      }
    }

  }
}