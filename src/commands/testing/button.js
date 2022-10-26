const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('button')
    .setDescription('button test'),
  async execute(interaction, client) {

    const button = new ButtonBuilder()
      .setCustomId("testButton")
      .setLabel("test button")
      .setStyle(ButtonStyle.Success);
  
    await interaction.reply({
      content: "There should be a button below me",
      components: [new ActionRowBuilder().addComponents(button)]
    })
  }
}