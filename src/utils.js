const fs = require('fs');

const modules = {}

const utilsFiles = fs
  .readdirSync(`./src/utils`)
  .filter((file) => file.endsWith(".js"));

for (const file of utilsFiles) {
  const moduleName = file.replace(".js", "");
  modules[moduleName] = require(`./utils/${file}`);
}

module.exports = modules;