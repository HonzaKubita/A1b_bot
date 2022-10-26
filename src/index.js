require('dotenv').config();
const TOKEN = process.env.DISCORD_TOKEN;
const DB_TOKEN = process.env.DB_TOKEN;
const { connect } = require('mongoose');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];
client.buttons = new Collection();
client.color = 0x00c2cb

const funcionsFolder = fs.readdirSync(`./src/functions`);
for (const folder of funcionsFolder) {
  const functionFiles = fs
  .readdirSync(`./src/functions/${folder}`)
  .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client)
}

client.handleEvents();
client.handleCommands();
client.handleComponents();

console.log("Trying to login...");

client.login(TOKEN);
(async () => {
  connect(DB_TOKEN).catch(console.error);
})();