var discord = require('discord.js');

exports.run = async function(client, message, args, prefix) {
  
   if (!message.guild) return;
   if (args[0]) { var user = message.mentions.members.first() ? message.mentions.users.first() : await client.fetchUser(args[0]) } else { var user = message.author; }
  
   var createdat = user.createdTimestamp;
   var totaltime = Date.now() - createdat;
   var time = `${Math.floor(totaltime / 3.154e+10)} year(s) ago`;
   if (time.split(` `)[0] == 0) time = `${Math.floor(totaltime / 2.628e+9)} month(s) ago`;
   if (time.split(` `)[0] == 0) time = `${Math.floor(totaltime / 8.64e+7)} day(s) ago`; 
   if (time.split(` `)[0] == 0) time = `${Math.floor(totaltime / 3.6e+6)} hour(s) ago`;
   if (time.split(` `)[0] == 0) time = `${Math.floor(totaltime / 60000)} minute(s) ago`;
   
   var JoinedAt = message.guild.member(user).joinedTimestamp;
   var total = Date.now() - JoinedAt;
   var joined = `${Math.floor(total / 3.154e+10)} year(s) ago`;
   if (joined.split(` `)[0] == 0) joined = `${Math.floor(total / 2.628e+9)} month(s) ago`;
   if (joined.split(` `)[0] == 0) joined = `${Math.floor(total / 8.64e+7)} day(s) ago`; 
   if (joined.split(` `)[0] == 0) joined = `${Math.floor(total / 3.6e+6)} hour(s) ago`;
   if (joined.split(` `)[0] == 0) joined = `${Math.floor(total / 60000)} minute(s) ago`;
   
   var perms = new discord.Permissions(message.guild.member(user).permissions.bitfield).toArray();
   
  
   var embed = new discord.RichEmbed().setColor(`GOLD`).setAuthor(`Info for user ${user.tag}`, user.avatarURL).setTimestamp().setFooter(`User info`);
   embed.addField(`User id`, user.id).addField(`Nickname`, message.guild.member(user).nickname == null ? "none" : message.guild.member(user).nickname).addField(`Account created at`, `${user.createdAt.toString().split(` `).slice(0, 5).join(` `)},\n**${time}**`).addField(`Joined this server at`, `${message.guild.member(user).joinedAt.toString().split(` `).slice(0, 5).join(` `)},\n**${joined}**`).addField(`roles[${message.guild.member(user).roles.filter(r => r.name !== `@everyone`).size}]`, `[`+ message.guild.member(user).roles.map(r => { if (r.name !== `@everyone`) return r; }).join(`, `).slice(2) + `]`)
   .addField(`Key permissions`, perms.join(`, `).toLowerCase().replace(/_/g, " ")).addField(`Join position`, message.guild.members.array().indexOf(message.guild.member(user)) + 1)
   message.channel.send(embed)
  
}
