const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const db = require('../../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('odebratukol')
    .setDescription('odebere úkol')

    .addIntegerOption(option =>
      option.setName('id')
        .setDescription('id úkolu (př. 5)')
        .setRequired(true)),

  async execute(interaction, client) {

    const embed = new EmbedBuilder()

    const homeworkId = interaction.options.getInteger('id');

    await db.query("DELETE FROM homework WHERE id=$1", [homeworkId], (err, res) => {
      if (err) {
        console.log(err);
        embed
          .setColor(0xff0000)
          .setTitle("Nastala chyba při odebírání úkolu z databáze")
      } else {
        embed
          .setColor(0x00ff00)
          .setTitle("Úkol odebrán z databáze")
      }
      interaction.reply({
        embeds:[embed]
      })
    });

  }
}