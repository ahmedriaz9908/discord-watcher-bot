var discord = require('discord.js');
var db = require('quick.db');

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
  var endtime = 0;
  if (toparse.join(` `).includes(`d`)) { var days = await toparse.find(function(days) { return days.includes(`d`) }); days = days.replace(`d`, ``); if (days == "") days = 1; endtime = endtime + (days * 8.64e+7) }
  if (toparse.join(` `).includes(`h`)) { var hours = await toparse.find(function(hours) { return hours.includes(`h`) }); hours = hours.replace(`h`, ``); if (hours == "") hours = 1; endtime = endtime + (hours * 3.6e+6)}
  if (toparse.join(` `).includes(`m`)) { var minutes = await toparse.find(function(minutes) { return minutes.includes(`m`) }); minutes = minutes.replace(`m`, ``); if (minutes == "") minutes = 1; endtime = endtime + (minutes * 60000)}
  var user = message.mentions.members.first() ? message.mentions.users.first() : await client.fetchUser(args[0]);
  if (!message.guild.member(user)) return;
  if (message.guild.member(user).roles.find(r => r.name.toLowerCase() == "watcher-muted")) return message.channel.send(`This person is already muted!`)
  if (days !== undefined && isNaN(days) || minutes !== undefined && isNaN(minutes) || hours !== undefined && isNaN(hours)) return message.channel.send(`Incorrect usage. Example: ${prefix}mute @spammer 3d 6h`)
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
