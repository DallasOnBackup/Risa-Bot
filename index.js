//  ==================================================
//  ================== APP START =====================
//  ==================================================

// Package Import/Setup
const express = require('express')
const app = express()
const fs = require('fs')
const Discord = require('discord.js')
const fetch = require('node-fetch')
const client = new Discord.Client()
require('dotenv').config()
client.config = {}
client.config.color = "#37fa3d"
const port = 3000
const botVersion = 1
var prefix = "risa "
var stat = 1

/*
const yuaApi = (base => async endpoint => {
    const req = await fetch(`${base}${endpoint}`)
    const res = await req.json()
    return res
})("https://yuabot.com/weeb/api/v1")
const rCommands = [
  "bite",
  "bully",
  "cuddle",
  "highfive",
  "holdhands",
  "hug",
  "kill",
  "kiss",
  "lick",
  "meow",
  "nom",
  "nuzzle",
  "pat",
  "poke",
  "pout",
  "punch",
  "slap",
  "smile",
  "snuggle",
  "stare",
  "tickle",
  "wave",
]

function returnRoleplayPhrase(roleplayCommand, message) {
  var rCommandPhrases = {
    "bite",
    "bully",
    "cuddle",
    "highfive",
    "holdhands",
    "hug",
    "kill",
    "kiss",
    "lick",
    "meow",
    "nom",
    "nuzzle",
    "pat",
    "poke",
    "pout",
    "punch",
    "slap",
    "smile",
    "snuggle",
    "stare",
    "tickle",
    "wave"
  }
}

function checkRoleplay(message) {
  for (i = 0; i <= rCommands.length; i++) {
    if (message.content.startsWith(prefix + rCommands[i]))
      return rCommands[i]
  }
}
*/

// Server Listening
app.get('/', (req, res) => res.send(`Risa v${botVersion} successfully deployed!`))
app.listen(port)

// Client Login
client.login(process.env.TOKEN)

// Main Bot Code
client.on('message', async message => {       
  /* Roleplay Commands DED
	const command = args.shift().toLowerCase();
  if (command != null) {
    const img = yuaApi(`/img/${command}`)
    if (img == null) return false;
    const embed = new Discord.MessageEmbed()
      .setColor(client.config.color)
      .setImage(img)
      .setFooter("Powered by YuaBot API: https://yuabot.com/api")
  }
  */
    
    
    /* var snipes = JSON.parse(fs.readFileSync("snipes.json"))
    let msg = snipes[snipes.length - 1]
    let embed = new Discord.MessageEmbed()
    .setColor(client.config.color)
    .setAuthor(msg.author)
    .setDescription(msg.content)
    message.channel.send(embed) */
})

client.on('messageDelete', message => {
    if (message.guild.id == "824463508686372914") {
		var snipes = JSON.parse(fs.readFileSync("snipes.json"))
    	snipes.push(`{"content": ${message.content}, "author": ${message.author.tag}}`)
     	fs.writeFileSync("snipes.json", JSON.stringify(snipes))
        console.log("Message Sniped Successfully")
    }
})

function statusUpdate() {
  if (stat == 1) {
    client.user.setPresence({
    status: 'idle',
      activity: {
        name: `An Idiot Rebuild a broken bot`,
        type: "WATCHING"
      }
    })
    stat = 2
  } else if (stat == 2) {
    client.user.setPresence({
    status: 'idle',
      activity: {
        name: `${client.guilds.cache.size} servers!`,
        type: "WATCHING"
      }
    })
    stat = 1
  } else {
    console.log("Invalid Bot Presence")
  }
}

// When bot is Ready, Log to Console
client.on('ready', () => {
  client.config.prefix = prefix
  console.log(`Successfully logged into Risa as ${client.user.tag}!`)
  client.user.setPresence({
    status: 'idle',
      activity: {
        name: `${client.guilds.cache.size} servers!`,
        type: "WATCHING"
      }
  })
  setInterval(statusUpdate, 10000)
})

// Command Import
fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err)
	files.forEach(file => {
		const event = require(`./events/${file}`)
		let eventName = file.split('.')[0]
		client.on(eventName, event.bind(null, client))
	})
})

client.commands = new Discord.Collection()

fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err)
	files.forEach(file => {
    if (file == "functions.js")
      return
		if (!file.endsWith('.js'))
      return
		let props = require(`./commands/${file}`)
		let commandName = file.split('.')[0]
		console.log(`'${commandName}.js' Ready`)
		client.commands.set(commandName, props)
	})
})
