const { EmbedBuilder } = require('discord.js');
const db = require('../../db');

module.exports = async (client) => {
  client.cleanDB = async (client) => {

    const channels = await client.channels.cache.filter(channel => channel.name === "skola-oznameni");

    const embed= new EmbedBuilder()
      .setTitle("[Debug] Databáze vyčištěna od starých úkolů a testů")
      .setColor(0xffffff);

    await db.query("DELETE FROM test WHERE date<current_date");
    await db.query("DELETE FROM homework WHERE due<current_date");

    await channels.forEach(channel => {
      channel.send({
        embeds:[embed]
      })
    })
  }
}