const Discord = require("discord.js")
const fs = require("fs")

exports.run = async(client, message, args) => {
  const embed = new Discord.MessageEmbed()
  .setColor(client.config.color)
  .setAuthor(client.user.tag,   "https://cdn.discordapp.com/avatars/824186494385520691/8558cd9cb2b8ed4458353a4749b7757d.webp")
  .setTitle("Support Server!")
  .setURL("https://discord.gg/uUn5uTUBNz")
  .setDescription("These are all of the Planned commands for Risa!")
  .setURL("https://discord.gg/uUn5uTUBNz")
  .addFields(
    {name: "Moderation", value: "`ban` | `tempban` | `kick` | `tempkick` | `mute` | `tempmute`"},
    {name: "Music", value: "`play` | `pause` | `resume` | `stop` | `leave` | `skip` | `queue` | `remove`"},
    {name: "Bot", value: "`ping` | `owner` | `about` | `help` | `invite`"},
    {name: "Utility", value: "`coinflip` | `timer` | `urban` | `av`"}
  )
  message.author.send(embed)
}