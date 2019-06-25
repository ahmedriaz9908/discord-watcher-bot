var discord = require(`discord.js`);
var db = require(`quick.db`);

exports.run = async function(client, message, args, prefix) {
  
  try {
    
      if (db.get(`swearaction_${message.guild.id}`) == 1) { //WARNING
          
        var msg = await db.get(`warningmsg_${message.guild.id}`) 
        var embed = new discord.RichEmbed().setColor("GOLD").setTimestamp().setDescription(msg).setFooter(`Warning for user ${message.author.tag}`).setTitle(message.guild.name + ` - warning for swearing`)
        message.author.send(embed)
          
        } else if (db.get(`swearaction_${message.guild.id}`) == 2) { //KICK
          
        if (!message.member.kickable) return;
        await message.author.send(`You have been kicked from **${message.guild.name}** for swearing.`)
        message.member.kick(`swearing`).catch(e => {})
          
        } else if (db.get(`swearaction_${message.guild.id}`) == 3) { //BAN
          
        if (!message.member.bannable) return;
        await message.author.send(`You have been banned from **${message.guild.name}** for swearing.`)
        message.member.ban(`swearing`).catch(e => {})
          
        }
        
        if (db.get(`sweardelete_${message.guild.id}`)) { //MESSAGE DELETE
        message.delete().catch(e => {})
        }
        
    } catch (e) {}
}
