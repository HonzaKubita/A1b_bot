module.exports = {
  data: {
    name: "testButton"
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: "You pressed test button"
    });
  }
}