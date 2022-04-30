const fs = require("node:fs");
const {
  Client,
  Collection,
  Intents,
  MessageAttachment,
} = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  const channel = client.channels.cache.get("877878819497840660");
  const file = new MessageAttachment(
    "https://sun9-74.userapi.com/impg/NvFPRJNWSGgttBAN8iqQoJ0tv_Md3s18XcPc5w/NdAtUWJ84Eo.jpg?size=604x482&quality=96&sign=8e1d62d1937bed3141658153a983bb06&type=album",
    "isThisReal.png"
  );
  channel.send({
    files: [file],
  });
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(token);
