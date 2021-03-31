//  ================== APP START =====================
const express = require('express');
fs = require('fs');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port);


// ================= START BOT CODE ===================
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "da!";
const color = "#17e825";

client.on('ready', () => {
  console.log(`Successfully Logged in as ${client.user.tag}!`);
});

// CLIENT ON MESSAGE
client.on('message', message => {
  const args = message.content.slice(prefix.length).trim().split(' ');

  if (message.content.startsWith(prefix + "av")) {

    /*
    ========================================================
      Displays avatar of stated user, without stated user gets avatar of Message Author
    ========================================================
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

    if (message.member.hasPermission("KICK_MEMBERS")) {
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          modArgs = args.splice(0, 2);
          modReason = modArgs.join(" ");
          member.kick(modReason).then(() => {
            message.reply("Sucessfully kicked " + user.tag + "!");
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

    message.reply("You can invite daBot to your server by clicking on the following link: https://discord.com/api/oauth2/authorize?client_id=824186494385520691&permissions=8&scope=bot");
  } else if (message.content.startsWith(prefix + "ban")) {

    /*
    ========================================================
    Bans User from server if user mentions, otherwise produces an error
    ========================================================
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
            message.reply("Sucessfully banned " + user.tag + "!");
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
    ========================================================
      Flips a Virtual coin and results in either Heads or Tails!
    ========================================================
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
  } else { }
});

// Client Login
client.login(process.env.DISCORD_TOKEN);