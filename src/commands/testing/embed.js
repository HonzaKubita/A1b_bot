const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Embed testing'),
  async execute(interaction, client) {

    const embed = new EmbedBuilder()
      .setAuthor({
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag
      })
      .setTitle("title")
      .setDescription("description")
      .setColor(client.color)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())

    await interaction.reply({
      embeds:[embed]
    })
  }
}