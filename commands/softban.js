var discord = require('discord.js');

exports.run = async function(client, message, args, prefix) {
  
  try {
    
  if (!message.guild) return;
  if (!message.member.hasPermission(`BAN_MEMBERS`)) return message.channel.send(`Sorry, you don't have ban members permission!`)
  var user = message.mentions.members.first() ? message.mentions.users.first() : await client.fetchUser(args[0])
  var reason = args.slice(1).join(` `)
 
    if (!message.guild.member(user)) return;
    if (message.guild.member(user).bannable) {
    var embed = new discord.RichEmbed().setColor(`GOLD`).setTimestamp().setTitle(`You have been soft banned from ${message.guild.name}`)
    if (reason) embed.setDescription(`Reason: ${reason}`)
    await user.send(embed)
    await message.guild.member(user).ban(30, reason)
    await message.guild.unban(user)
    } else { 
    message.channel.send(`Unable to soft ban that user! :RedTick:`); return; 
    }
  message.channel.send(`User ${user.tag} has been soft banned :white_check_mark:`)
    
  } catch (e) {}
}
