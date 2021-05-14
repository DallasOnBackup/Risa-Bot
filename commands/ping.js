const Discord = require("discord.js")

exports.run = async(client, message, args) => {
  const embed = new Discord.MessageEmbed()
  .setTitle(`Risa has a Ping of ${Date.now() - message.createdTimestamp}ms!`)

  message.channel.send(embed);
}