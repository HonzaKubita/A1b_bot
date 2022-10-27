const { EmbedBuilder } = require('discord.js');
const db = require('../../db');

module.exports = async (client) => {
  client.pingWithUpcoming = async (client) => {
    const channel = await client.channels.cache.get('1035252491241132083');
    
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
          Kdy: <t:${Math.floor(new Date(test.date).getTime() / 1000)}>
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
          Do: <t:${Math.floor(new Date(homework.due).getTime() / 1000)}>
        `
      })
    }

    await channel.send({
      content: "**Seznam nadcházejících úkolů a testů (na zítra)** <@&1035264245966831616>",
      embeds:[embedTests, embedHomeworks]
    })
  }
}