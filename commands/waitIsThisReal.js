const { MessageAttachment, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wait_is_this_real")
    .setDescription("Wait, is this real?"),
  async execute(interaction) {
    const exampleEmbed = new MessageEmbed()
      .setTitle("Some title")
      .setDescription("Description after the edit")
      .setImage(
        "https://sun9-74.userapi.com/impg/NvFPRJNWSGgttBAN8iqQoJ0tv_Md3s18XcPc5w/NdAtUWJ84Eo.jpg?size=604x482&quality=96&sign=8e1d62d1937bed3141658153a983bb06&type=album"
      );
    console.log(exampleEmbed);
    await interaction.reply("Pong!");
    await interaction.followUp({ content: "Pong again!", ephemeral: true });
  },
};
