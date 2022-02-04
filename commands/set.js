const fs = require('fs');
let configFile='config.json';
let config = JSON.parse(fs.readFileSync('config.json'));
module.exports = {
    name : 'set',
    aliases: ['setting','settings','config','configuration','s','conf'],
    description : "Config change",
    execute (message,cmd,args,functions,DiscordClient){
       //config embed (mangusta set)
		if (!args[0]) {
			functions.configEmbed(message);
			return;
		}

		if (message.member.permissions.has('ADMINISTRATOR')) {

			if (args[0] === 'prefix') {
				if (!args[1]) message.channel.send('Enter prefix in " ", please.');
				else {
					functions.changePrefix(message);
					functions.configChangeEmbed(message, "Prefix"),config;

				}
			}
			else if (args[0] === 'anti-racism') {
				if (args[1] === 'on' || args[1] === 'off') {
					config.RacismDetection = args[1];

					functions.fileUpdate('config.json',config);
					functions.configChangeEmbed(message, "RacismDetection",config);
					//message.channel.send(`Anti-Racism is now **${config.RacismDetection}**`);
					//console.log('Anti-Racism ' + config.RacismDetection);
				} else message.channel.send('Detection commands can only be ```**ON**``` or ```**OFF**```');
			}
			else if (args[0] === 'anti-rickroll') {

				if (args[1] === 'on' || args[1] === 'off') {
					config.RickRollDetection = args[1];

					functions.fileUpdate('config.json',config);
					functions.configChangeEmbed(message, "RickRollDetection",config);
					//message.channel.send(`Anti-Rickroll is now **${config.RickRollDetection}**`);
					//console.log('Anti-RickRoll' + config.RickRollDetection);
				}
				else message.channel.send('Detection commands can only be `**ON**` or `**OFF**`');
			}
			else if (args[0] === 'status') {
				if (message.author.id == functions.configValue().botOwner) {
					functions.changeStatus(message,DiscordClient);
					functions.configChangeEmbed(message, "Status",config);
				}
				else message.reply(`You can't do this.`);
			}
			else if (message.content.indexOf('log')+1) {
				if (args[1] === 'on' || args[1] === 'off') {
					if (message.author.id == functions.configValue().botOwner) {
						config.messageLogging = args[1];
						functions.fileUpdate('config.json',config);;
						functions.configChangeEmbed(message, "MessageLogging",config);
						console.log('Message Logging' + config.messageLogging);
					} else message.reply(`You can't do this.`);
				} else message.channel.send('Logging can only be ```ON``` or ```OFF```');
			}
			else if (args[0].indexOf('verif')+1 ) {
				if (args[1] === 'on' || args[1] === 'off') {
					if (message.member.hasPermission("MANAGE_ROLES")) {
						config.verify = args[1];

						functions.fileUpdate('config.json',config);;
						functions.configChangeEmbed(message, "Verify",config);
					} else message.reply(`You can't do this.`);
				} else message.channel.send('Detection commands can only be ```ON``` or ```OFF```');
			}
		}
		else // ako nqma admin perms
         message.reply(':x: `You do not have ADMIN permissions.`');
    }
}