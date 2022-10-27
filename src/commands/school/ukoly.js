const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const db = require('../../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ukoly')
    .setDescription('Seznam úkolů'),
  async execute(interaction, client) {

    const tableContent = await db.query("SELECT * FROM homework");
  
    const embed = new EmbedBuilder()
      .setTitle("Seznam úkolů")
      .setColor(client.color)
      
    for (const homework of tableContent.rows) {
      embed.addFields({
        name: homework.title,
        value: `
          Popis: ${homework.description}
          Predmět: ${homework.subject}
          Do: <t:${Math.floor(new Date(homework.due).getTime() / 1000)}>
        `
      })
    }

    await interaction.reply({
      embeds:[embed]
    })
  }
}