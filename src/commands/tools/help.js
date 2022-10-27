const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('List of supported commands'),
  async execute(interaction, client) {

    const newEmbed = new EmbedBuilder()
      .setColor(client.color)
      .setTitle("Help")
      .setDescription("List of supported commands")
      .setThumbnail(client.user.displayAvatarURL())

    for (const command of client.commandArray) {
      newEmbed.addFields({
        name: `/${command.name}`,
        value: command.description,
      })
    }

    await interaction.reply({
      embeds:[newEmbed]
    })
  }
}