const Discord = require("discord.js")
const Pack = require("./functions")

exports.run = async(client, message, args) => {
  /* const embed = new Discord.MessageEmbed()
  .setColor(client.config.color)
  const mention = message.mentions.users.first()
  var result = Pack.hasPerms(message.member, ["KICK_MEMBERS"])
  if (result.length == 0) {
    if (mention) {
      const member = message.guild.member(mention)
      if (member) {
        member
          .kick(args.join(" "))
          .then(() => {
            embed.setTitle(`${mention.tag} kicked successfully for:`)
            .setDescription(`\`${args.join(" ")}\``)
            .setFooter(`Command Used by ${message.author}`)
            message.channel.send(embed)
          })
          .catch(err => {
            message.reply(`There was an error banning ${mention}`)
            console.error(err)
          })
      } else {
        message.reply(`That user is not a member of this guild!`)
      }
    } else {
      message.reply(`Invalid User!`)
    }
  } else {
    message.reply(`Missing Permissions: ${result.join(", ")}`)
  } */
  message.reply("Kick Commands are currently unoperational, please come back later and try again!")
}