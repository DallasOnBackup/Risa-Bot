//  ================== APP START =====================

// Basic Package Import/Setup
const express = require('express')
const app = express()
const fs = require('fs')
const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const client = new Discord.Client()
const port = 3000
const botVersion = 0
var prefix = "risa!"

// Server Listening
app.get('/', (req, res) => res.send(`Risa v${botVersion} successfully deployed!`))
app.listen(port)

// Client Login
client.login(process.env.DISCORD_TOKEN)

// When bot is Ready, Log to Console
client.on('ready', () => {
  console.log(`Successfully logged into Risa as ${client.user.tag}!`)
  client.user.setPresence({
    status: 'idle',
      activity: {
        name: `with a Broken Bot`,
        type: "PLAYING"
      }
  })
})

// Main Bot Code
client.on('message', async message => {
  var embed = new Discord.MessageEmbed()
  if (message.content.startsWith(`risa!help`)) {
    embed.setColor("#FFF")
    .setAuthor(client.user.tag, "https://cdn.discordapp.com/avatars/824186494385520691/8558cd9cb2b8ed4458353a4749b7757d.png")
    .setDescription("These are all of the Planned commands for Risa!")
    .addFields(
      {name: "Moderation", value: "`ban` | `tempban` | `kick` | `tempkick` | `mute` | `tempmute`"},
      {name: "Music", value: "`play` | `pause` | `resume` | `stop` | `leave` | `skip` | `queue` | `remove`"},
      {name: "Bot", value: "`ping` | `owner` | `about` | `help` | `invite`"},
      {name: "Utility", value: "`coinflip` | `timer` | `urban`"}
    )
    .setFooter("NOTICE: THESE COMMANDS ARE PLANNED, NONE OF THEM ACTUALLY CURRENTLY WORK!")
    message.channel.send(embed)
  }
})