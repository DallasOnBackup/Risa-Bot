const Discord = require("discord.js")

exports.run = async(client, message, args) => {
  var embed = new Discord.MessageEmbed()
  .setColor(client.config.color)

  if (message.mentions.users.first() != null) {
    embed.setImage(message.mentions.users.first().displayAvatarURL())
  } else {
    embed.setImage(message.author.displayAvatarURL())
  }
  message.channel.send(embed)
}