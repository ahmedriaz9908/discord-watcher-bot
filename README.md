Discord Watcher Bot - using discord.js, quick.db and express(for hosting on glitch)

# help ![alt text](https://cdn.discordapp.com/attachments/591447325440868361/593165842733072404/unknown.png)


- commands folder - folder containing all commands. Commands are all server only, except for help command

# commands: 
- !addswear - add a swear that the bot should moderate
- !deleteswears - delete all swears saved for a server
- !listswears - dm you a list of all swears for a server; append a `-m` to ur command if you can't see embeds
- !swearaction [number] - choose what the bot should do what somebody swears
0. none
1. warning. You can also add a warning message at the end if you want
2. kick
3. ban
4. delete message 
- (You can enable 1 and 4 at the same time)

- !ban [@user or user id] - @user is pinging someone, user id can be obtained by having developer mode on and pressing on a user and pressing copy ID
- !kick [@user or user id]

- !mute @someone [optional: time] - mute someone. Time has to be parsed as a certain amount of days [d], hours [h], minutes [m]
example: !mute @spammer 3d 6h 2m - will mute someone for 3 days, 6 hours, 2 minutes
- !unmute @someone - unmute someone

