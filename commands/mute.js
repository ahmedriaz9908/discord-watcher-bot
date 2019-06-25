var discord = require('discord.js');
var db = require('quick.db');
var timeparser = require(`../util/timeparser.js`);

exports.run = async function(client, message, args, prefix) {
 try {
  if (!message.guild) return;
  if (message.member.hasPermission(`KICK_MEMBERS`) || message.member.hasPermission(`BAN_MEMBERS`) || message.member.hasPermission(`MANAGE_GUILD`) ) {
  if (!args[1]) { //IF NO TIME SPECIFIED
  var user = message.mentions.members.first() ? message.mentions.users.first() : await client.fetchUser(args[0])
  if (!message.guild.member(user)) return;
  if (message.guild.member(user).roles.find(r => r.name.toLowerCase() == "watcher-muted")) return message.channel.send(`This person is already muted!`)
  var role = await message.guild.roles.find(r => r.name.toLowerCase() == "watcher-muted")
  if (!role) role = await message.guild.createRole({name: "watcher-muted"})
  await message.guild.member(user).addRole(role)
  await message.guild.channels.forEach(c => {
    
    try {
      if (c.type == "text")  c.overwritePermissions(role, {SEND_MESSAGES: false});
      if (c.type == "voice") c.overwritePermissions(role, {CONNECT: false});
    } catch (e) {
      
    }
    
  })
    
  await message.channel.send(`User ${user.tag} has been muted. :white_check_mark:`)
    
  } else { //IF TIME SPECIFIED
    
  var toparse = args.slice(1);
  
  var time = await timeparser.parse(toparse)
  
  if (time == false) {
    return message.channel.send(`Incorrect usage. Example: **${prefix}mute @spammer 3d 6h** - will mute someone for 3 days, 6 hours.`);
  } else {
    var [endtime, days, hours, minutes] = time;
  }
  
  var user = message.mentions.members.first() ? message.mentions.users.first() : await client.fetchUser(args[0]);
  if (!message.guild.member(user)) return;
  if (message.guild.member(user).roles.find(r => r.name.toLowerCase() == "watcher-muted")) return message.channel.send(`This person is already muted!`)
  var role = await message.guild.roles.find(r => r.name.toLowerCase() == "watcher-muted")
  if (!role) role = await message.guild.createRole({name: "watcher-muted"})
  await message.guild.member(user).addRole(role)
  await message.guild.channels.forEach(c => {
    
    try {
      if (c.type == "text")  c.overwritePermissions(role, {SEND_MESSAGES: false});
      if (c.type == "voice") c.overwritePermissions(role, {CONNECT: false});
    } catch (e) {
      
    }
    
  })
    
  var info = {}; info.guild = message.guild.id; info.user = user.id; info.end = Date.now() + endtime;
  await db.push(`muted`, info)
  var desc = ""; if (days) desc += `, **${days} day(s)**`; if (hours) desc += `, **${hours} hour(s)**`; if (minutes) desc += `, **${minutes} minute(s)**`
  await message.channel.send(`Got it, user ${user.tag} will be muted for${desc}. :white_check_mark:`)
    
  } 
    
  }
  
  else { return; }
 } catch (e) {}
}
