const Discord = require("discord.js")

exports.run = async(client, message, args) => {
  const embed = new Discord.MessageEmbed
  .setColor(client.congig.color)
  const mention = message.mentions.users.first()
  if (message.member.hasPermission("BAN_MEMBERS") || message.author.id == "781402171719286826") {
    if (mention) {
      const member = message.guild.member(mention)
      if (member) {
        member
          .ban(args.join(" "))
          .then(() => {
            embed.setTitle(`${mention.tag} banned successfully for:`)
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
    message.reply("Missing Permissions: Ban Members")
  }
}