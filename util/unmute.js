var discord = require('discord.js');
var db = require('quick.db');

exports.run = async function(client, message, args, prefix) {
  
  if (!message.guild) return;
  if (message.member.hasPermission(`KICK_MEMBERS`) || message.member.hasPermission(`BAN_MEMBERS`) || message.member.hasPermission(`MANAGE_GUILD`) ) {
    
  var user = message.mentions.members.first() ? message.mentions.users.first() : await client.fetchUser(args[0])
  if (!message.guild.member(user)) return;
  var role = await message.guild.roles.find(r => r.name.toLowerCase() == "watcher-muted")
  if (!role) role = await message.guild.createRole({name: "watcher-muted"})
  await message.guild.member(user).removeRole(role)
  await message.channel.send(`User ${user.tag} has been unmuted. :white_check_mark:`)

  } else {return;}
}
