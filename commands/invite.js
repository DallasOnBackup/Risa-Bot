const Discord = require("discord.js")

exports.run = async(client, message, args) => {
  var embed = new Discord.MessageEmbed()
  .setColor(client.config.color)
  .setTitle("Click Me!")
  .setURL("https://discord.com/api/oauth2/authorize?client_id=824186494385520691&permissions=8&scope=bot")
  message.channel.send(embed)
}