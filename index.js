//  ================== APP START =====================
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port);


// ================= START BOT CODE ===================
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "?";
const color = "#17e825";

client.on('ready', () => {
  console.log(`Successfully Logged in as ${client.user.tag}!`);
});

// CLIENT ON MESSAGE
client.on('message', msg => {
  const args = msg.content.slice(prefix.length).trim().split(' ');

  if (msg.content.startsWith(prefix+"av")) {

    /*
    ========================================================
      Displays avatar of stated user, without stated user gets avatar of Message Author
    ========================================================
    */

    if (msg.mentions.users.first() && msg.guild.member(msg.mentions.users.first())) {
      msg.reply(msg.mentions.users.first());
    } else {
      msg.reply(msg.author.displayAvatarURL());
    }
  } else if (msg.content.startsWith(prefix+"kick")) {

    /*
    ========================================================
      Kicks user from server if stated, otherwise produces an error
    ========================================================
    */

    const user = msg.mentions.users.first();

    if (msg.member.hasPermission("KICK_MEMBERS")) {
      if (user) {
        const member = msg.guild.member(user);
        if (member) {
          member.kick().then(() => {
            msg.reply("Sucessfully kicked "+user.tag+"!");
          });
        } else {
          msg.reply("Invalid User Stated!");
        }
      } else {
        msg.reply("User not Stated!");
      }
    } else {
      msg.reply("Invalid Permissions!");
    }
  } else if (msg.content.startsWith(prefix+"invite")) {

    /*
    ========================================================
      Shows invite URL for daBot
    ========================================================
    */

    msg.reply("You can invite daBot to your server by clicking on the following link: https://discord.com/api/oauth2/authorize?client_id=824186494385520691&permissions=8&scope=bot");
  } else if (msg.content.startsWith(prefix+"ban")) {

    /*
    ========================================================
    Bans User from server if user mentions, otherwise produces an error
    ========================================================
    */
  const user = msg.mentions.users.first();

  if (msg.member.hasPermission("BAN_MEMBERS")) {
    if (user) {
      const member = msg.guild.member(user);
      if (member) {
        member.ban().then(() => {
          msg.reply("Sucessfully banned "+user.tag+"!");
        });
      } else {
        msg.reply("Invalid User Stated!");
      }
    } else {
      msg.reply("User not Stated!");
    } } else {
      msg.reply("Invalid Permissions!");
    }

    /*
    ========================================================
      Flips a Virtual coin and results in either Heads or Tails!
    ========================================================
    */

  } else if (msg.content.startsWith(prefix+"coinflip")) {
    if (Math.floor(Math.random() * 2) == 0) {
      coinResult = "Heads!";
    } else {
      coinResult = "Tails!";
    }
    const msgEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle("Coin Flip")
      .addField("Result:", "It's **"+coinResult+"**!")
      .setFooter("use '?coinflip' to do a coin flip in the future!");
    msg.reply(msgEmbed);

    /*
    =======================================================
      Deletes the User's message, sends it with the bot and deletes the users message
    =======================================================
    */

  } else if (msg.content.startsWith(prefix+"hide")) {
    msg.delete();
    const msgEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle("Hidden Author")
      .addField("Message:", args[1], true);
    msg.channel.send(msgEmbed).catch();
  } else {}
});

client.login(process.env.DISCORD_TOKEN);