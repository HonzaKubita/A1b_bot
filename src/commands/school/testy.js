const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const db = require('../../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('testy')
    .setDescription('Seznam testů'),
  async execute(interaction, client) {

    const tableContent = await db.query("SELECT * FROM test");
  
    const embed = new EmbedBuilder()
      .setTitle("Seznam testů")
      .setColor(client.color)

    if(!tableContent.rows[0]) {
      embed.setDescription("Žádné testy nemáme")
    }
      
    for (const test of tableContent.rows) {
      embed.addFields({
        name: test.title,
        value: `
          Popis: ${test.description}
          Predmět: ${test.subject}
          Kdy: <t:${Math.floor(new Date(test.date).getTime() / 1000)}:D>
          Id: ${test.id}
        `
      })
    }

    await interaction.reply({
      embeds:[embed]
    })
  }
}