var discord = require('discord.js');
var db = require('quick.db');

exports.run = async function(client, message, args, prefix) {
  
 if (!message.guild) return;
 if (!message.member.hasPermission(`MANAGE_GUILD`)) return message.channel.send(`Sorry, you need manage guild permission to use this!`)
 if (!args[0]) return;
 var swear = args[0].toLowerCase()
 await db.push(`swears_${message.guild.id}`, swear)
 message.channel.send(`Got it, added that swear to the list of swears of this guild. If you haven't already, type \`${prefix}swearaction\` to set up what the bot should do when somebody swears.`)
  
}
