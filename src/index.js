const fs = require('fs');
require('dotenv').config();
const schedule = require('node-schedule');

const db = require('./db');

const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');

const { Guilds, GuildMessages, GuildMessageReactions } = GatewayIntentBits;

const client = new Client({ 
  intents: [Guilds, GuildMessages, GuildMessageReactions],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
 });
client.commands = new Collection();
client.commandArray = [];
client.buttons = new Collection();
client.reactionCallbacks = new Collection();
client.color = 0x00c2cb;

client.DEV = process.env.DEV == "true";
client.TOKEN = client.DEV ? process.env.TEST_DISCORD_TOKEN : process.env.DISCORD_TOKEN;
client.id = client.DEV ? "1035956391967457311" : "1033403513985847346";

if (client.DEV)
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
client.handleReactionCallbacks();

console.log("Trying to login...");

client.login(client.TOKEN);

db.connect(err => {
  if (err) console.error(err);
  else console.log("[DB STATUS]: Connected");
});

schedule.scheduleJob("00 16 * * *", async () => {
  // This function will run every day at 16:00 UCT (17:00 Europe/Prague)
  client.pingWithUpcoming(client);
});

schedule.scheduleJob("00 00 * * *", async () => {
  // This function will run every day at 00:00 UCT (1:00 Europe/Prague)
  client.cleanDB(client);
});