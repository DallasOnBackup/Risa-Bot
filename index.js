//  ==================================================
//  ================== APP START =====================
//  ==================================================

// Package Import/Setup
const express = require('express')
const app = express()
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
import fetch from "node-fetch"
client.config = {}
client.config.color = "#37fa3d"
const port = 3000
const botVersion = 1
var prefix = "risa!"
const yuaApi = (base => async endpoint => {
    const req = await fetch(`${base}${endpoint}`);
    const res = await req.json();
    return res;
})("https://yuabot.com/weeb/api/v1");
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
  var rCommandPhrases = [
    "bite": `${message.author.username} is biting ${message.mentions.users}`
    "bully": //FINISH PHRASE REPLIES https://yuabot.com/api
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
    "wave": `,
  ]
}

function checkRoleplay(message) {
  for (i = 0; i <= rCommands.length; i++) {
    if (message.content.startsWith(prefix + rCommands[i]))
      return rCommands[i]
  }
}

// Server Listening
app.get('/', (req, res) => res.send(`Risa v${botVersion} successfully deployed!`))
app.listen(port)

// Client Login
client.login(process.env.DISCORD_TOKEN)

// Main Bot Code
client.on('message', async message => {
  // Roleplay Commands
  if (checkRoleplay(message)) {
    const img = yuaApi(`/img/${checkRoleplay(message)}`)
    const embed = new Discord.MessageEmbed()
      .setColor(client.config.color)
      .setTitle(``)
  }
})

// When bot is Ready, Log to Console
client.on('ready', () => {
  client.config.prefix = prefix
  console.log(`Successfully logged into Risa as ${client.user.tag}!`)
  client.user.setPresence({
    status: 'idle',
      activity: {
        name: `an Idiot rebuild a broken bot`,
        type: "WATCHING"
      }
  })
})

// Command Import
fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		let eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
	});
});

client.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(`./commands/${file}`);
		let commandName = file.split('.')[0];
		console.log(`'${commandName}.js' Ready`);
		client.commands.set(commandName, props);
	});
});