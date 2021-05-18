const Discord = require("discord.js")

function hasPerms(user, perms) {
  if (perms == null)
    return true
  var missing = []
  for (i = 0; i <= perms.length; i++) {
    if (!user.hasPermission(perms[i]))
      missing += perms[i]
    if (i = perms.length)
      return missing
  }
}

function createEmbed() {
  let embed = new Discord.MessageEmbed()
    .setColor(client.config.color)
  return embed
}

module.exports = { hasPerms, createEmbed }