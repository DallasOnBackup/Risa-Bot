const Discord = require("discord.js")
const Pack = require("./functions")

exports.run = async(client, message, args) => {
  /*
  var perms = Pack.hasPerms(message.member, ["BAN_MEMBERS"])
  if (perms.length == 0) {
    var user = message.mentions.users.first()
    if (user) {
      var member = message.guild.member(user);
      if (member) {
        member
          .ban(args.slice(3).join(" "))
          .then(() => {
            const embed = Pack.createEmbed()
              .setColor(client.config.color)
              .setFooter(`Command Called by ${message.author}`)
              .setTitle(`Successfully banned ${user} for:`)
              .setDescription(args.slice(3).join(" "))
            message.channel.send(embed)
          });
      } else {
        message.reply("Invalid User Stated!");
      }
    } else {
      message.reply("User not Stated!");
    } } else {
      message.reply("Invalid Permissions!");
    } */
  message.reply("Ban Commands are currently unoperational, please come back later and try again!")
}