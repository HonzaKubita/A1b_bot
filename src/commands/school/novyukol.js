const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const db = require('../../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('novyukol')
    .setDescription('přidá nový úkol')

    .addStringOption(option =>
      option.setName('nadpis')
        .setDescription('nadpis úkolu (př. Úkol ZE)')
        .setRequired(true))

    .addStringOption(option =>
      option.setName('popis')
        .setDescription('trochu rozvedenější popis úkolu')
        .setRequired(true))
    
    .addStringOption(option =>
      option.setName('předmět')
        .setDescription('předmět ze kterého je úkol')
        .setRequired(true)
        .addChoices(
          { name: 'angličtina', value: 'A' },
          { name: 'čeština', value: 'C' },
          { name: 'dějepis', value: 'D' },
          { name: 'díleňská cvičení', value: 'DC' },
          { name: 'fyzika', value: 'F' },
          { name: 'chemie', value: 'CH' },
          { name: 'matematika', value: 'M' },
          { name: 'it', value: 'IT' },
          { name: 'technická dokumentace', value: 'TD' },
          { name: 'základy elektrotechniky', value: 'ZE' },
          { name: 'zsv', value: 'ZSV' },
        ))
      
    .addStringOption(option =>
      option.setName('datum')
        .setDescription('datum formátu rok-měsíc-den (př. 2022-8-24)')
        .setRequired(true)),

  async execute(interaction, client) {

    const title = interaction.options.getString('nadpis');
    const description = interaction.options.getString('popis');
    const subject = interaction.options.getString('předmět');
    const date = interaction.options.getString('datum');

    const queryValues = [title, description, subject, date];

    const embed = new EmbedBuilder()
      .setColor(client.color);

    await db.query("INSERT INTO homework(title, description, subject, due) VALUES ($1, $2, $3, $4)", queryValues, (err, res) => {
      if (err) {
        console.log(err);
        embed
          .setColor(0xff0000)
          .setTitle("Nastala chyba při přidávání úkolu do databáze")
      } else {
        embed
          .setColor(0x00ff00)
          .setTitle("Úkol přidán do databáze")
      }
      interaction.reply({
        embeds:[embed]
      })
    });

  }
}