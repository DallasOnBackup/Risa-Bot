//  ================== APP START =====================
const express = require('express');
const app = express();
const port = 3000;
const botVersion = 1.1;

app.get('/', (req, res) => res.send(`{"Name": "daBot", "Version": ${botVersion}}`));
app.listen(port);


// ================= START BOT CODE ===================
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "da!";
const color = "#17e825";
var watching = true;
var commandCount = 9;

function updateStatus() {
  if (watching) {
    watching = false;
    client.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | v${botVersion} | ${commandCount} commands!`,
            type: "PLAYING"
        }
    });
  } else {
    watching = true;
    client.user.setPresence({
        status: 'online',
        activity: {
            name: `${client.guilds.cache.size} servers!`,
            type: "WATCHING"
        }
    });
  }
}

client.on('ready', () => {
  client.user.setPresence({
        status: 'online',
        activity: {
            name: `${client.guilds.cache.size} servers!`,
            type: "WATCHING"
        }
    });
    setInterval(updateStatus, 10000);
  console.log(`Successfully Logged in as ${client.user.tag}!`);
});

// CLIENT ON MESSAGE
client.on('message', message => {
  // SYNTAX HANDLER
  const args = message.content.slice(prefix.length).trim().split(' ');

  if (args[args.length] == "--delete") {
    message.delete();
  }

  if (message.content.startsWith(prefix + "av")) {

    /*
    =======================================================
      Displays avatar of stated user, without stated user gets avatar of Message Author
    =======================================================
    */

    if (message.mentions.users.first() && message.guild.member(message.mentions.users.first())) {
      var av = message.mentions.users.first().displayAvatarURL();
    } else {
      var av = message.author.displayAvatarURL();
    }
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setImage(av)
      .setTitle('Profile Picture');
    message.channel.send(embed);


  } else if (message.content.startsWith(prefix + "kick")) {

    /*
    ========================================================
      Kicks user from server if stated, otherwise produces an error
    ========================================================
    */

    const user = message.mentions.users.first();

    if (message.member.hasPermission("KICK_MEMBERS") || message.author.tag == "AnxietySucks#2863") {
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          modArgs = args.splice(0, 2);
          modReason = modArgs.join(" ");
          member.kick(modReason).then(() => {
            const embed = new Discord.MessageEmbed()
              .setColor(color)
              .setDescription(`**Successfully kicked ${user.tag}!**`)
              .setFooter(`Command Called by ${message.author.tag}`);
            message.reply(embed);
          });
        } else {
          message.reply("Invalid User Stated!");
        }
      } else {
        message.reply("User not Stated!");
      }
    } else {
      message.reply("Invalid Permissions!");
    }

  } else if (message.content.startsWith(prefix + "invite")) {

    /*
    ========================================================
      Shows invite URL for daBot
    ========================================================
    */
    const embed = new Discord.MessageEmbed()
      .setTitle("Invite daBot to your Server")
      .addField("Also consider Joining daBot's Support Server!", "https://discord.gg/arg58rFJ8m")
      .setColor(color)
      .setURL("https://discord.com/api/oauth2/authorize?client_id=824186494385520691&permissions=8&scope=bot")
      .setFooter("daBot made by AnxietySucks#2863");

    message.reply(embed);
  } else if (message.content.startsWith(prefix + "ban")) {

    /*
    =======================================================
    Bans User from server if user mentions, otherwise produces an error
    =======================================================
    */
    const user = message.mentions.users.first();

    if (message.member.hasPermission("BAN_MEMBERS")) {
      // User is valid and in the guild
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          modArgs = args.splice(0, 2);
          modReason = modArgs.join(" ");
          member.ban(modReason).then(() => {
            const embed = new Discord.MessageEmbed()
              .setColor(color)
              .setDescription(`**Successfully banned ${user.tag}!**`)
              .setFooter(`Command Called by ${message.author.tag}`);
            message.reply(embed);
          });
        } else {
          message.reply("Invalid User Stated!");
        }
      } else {
        message.reply("User not Stated!");
      }
    } else {
      message.reply("Invalid Permissions!");
    }

    /*
    =======================================================
      Flips a Virtual coin and results in either Heads or Tails!
    =======================================================
    */

  } else if (message.content.startsWith(prefix + "coinflip")) {
    if (Math.floor(Math.random() * 2) == 0) {
      coinResult = "Heads!";
    } else {
      coinResult = "Tails!";
    }
    // Embedded Result
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle("Coin Flip")
      .addField("Result:", "It's **" + coinResult + "**!")
      .setFooter("use '?coinflip' to do a coin flip in the future!");
    message.reply(embed);

    /*
    =======================================================
      Deletes the User's message, sends it with the bot and deletes the users message
    =======================================================
    */

  } else if (message.content.startsWith(prefix + "hide")) {
    try {
      message.delete();
    } catch (err) {
      message.reply("There was an error deleting the message");
    }
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle("Hidden Author")
      .addField("Message:", args[1], true);
    message.channel.send(embed).catch();

    /*
    =======================================================
      Gets the Bot's Ping to Discord Servers
    =======================================================
    */

  } else if (message.content.startsWith(prefix+"ping")) {
    message.reply(`daBot has a Ping of ${Date.now() - message.createdTimestamp}ms!`);
    /*
    =======================================================
      Shows List of Commands for daBot
    =======================================================
    */

  } else if (message.content.startsWith(prefix+"help")) {

    embed = new Discord.MessageEmbed()
      .setTitle("Support Server")
      .setColor(color)
      .setFooter("daBot made by AnxietySucks#2863")
      .addFields(
        {name: prefix+"help", value: "List of Commands"},
        {name: prefix+"av", value: "Shows User PFP, if user is mentioned, shows their PFP"},
        {name: prefix+"coinflip", value: "Flips a Virtual Coin that results in Heads or Tails!"},
        {name: prefix+"kick", value: "Kicks Mentioned user from the Server"},
        {name: prefix+"ban", value: "Bans Mentioned user from the Server"},
        {name: prefix+"hide", value: "Sends Message with bot, then deletes the command message"},
        {name: prefix+"ping", value: "Gets daBot's Ping to Discord Servers!"})
        .setURL("https://discord.gg/arg58rFJ8m");
      message.channel.send(embed);

  } else if (message.content.startsWith(prefix+"spam")) {
    if (message.member.hasPermissions("MANAGE_MESSAGES")){
      for (i = 0; i <= repeatCount; i++) {
        message.channel.send(`Spam: ${msg}`);
      }
    } else {
      message.reply("Invalid Permissions!");
    }
  } else { }
});

// Client Login
client.login(process.env.DISCORD_TOKEN);

// Neevan
// Redkar
// is
// gae
// lol