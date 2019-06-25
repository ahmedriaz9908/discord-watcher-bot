var discord = require('discord.js');
var db = require('quick.db');

exports.run = async function(client, message, args, prefix) {
  
  if (!message.guild) return;
  if (!message.member.hasPermission(`MANAGE_GUILD`)) return message.channel.send(`Sorry, you need manage guild permission to use this!`)
  if (args[0] == 1) { //WARNING ACTION
    
    await db.set(`swearaction_${message.guild.id}`, 1)
    if (!args[1]) { 
      var warning = `Hey, don't use that swear again! :angry:`
      var msg = `Got it. Will warn members when they swear. No warning message specified, will default to **${warning}**. If you want one, type \`${prefix}swearaction 1 [warning message]\``
      } else {
      var warning = message.content.slice(message.content.indexOf(args[1]), message.content.length)
      var msg = `Got it. Will warn members when they swear. Warning message is **${warning}**. If you want a different warning message, type \`${prefix}swearaction 1 [warning message]\``
      }
    await db.set(`warningmsg_${message.guild.id}`, warning)
    message.channel.send(msg)
    
  } else if (args[0] == 2) { //KICK ACTION
    await db.set(`swearaction_${message.guild.id}`, 2)
    message.channel.send(`Got it. Will kick members when they swear.`)
  } else if (args[0] == 3) { //BAN ACTION
    await db.set(`swearaction_${message.guild.id}`, 3)
    message.channel.send(`Got it. Will ban members when they swear.`)
  } else if (args[0] == 4) {
    await db.set(`sweardelete_${message.guild.id}`, true)
    message.channel.send(`Got it. Will delete messages containing swears.`)
  } else if (args[0] == 0) {
    await db.delete(`swearaction_${message.guild.id}`)
    await db.delete(`sweardelete_${message.guild.id}`)
    message.channel.send(`Okay, won't do anything when somebody swears.`)
  } else {
    return message.channel.send(`Invalid action request. Type \`${prefix}help to see a list of actions.\``)
  }
  
  
}
