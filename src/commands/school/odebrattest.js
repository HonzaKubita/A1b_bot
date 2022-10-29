const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const db = require('../../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('odebrattest')
    .setDescription('odebere test')

    .addIntegerOption(option =>
      option.setName('id')
        .setDescription('id testu (př. 5)')
        .setRequired(true)),

  async execute(interaction, client) {

    const embed = new EmbedBuilder()

    const testId = interaction.options.getInteger('id');

    await db.query("DELETE FROM test WHERE id=$1", [testId], (err, res) => {
      if (err) {
        console.log(err);
        embed
          .setColor(0xff0000)
          .setTitle("Nastala chyba při odebírání testu z databáze")
      } else {
        embed
          .setColor(0x00ff00)
          .setTitle("Test odebrán z databáze")
      }
      interaction.reply({
        embeds:[embed]
      })
    });

  }
}