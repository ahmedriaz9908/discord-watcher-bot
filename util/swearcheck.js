var discord = require('discord.js');
var db = require('quick.db');

exports.check = async function(message) {
  var swears = await db.get(`swears_${message.guild.id}`)
  for (let i = 0; i < swears.length; i++) {
    if (message.content.toLowerCase().includes(swears[i])) return true;    
  }
}
  
