const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const db = require('../../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dbtest')
    .setDescription('Sends everything from homeworks table'),
  async execute(interaction, client) {

    const tableContent = await db.query("SELECT * FROM homeworks WHERE id=1");

    const rowContent = tableContent.rows[0]
  
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `DB Query (id=${rowContent.id})`
      })
      .setTitle(rowContent.title)
      .setDescription(rowContent.description)
      .setColor(client.color)
      .addFields(
        {
          name: "Subject",
          value: rowContent.subject
        },
        {
          name: "Due:",
          value: `<t:${Math.floor(new Date(rowContent.due).getTime() / 1000)}>`
        }
      );

    await interaction.reply({
      embeds:[embed]
    })
  }
}