const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('oznameni')
    .setDescription('přepne jestli chcete dostávat oznámení o úkolech a testech'),
  async execute(interaction, client) {

    const role = interaction.guild.roles.cache.find(role => role.name === "skola oznameni");
    const member = interaction.member;
    let response = "";

    if (member.roles.cache.has(role.id)) {
      response = "Už nebudeš dostávat nová oznámení";
      member.roles.remove(role);
    } else {
      response = "Odteď budeš dostávat nová oznámení";
      member.roles.add(role);
    }

    await interaction.reply({
      content: response,
      ephemeral: true
    })
  }
}