const Discord = require('discord.js');

const client = new Discord.Client();   

const prefix = '!'; 

const fs = require('fs'); 

client.commands = new Discord.Collection(); 

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`); 

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Bot is online!');
}); 

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return; 

    const args = message.content.slice(prefix.length).split(/ +/); 
    const command = args.shift().toLowerCase(); 

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command === 'embed') {
        client.commands.get('embed').execute(message, args, Discord); 
    } else if (command === 'add') {
        client.commands.get('add').execute(message, args);
    }
})

client.login('ODQzNTk1NDIxNDQzMTYyMTMz.YKGJdQ.rnigDg91aCOG0gh0pUA6nq4eIUs'); 