var discord = require('discord.js');

exports.run = async function(client, message, args, prefix) {
  
  try {
    
  if (!message.guild) return;
  if (message.member.hasPermission(`MANAGE_CHANNELS`) || message.member.hasPermission(`MANAGE_MESSAGES`)) {

  if (args[1]) var user = message.mentions.members.first() ? message.mentions.users.first() : await client.fetchUser(args[0]);

  var amount = args[0];
  
    message.channel.fetchMessages({
 limit: 100,
 }).then(async (messages) => {
 if (user) {
 messages = await messages.filter(m => m.author.id == user.id).array().slice(0, amount)
 } else {
 messages = messages.array().slice(0, amount)
 }
 await message.channel.bulkDelete(messages).catch(error => {})
    
 if (user) { 
   message.channel.send(`Ok, deleted ${messages.length} messages from ${user.tag}`) 
 } else {
   message.channel.send(`Ok, deleted ${messages.length} messages in this channel`) 
 }
      
    });     
    
  } else {
    
  return message.channel.send(`Sorry, you don't have manage channels or manage messages permission!`)
    
  }
    
  } catch (e) {}
  
}
