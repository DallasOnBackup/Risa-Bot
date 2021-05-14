const Discord = require("discord.js")

exports.run = async(client, message, args) => {
  var waitTime = 0
  if (args.length == 1)
    waitTime += args[0] * 1000
  if (args.length == 2) {
    waitTime += args[1] * 1000
    waitTime += args[0] * 60000
  } if (args.length >= 3) {
    waitTime += args[2] * 1000
    waitTime += args[1] * 60000
    waitTime += args[0] * 3600000
  }
  if (waitTime >= 10000)
    message.reply(`Timer set for ${waitTime/1000} seconds!`)

  const embed = new Discord.MessageEmbed()
    .setColor(client.config.color)
    .setTitle("Time is up!")
    .setDescription(message.author)
  setTimeout(function() {
    message.reply(embed)
  }, waitTime)
}