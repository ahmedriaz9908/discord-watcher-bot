
var discord = require('discord.js');
var db = require('quick.db');

exports.run = async function(client, message, args, prefix) {
  
  if (!message.guild) return;
  if (!message.member.hasPermission(`MANAGE_GUILD`)) return message.channel.send(`Sorry, you need manage guild permission to use this!`)
  var swears = await db.get(`swears_${message.guild.id}`);
  var desc = "";
  if (message.content.toLowerCase().includes(`-m`)) {
    
     if (swears == null || swears == undefined) {
  desc = `No swears for guild **${message.guild.name}.`
  } else {
    var list = `Swears for guild **${message.guild.name}**:` + `\n\n`;
    var i = 0;
    await swears.forEach(s => {
      i++
      list += `${i}: ${s}\n`
    })
    await message.author.send(list)
    message.channel.send(`Sent you the list of swears for this guild, check your dms!`)
  }
 
  } else {
  var embed = new discord.RichEmbed().setColor("GOLD");
  if (swears == null || swears == undefined) {
    embed.setDescription(`Swears for guild **${message.guild.name}**: none`)
  } else {
    var list = `Swears for guild **${message.guild.name}**:` + `\n\n`;
    var i = 0;
    
    await swears.forEach(s => {
      i++
      list += `${i}: ${s}\n`
    })
    embed.setDescription(list)
  }
  await message.author.send(embed)
  message.channel.send(`Sent you the list of swears for this guild, check your dms! (if you can't see embeds, append \`-m\` to the end of your command`)
  }
  
  
}
