const { ActivityType } = require('discord.js')

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
    
    client.user.setPresence({
      activities: [
        {
          name: "school stuff",
          type: ActivityType.Watching,
        }
      ],
      status: "online",
    })
    // client.cleanDB(client); // For testing
    // client.pingWithUpcoming(client); // For testing
  }
}