var discord = require('discord.js');
var db = require('quick.db');

exports.run = async function(client, message, args, prefix) {
  try {
    
  if (!message.guild) return;
  if (!message.member.hasPermission(`MANAGE_GUILD`)) return message.channel.send(`Sorry, you need manage guild permission to use this!`)
  await db.delete(`swears_${message.guild.id}`)
  message.channel.send(`OK, deleted all swears for this guild.`)
    
  } catch (e) {}
}
