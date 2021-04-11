//  ================== APP START =====================
const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
const botVersion = 1.21;

app.get('/', (req, res) => res.send(`Risa v${botVersion} successfully deployed!`));
app.listen(port);


// ================= START BOT CODE ===================
const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "risa!";
const color = "#17e825";
var watching = true;
var commandCount = 12;


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
  const args = message.content.slice(prefix.length).trim().split(' ');

  function commandParse(a) {
    if (command == prefix + a || command == "risa!" + a) {
      return true;
    } else {
      return false;
    }
  }

  if (message.guild != null) {

  prefixes = JSON.parse(fs.readFileSync("./guildData/prefixes.json"));
  if (prefixes[message.guild.id] != null) {
    prefix = prefixes[message.guild.id];
  }

  var command = message.content.split(' ')[0].toLowerCase();
  
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

  if (message.content.endsWith("--delete")) {
    message.delete();
  }

  if (commandParse("av")) {
    if (args[1] != null && message.mentions.users.first() && message.guild.member(message.mentions.users.first())) {
      var av = message.mentions.users.first().displayAvatarURL();
    } else {
      var av = message.author.displayAvatarURL();
    }
      embed.setImage(av);
    message.channel.send(embed);


  } else if (commandParse("kick")) {
    const user = message.mentions.users.first();

    if (message.member.hasPermission("KICK_MEMBERS") || message.author.tag == "AnxietySucks#2863") {
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          modArgs = args.splice(0, 2);
          modReason = modArgs.join(" ");
          member.kick(modReason).catch(err).then(() => {
            embed.setTitle(`**Successfully kicked ${user.tag}!**`)
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

  } else if (commandParse("invite")) {
    embed.setTitle("Invite Risa to your Server")
    .addField("Also consider Joining Risa's Support Server!", "https://discord.gg/arg58rFJ8m")
    .setURL("https://discord.com/api/oauth2/authorize?client_id=824186494385520691&permissions=8&scope=bot")
    .setFooter("Risa made by AnxietySucks#2863");

    message.reply(embed);


  } else if (commandParse("ban")) {
    const user = message.mentions.users.first();

    if (message.member.hasPermission("BAN_MEMBERS")) {
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          modArgs = args.splice(0, 2);
          modReason = modArgs.join(" ");
          member.ban(modReason).catch(err).then(() => {
            embed.setTitle(`**Successfully banned ${user.tag}!**`)
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


  } else if (commandParse("coinflip")) {
    if (Math.floor(Math.random() * 2) == 0) {
      coinResult = "Heads!";
    } else {
      coinResult = "Tails!";
    }
    embed
      .setTitle(`It's **${coinResult}**!`)
    message.reply(embed);


  } else if (commandParse("hide")) {
    args.shift();
    msg = args.join(" ");

    try {
      message.delete();
    } catch (err) {
      message.reply("There was an error deleting the message");
    }
    if (args[0] != 0) { 
      embed
        .setDescription(msg);
      message.channel.send(embed).catch();
    }


  } else if (commandParse("ping")) {
    embed.setTitle(`Risa has a Ping of ${Date.now() - message.createdTimestamp}ms!`);
    message.channel.send(embed);

  } else if (commandParse("help")) {
    embed.setTitle("Support Server")
    .setFooter("RisaBot made by AnxietySucks#2863")
    .addFields(
      {name: prefix+"help", value: "List of Commands"},
      {name: prefix+"av", value: "Shows User PFP, if user is mentioned, shows their PFP"},
      {name: prefix+"coinflip", value: "Flips a Virtual Coin that results in Heads or Tails!"},
      {name: prefix+"kick", value: "Kicks Mentioned user from the Server"},
      {name: prefix+"ban", value: "Bans Mentioned user from the Server"},
      {name: prefix+"hide", value: "Sends Message with bot, then deletes the command message"},
      {name: prefix+"ping", value: "Gets Risa's Ping to Discord Servers!"},
      {name: prefix+"mogus", value: "MOGUS GANG"},
      {name: prefix+"checkperms", value: "Check to see if bot has reccommended permissions"},
      {name: prefix+"changelog", value: "Shows changelogs for specified version"},
      {name: prefix+"prefix", value: "Changes bot prefix to specified Prefix (Max length is 4"},
      {name: prefix+"deadchat", value: "DED CHAT XD"},
      {name: prefix+"test OR risa!test", value: "Returns the Bot's ping including other info!"}
      )
      .setURL("https://discord.gg/arg58rFJ8m");

      var embedReply = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle("There should be a DM waiting in your inbox with the command list and Support Info!");

      message.channel.send(embedReply)
      message.author.send(embed);

  } else if (commandParse("mogus")) {
    message.channel.send("https://tenor.com/view/19dollar-fortnite-card-among-us-amogus-sus-red-among-sus-gif-20549014");


  } else if (commandParse("changelog")) {
    var embed = new Discord.MessageEmbed();
    let data = fs.readFileSync("changelog.json");
    var changelog = JSON.parse(data);
    if (args[1] == "null" || isNaN(args[1])) {
      var temp = botVersion;
    } else {
      var temp = args[1]
    }
    if (changelog[temp] == null) {
      embed.setFooter("Risa detected a Non-Existent Version Number, So this is the latest info!");
      temp = botVersion;
    }
    embed.setColor(color)
    .setTitle("Changelog for v" + temp)
    .addFields(
      {name: "Changes", value: changelog[temp].changes},
      {name: "Release Date", value: changelog[temp].date}
    );
    message.channel.send(embed);

  } else if (commandParse("prefix")) {
        if (args[1] != null) {
          if (args)
          if (args[1].length >= 5) {
            embed.setTitle("Error!")
            .setDescription(`Maximum prefix length is 4,your prefix length was ${args[1].length}!`);
          } else {
            if (message.member.hasPermission("MANAGE_GUILD")) {
              prefixes[message.guild.id] = args[1];
              fs.writeFileSync('./guildData/prefixes.json', JSON.stringify(prefixes));
              prefixes = JSON.parse(readFileSync('./guildData/prefixes.json'));
              if (prefixes[message.guild.id] == args[1]) {
                embed.setTitle("Set Risa's prefix to " + args[1]);
              } else {
                embed.setTitle("There was an ***error*** changing Risa's prefix!");
              }
          } else {
            embed.setTitle("Invalid Perms!")
            embed.setDescription(`${message.author}, You are missing the following permissions: \`MANAGE_SERVER\``);
          }
        }
      } else {
        embed.setTitle(`The current prefix for Risa is '${prefix}'`);
      }
    message.channel.send(embed);
  } else if (commandParse("deadchat")) {
    var dedChat = [
      "https://media.tenor.com/images/af499284aad043f21256d82d76dd2ff3/tenor.gif",
      "https://media.tenor.com/images/2868b663a9fa1c32c9092438576461d3/tenor.gif",
      "https://media.tenor.com/images/b9f1e02945b47885df3e319ba02329c7/tenor.gif",
      "https://media.tenor.com/images/0e3618e9958cd64bf6a6716d18291fa0/tenor.gif"
    ];

    message.channel.send(dedChat[Math.floor(Math.random()*dedChat.length)]);
  } else if (commandParse("checkperms")) {
    if (hasNeededPerms(message) == " ") {
      embed.setDescription("All reccommended permissions are met!");
    } else {
      embed.setDescription(`Some of the following permissions are not granted: \`${hasNeededPerms(message)}\``);
    }
    message.channel.send(embed);
  } else if (commandParse("test")) {
    embed.addField("Ping:",`\`${Date.now() - message.createdTimestamp}ms\``)
    .setDescription("Risa is Currently Online and Operating on Risa v" + botVersion + "!");
    message.channel.send(embed);
  } else {}
}});

// Client Login
client.login(process.env.DISCORD_TOKEN);