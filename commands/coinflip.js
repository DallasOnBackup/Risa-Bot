const Discord = require("discord.js")

exports.run = async(client, message, args) => {
  const embed = new Discord.MessageEmbed()
  if (Math.floor(Math.random() * 2) == 0) {
    coinResult = "Heads!";
  } else {
    coinResult = "Tails!";
  }
  embed.setTitle(`It's **${coinResult}**!`)
  message.reply(embed);
}