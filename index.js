//  ================== APP START =====================
const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
const botVersion = 1.11;

app.get('/', (req, res) => res.send(`daBot v${botVersion} successfully deployed!`));
app.listen(port);


// ================= START BOT CODE ===================
const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "da!";
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
  prefixes = JSON.parse(fs.readFileSync("prefixes.json"));
  if (prefixes[message.guild.id] != null) {
    prefix = prefixes[message.guild.id];
  }
  var embed = new Discord.MessageEmbed()
  .setColor(color);

  function hasNeededPerms(message) {
    var falsePerms = " ";
    var neededPerms = [
      "CREATE_INSTANT_INVITE",
      "KICK_MEMBERS",
      "BAN_MEMBERS",
      "MANAGE_CHANNELS",
      "MANAGE_GUILD",
      "ADD_REACTIONS",
      "VIEW_AUDIT_LOG",
      "STREAM",
      "VIEW_CHANNEL",
      "SEND_MESSAGES",
      "MANAGE_MESSAGES",
      "EMBED_LINKS",
      "ATTACH_FILES",
      "READ_MESSAGE_HISTORY",
      "MENTION_EVERYONE",
      "CONNECT",
      "SPEAK",
      "MUTE_MEMBERS",
      "DEAFEN_MEMBERS",
      "CHANGE_NICKNAME",
      "MANAGE_NICKNAMES",
      "MANAGE_ROLES",
      "MANAGE_WEBHOOKS"
    ]
    for (i = 0; i <= neededPerms.length; i++) {
      if (!message.guild.me.hasPermission(neededPerms[i])) {
        falsePerms += neededPerms[i] + ", ";
      }
    }
  return(falsePerms);
}

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

    if (args[1] != null && message.mentions.users.first() && message.guild.member(message.mentions.users.first())) {
      var av = message.mentions.users.first().displayAvatarURL();
    } else {
      var av = message.author.displayAvatarURL();
    }
      embed.setImage(av)
      .setDescription(`Profile picture for ${message.author}`)
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
            embed.setDescription(`**Successfully kicked ${user.tag}!**`)
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
    embed.setTitle("Invite daBot to your Server")
    .addField("Also consider Joining daBot's Support Server!", "https://discord.gg/arg58rFJ8m")
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
            embed.setDescription(`**Successfully banned ${user.tag}!**`)
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
      embed.setTitle("Coin Flip")
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
    embed.setTitle("Hidden Author")
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
    embed.setTitle("Support Server")
    .setFooter("daBot made by AnxietySucks#2863")
    .addFields(
      {name: prefix+"help", value: "List of Commands"},
      {name: prefix+"av", value: "Shows User PFP, if user is mentioned, shows their PFP"},
      {name: prefix+"coinflip", value: "Flips a Virtual Coin that results in Heads or Tails!"},
      {name: prefix+"kick", value: "Kicks Mentioned user from the Server"},
      {name: prefix+"ban", value: "Bans Mentioned user from the Server"},
      {name: prefix+"hide", value: "Sends Message with bot, then deletes the command message"},
      {name: prefix+"ping", value: "Gets daBot's Ping to Discord Servers!"},
      {name: prefix+"mogus", value: "MOGUS GANG"},
      {name: prefix+"checkperms", value: "Check to see if bot has reccommended permissions"})
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
  } else if (message.content.startsWith(prefix+"mogus")) {
    if (hasNeededPerms(message) == "") {
      message.channel.send("https://tenor.com/view/19dollar-fortnite-card-among-us-amogus-sus-red-among-sus-gif-20549014");
    } else {
      embed.setTitle("Missing Perms!")
      .setDescription(hasNeededPerms(message));
      message.channel.send(embed);
    }
  } else if (message.content.startsWith(prefix+"changelog")) {
    var embed = new Discord.MessageEmbed();
    let data = fs.readFileSync("changelog.json");
    var changelog = JSON.parse(data);

    if (args[1] == "null" || isNaN(args[1])) {
      var temp = botVersion;
    } else {
      var temp = args[1]
    }
    embed.setColor(color)
    .setTitle("Changelog for v" + temp)
    .addFields(
      {name: "Changes", value: changelog[temp].changes},
      {name: "Release Date", value: changelog[temp].date}
    );
    message.channel.send(embed);
  } else if (message.content.startsWith(prefix+"prefix")) {
    if (args[1] != null && message.author.hasPermission("MANAGE_SERVER")) {
      prefixes[message.guild.id] = args[1]
      fs.writeFileSync('prefixes.json', JSON.stringify(prefixes));
      prefixes = JSON.parse(readFileSync('prefixes.json'));
      if (prefixes[message.guild.id] == args[1]) {
        embed.setTitle("Success!")
        .setDescription("Set daBot's prefix to " + args[1]);
      } else {
        embed.setTitle("Error!")
        embed.setDescription("There was an error changing daBot's prefix!");
      }
    } else {
      embed.setTitle("Current Prefix")
      .setDescription(`The current prefix for daBot is '${prefix}'`);
    }
    message.channel.send(embed)
  } else {}
});

// Client Login
client.login(process.env.DISCORD_TOKEN);

// I
// Think
// that
// Neevan
// Redkar
// is
// probably
// simping
// on
// for
// Logan
// Wilkins
// lol