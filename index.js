//  ================== APP START =====================

// Package Import/Setup
const express = require('express')
const app = express()
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
client.config = {}
client.config.color = "#37fa3d"
const port = 3000
const botVersion = 1
var prefix = "risa!"

// Server Listening
app.get('/', (req, res) => res.send(`Risa v${botVersion} successfully deployed!`))
app.listen(port)

// Client Login
client.login(process.env.DISCORD_TOKEN)

// Main Bot Code
client.on('message', async message => {})

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