const db = require('../../db');

module.exports = {
  name: "messageReactionAdd",
  async execute(reaction, user, client) {
    if (user.id === client.user.id) return;

    console.log("Reaction");
    const messageid = reaction.message.id;
    
    const tableContent = await db.query(`SELECT "callback" FROM "reactioncallback" WHERE "messageid" = '${messageid}'`);

    if (!tableContent.rows[0]) return;

    const callbackName = tableContent.rows[0].callback;

    const { reactionCallbacks } = client
    const callback = reactionCallbacks.get(callbackName);
    if (!callback) return;

    callback.execute(user, reaction, client);
  }
}