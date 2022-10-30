const { EmbedBuilder } = require('discord.js');
const db = require('../../db');
const utils = require('../../utils');

module.exports = async (client) => {
  client.pingWithUpcoming = async (client) => {

    const holidays = await db.query(`SELECT * FROM event WHERE event.name='holiday' AND event.begining<=current_date AND event.end>current_date`);
    const isHoliday = holidays.rows[0]?? false;
    const today = utils.getDayName()

    console.log("Prazdniny: " + isHoliday);
    console.log("Today: " + today);

    if (isHoliday || today == "Friday" || today == "Saturday") return;

    const channels = await client.channels.cache.filter(channel => channel.name === "skola-oznameni");
    
    const upcomingTests = await db.query("SELECT * FROM test WHERE date=current_date + INTEGER '1'");
    const upcomingHomeworks = await db.query("SELECT * FROM homework WHERE due=current_date + INTEGER '1'");

    const embedTests = new EmbedBuilder()
      .setTitle("Testy")
      .setColor(0xff0000);

    if(!upcomingTests.rows[0]) {
      embedTests
        .setDescription("Zítra nejsou žádné testy")
        .setColor(0x00ff00);
    }
      
    for (const test of upcomingTests.rows) {
      embedTests.addFields({
        name: test.title,
        value: `
          Popis: ${test.description}
          Predmět: ${test.subject}
          Kdy: <t:${Math.floor(new Date(test.date).getTime() / 1000)}:D>
        `
      })
    }


    const embedHomeworks = new EmbedBuilder()
      .setTitle("Úkoly")
      .setColor(client.color);

      if(!upcomingHomeworks.rows[0]) {
        embedHomeworks
          .setDescription("Zítra nejsou žádné úkoly")
          .setColor(0x00ff00);
      }
      
    for (const homework of upcomingHomeworks.rows) {
      embedHomeworks.addFields({
        name: homework.title,
        value: `
          Popis: ${homework.description}
          Predmět: ${homework.subject}
          Do: <t:${Math.floor(new Date(homework.due).getTime() / 1000)}:D>
        `
      })
    }

    await channels.forEach(channel => {
      const role = channel.guild.roles.cache.find(role => role.name === "skola oznameni");
      channel.send({
        content: `**Seznam nadcházejících úkolů a testů (na zítra)** <@&${role.id}>`,
        embeds:[embedTests, embedHomeworks]
      })
    })
  }
}