const db = require("../db");

module.exports = {
  name: "reactionrole",
  async execute(reaction, user, client) {

    const messageid = reaction.message.id;
    const reactionEmoji = reaction.emoji.name;

    const tableContent = await db.query(`SELECT * FROM reactionrole WHERE "messageid"='${messageid}' and "emoji"='${reactionEmoji}'`);

    if (!tableContent.rows) return;

    const data = tableContent.rows[0];

    const guild = client.guilds.cache.get(data.guild);

    const member = guild.members.cache.get(user.id);
    const reactionrole = guild.roles.cache.find(role => role.id == data.roleid);

    if (reaction.added) member.roles.add(reactionrole)
    else member.roles.remove(reactionrole)

  }
}