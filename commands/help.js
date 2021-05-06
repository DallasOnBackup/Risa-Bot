const Discord = require("discord.js")

exports.run = async(client, message, args) => {
let embed = new Discord.MessageEmbed()
.setColor("#FFF")
.setAuthor(client.user.tag, "https://cdn.discordapp.com/avatars/824186494385520691/8558cd9cb2b8ed4458353a4749b7757d.png")
.setDescription("These are all of the Planned commands for Risa!")
.addFields(
  {name: "Moderation", value: "`ban` | `tempban` | `kick` | `tempkick` | `mute` | `tempmute`"},
  {name: "Music", value: "`play` | `pause` | `resume` | `stop` | `leave` | `skip` | `queue` | `remove`"},
  {name: "Bot", value: "`ping` | `owner` | `about` | `help` | `invite`"},
  {name: "Utility", value: "`coinflip` | `timer` | `urban` | 'av'"}
)
.setFooter("NOTICE: THESE COMMANDS ARE PLANNED, NONE OF THEM ACTUALLY CURRENTLY WORK!")
message.channel.send(embed)
}