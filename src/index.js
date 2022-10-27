const fs = require('fs');
require('dotenv').config();
schedule = require('node-schedule');

const db = require('./db');

const TOKEN = process.env.DISCORD_TOKEN;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];
client.buttons = new Collection();
client.color = 0x00c2cb;

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

db.connect(err => {
  if (err) console.error(err);
  else console.log("[DB STATUS]: Connected");
});

schedule.scheduleJob("00 17 * * *", async () => {
  // This function will run every day at 17:00
  client.cleanDB();
  client.pingWithUpcoming(client);
});