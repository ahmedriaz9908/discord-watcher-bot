var discord = require('discord.js');

exports.parse = async function(parse) {
 
  var endtime = 0;
  
  if (parse.join(` `).includes(`d`)) { 
  var days = await parse.find(function(days) { 
  return days.includes(`d`) });
  days = days.replace(`d`, ``); 
  if (days !== "" && isNaN(days)) return false;
  if (days == "") days = 1; 
  endtime = endtime + (days * 8.64e+7);
  }
  
  if (parse.join(` `).includes(`h`)) { 
  var hours = await parse.find(function(hours) { return hours.includes(`h`) });
  hours = hours.replace(`h`, ``);
  if (hours !== "" && isNaN(hours)) return false;
  if (hours == "") hours = 1; 
  endtime = endtime + (hours * 3.6e+6);
  }
  
  if (parse.join(` `).includes(`m`)) { 
    
  var minutes = await parse.find(function(minutes) { return minutes.includes(`m`) });
  minutes = minutes.replace(`m`, ``);
  if (minutes !== "" && isNaN(minutes)) return false;
  if (minutes == "") minutes = 1;
  endtime = endtime + (minutes * 60000);
    
  }

  if (days == undefined && hours == undefined && minutes == undefined) return false;
  return [endtime, days, hours, minutes];
}
