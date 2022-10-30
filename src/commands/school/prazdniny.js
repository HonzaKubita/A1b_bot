const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const db = require('../../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prazdniny')
    .setDescription('vypne oznámení, protože o prázninách nechce nikdo ping (až na poslední den)')

    .addIntegerOption(option =>
      option.setName('delka')
        .setDescription('jak dlouho budou prázniny trvat')
        .setRequired(true)),

  async execute(interaction, client) {
  
    const embed = new EmbedBuilder()
      .setColor(client.color)

    const name = "holiday";
    const holidayLength = interaction.options.getInteger('delka');

    let now = new Date();
    let end = new Date(now.getTime());
    
    end.setDate(now.getDate() + holidayLength);

    now = now.toISOString().split('T')[0];
    end = end.toISOString().split('T')[0];

    const queryValues = [name, now, end];

    await db.query('INSERT INTO event("name", "begining", "end") VALUES ($1, $2, $3)', queryValues, (err, res) => {
      if (err) {
        console.log(err);
        embed
          .setColor(0xff0000)
          .setTitle("Nastala chyba při začínání prázdnin")
      } else {
        embed
          .setColor(0x00ff00)
          .setTitle("Prázdniny začaly")
      }

      interaction.reply({
        embeds:[embed]
      })
    })
  }
}