const fs = require('fs');

module.exports = (client) => {
  client.handleReactionCallbacks = async () => {
    const callbacksFolder = fs
      .readdirSync("./src/reactionCallbacks")
      .filter((file) => file.endsWith(".js"));

    for (const file of callbacksFolder) {

      const { reactionCallbacks } = client;

      const callback = require(`../../reactionCallbacks/${file}`);
      reactionCallbacks.set(callback.name, callback);

    }
  }
}