var discord = require('discord.js');
var db = require('quick.db');

exports.run = async function(client) {

  var mutedmembers = await db.get(`muted`);
  
  if (!mutedmembers) return;
  
    mutedmembers.forEach(async m => {

    if (m.end < Date.now()) {
      
    var guild = await client.guilds.get(m.guild);
    var user = await client.fetchUser(m.user);
    if (!guild.member(user)) return;
    var role = await guild.member(user).roles.find(r => r.name.toLowerCase() == "watcher-muted")
    if (role) await guild.member(user).removeRole(role);
      
    var newarray = mutedmembers.filter(function(value) {
      return value.user !== user.id
    });
      
    db.set(`muted`, newarray)
          
    }
      
    })
  
}
