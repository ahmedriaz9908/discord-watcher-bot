var [app, discord, db] = [require(`express`), require(`discord.js`), require(`quick.db`)];
app().listen(process.env.PORT);
var client = new discord.Client();
var auth = require(`./auth.json`);
var prefix = auth.prefix;
var swearcheck = require(`./util/swearcheck.js`);

client.on(`ready`, async function()
{ 

  console.log(`Ready at ${new Date()}`)
  client.user.setActivity(`${prefix}help | in ${client.guilds.size} server(s)`, {type: "LISTENING"})
  
  setInterval(async function() { //UNMUTE MEMBERS IF THEIR TIME IS UP
    var file = require(`./util/MutedMembers.js`)
    file.run(client)
  }, 5000)
  
}
);

client.on(`message`, async message => {
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();
    if (message.author.bot) return;
    //IF MESSAGE STARTS WITH PREFIX
    if (message.content.indexOf(prefix) == 0) {
      
//RUN THE COMMAND IF IT EXISTS. ALL COMMANDS ARE SERVER ONLY EXCEPT FOR HELP COMMAND
      try {
        var file = require(`./commands/${command}.js`)
        file.run(client, message, args, prefix)
      } catch (e) {
        
      }
    
 
//IF COMMAND DOESN'T START WITH PREFIX
    } else {
      
      if (!message.guild) return;
      
      if (await swearcheck.check(message)) { //IF SOMEBODY SWEARED
        var file = require(`./util/somebodysweared.js`)
        file.run(client, message, args, prefix)
      }  
      
    }
  
});



client.login(auth.token);
