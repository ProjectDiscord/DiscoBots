module.exports = async (client) => {
  const { readdirSync } = require("node:fs");

  let slash = [];

  const commandFolders = readdirSync("./discord/botlist/slashCommands");
  for (const folder of commandFolders) {
    const commandFiles = readdirSync(
      `./discord/botlist/slashCommands/${folder}`
    ).filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`../slashCommands/${folder}/${file}`);
      if (command?.data && command?.data.name) {
        client.slashCommands.set(command.data.name, command);
        slash.push(command.data.toJSON());
      } else {
        continue;
      }
    }
  }
  client.once("ready", async () => {
    await client.application.commands.set(slash);
  });
};
