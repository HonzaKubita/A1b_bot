const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const db = require('../../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('zrusitprazdniny')
    .setDescription('zruší aktuálně probíhající prázdniny'),

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

    await db.query(`DELETE FROM event WHERE name='holiday'`, (err, res) => {
      if (err) {
        console.log(err);
        embed
          .setColor(0xff0000)
          .setTitle("Nastala chyba při rušení prázdnin")
      } else {
        embed
          .setColor(0x00ff00)
          .setTitle("Prázdniny zrušeny")
      }

      interaction.reply({
        embeds:[embed]
      })
    })
  }
}