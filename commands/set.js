const fs = require('fs');
let configFile='essential/config.json';
let config = JSON.parse(fs.readFileSync('essential/config.json'));
module.exports = {
    name : 'set',
    aliases: ['setting','settings','config','configuration','s','conf'],
    description : "Config change",
    execute (message,cmd,args,functions,DiscordClient){
       //config embed (golf set)
		if (!args[0]) {
			functions.configEmbed(message);
			return;
		}

		if (functions.permissionCheck(message,'ADMINISTRATOR')) {

			if (args[0] === 'prefix') {
				if (!args[1]) message.channel.send('Enter prefix in " ", please.');
				else {
					functions.changePrefix(message);
					functions.configChangeEmbed(message, "Prefix",functions.configValue());

				}
			}
			else if (args[0] === 'anti-racism') {
				if (args[1] === 'on' || args[1] === 'off') {
					config.RacismDetection = args[1];

					functions.fileUpdate('essential/config.json',config);
					functions.configChangeEmbed(message, "RacismDetection",JSON.parse(fs.readFileSync('essential/config.json')));
					//message.channel.send(`Anti-Racism is now **${config.RacismDetection}**`);
					//console.log('Anti-Racism ' + config.RacismDetection);
				} else message.channel.send('Detection commands can only be ```**ON**``` or ```**OFF**```');
			}
			else if (args[0] === 'anti-rickroll') {

				if (args[1] === 'on' || args[1] === 'off') {
					config.RickRollDetection = args[1];

					functions.fileUpdate('essential/config.json',config);
					functions.configChangeEmbed(message, "RickRollDetection",JSON.parse(fs.readFileSync('essential/config.json')));
					//message.channel.send(`Anti-Rickroll is now **${config.RickRollDetection}**`);
					//console.log('Anti-RickRoll' + config.RickRollDetection);
				}
				else message.channel.send('Detection commands can only be `**ON**` or `**OFF**`');
			}
			else if (args[0] === 'status') {
				if (message.author.id == functions.configValue().botOwner) {
					functions.changeStatus(message,DiscordClient);
					functions.configChangeEmbed(message, "Status",JSON.parse(fs.readFileSync('essential/config.json')));
				}
				else message.reply(`You can't do this.`);
			}
			else if (message.content.indexOf('log')+1) {
				if (args[1] === 'on' || args[1] === 'off') {
					if (message.author.id == functions.configValue().botOwner) {
						config.messageLogging = args[1];
						functions.fileUpdate('essential/config.json',config);
						functions.configChangeEmbed(message, "MessageLogging",JSON.parse(fs.readFileSync('essential/config.json')));
						console.log('Message Logging' + config.messageLogging);
					} else message.reply(`You can't do this.`);
				} else message.channel.send('Logging can only be ```ON``` or ```OFF```');
			}
			else if (args[0].indexOf('verif')+1 ) {
				if (args[1] === 'on' || args[1] === 'off') {
					if (message.member.hasPermission("MANAGE_ROLES")) {
						config.verify = args[1];

						functions.fileUpdate('essential/config.json',config);
						functions.configChangeEmbed(message, "Verify",JSON.parse(fs.readFileSync('essential/config.json')));
					} else message.reply(`You can't do this.`);
				} else message.channel.send('Detection commands can only be ```ON``` or ```OFF```');
			}
		}
		else // ako nqma admin perms
         message.reply(':x: `You do not have ADMIN permissions.`');
    }
}