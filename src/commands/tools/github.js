const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('github')
    .setDescription('Sends a link to github repo with the source code of the bot'),
  async execute(interaction, client) {

    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setURL('https://github.com/HonzaKubita/SPSE_bot')
      .setAuthor({
        name: "GitHub"
      })
      .setTitle("Bot Source Code")
      .setDescription("Click to view github repo where is the source code of this bot")
      .setThumbnail("https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")

    await interaction.reply({
      embeds:[embed]
    })
  }
}