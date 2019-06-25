var discord = require('discord.js');

exports.run = async function(client, message, args, prefix) {
  
  if (!message.guild) return;
  if (!message.member.hasPermission(`KICK_MEMBERS`)) return message.channel.send(`Sorry, you don't have kick members permission!`)
  var user = message.mentions.members.first() ? message.mentions.users.first() : await client.fetchUser(args[0])
  var reason = args.slice(1).join(` `);
  
    if (!message.guild.member(user)) return;
    if (message.guild.member(user).kickable) {
    var embed = new discord.RichEmbed().setColor(`GOLD`).setTimestamp().setTitle(`You have been kicked from ${message.guild.name}`)
    if (reason) embed.setDescription(`Reason: ${reason}`)
    await user.send(embed)
    await message.guild.member(user).kick(reason)
    } else { 
    message.channel.send(`Unable to kick that user! :RedTick:`); return; 
    }
  message.channel.send(`User ${user.tag} has been kicked :white_check_mark:`)
  
}
