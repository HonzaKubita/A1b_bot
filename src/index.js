const fs = require('fs');
require('dotenv').config();
schedule = require('node-schedule');

const db = require('./db');

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];
client.buttons = new Collection();
client.color = 0x00c2cb;

client.DEV = process.env.DEV == "true";
client.TOKEN = client.DEV ? process.env.TEST_DISCORD_TOKEN : process.env.DISCORD_TOKEN;
client.id = client.DEV ? "1035956391967457311" : "1033403513985847346";

console.warn("Running in DEV mode!");

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

client.login(client.TOKEN);

db.connect(err => {
  if (err) console.error(err);
  else console.log("[DB STATUS]: Connected");
});

schedule.scheduleJob("30 17 * * *", async () => {
  // This function will run every day at 17:00
  client.cleanDB(client);
  client.pingWithUpcoming(client);
});