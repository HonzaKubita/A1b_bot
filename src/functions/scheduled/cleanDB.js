const { EmbedBuilder } = require('discord.js');
const db = require('../../db');

module.exports = async (client) => {
  client.cleanDB = async (client) => {

    const channel = await client.channels.cache.get('1035252491241132083');

    const embed= new EmbedBuilder()
      .setTitle("[Debug] Databáze vyčištěna od starých úkolů a testů")
      .setColor(0xffffff);

    await db.query("DELETE FROM test WHERE date<current_date");
    await db.query("DELETE FROM homework WHERE due<current_date");

    await channel.send({
      embeds:[embed]
    })
  }
}