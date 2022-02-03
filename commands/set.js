const fs = require('fs');
let config = JSON.parse(fs.readFileSync('config.json'));
module.exports = {
    name : 'set',
    aliases: ['setting','settings','config','configuration','s','conf'],
    description : "Config change",
    execute (message,cmd,args,functions){
       //config embed (mangusta set)
		if (!args[0]) {
			functions.configEmbed(message);
			return;
		}
        else message.channel.send('Config change coming soon.');
        /*
		if (message.member.permissions.has('ADMINISTRATOR')) {

			if (args[0] === 'prefix') {
				if (!args[1]) message.channel.send('Enter prefix in " ", please.');
				else {
					functions.changePrefix(message);
					functions.configChangeEmbed(message, "Prefix");

				}
			}
			else if (args[0] === 'anti-racism') {
				if (args[1] === 'on' || args[1] === 'off') {
					config.RacismDetection = args[1];

					functions.configUpdate();
					functions.configChangeEmbed(message, "RacismDetection");
					//message.channel.send(`Anti-Racism is now **${config.RacismDetection}**`);
					console.log('Anti-Racism ' + config.RacismDetection);
				} else message.channel.send('Detection commands can only be ```**ON**``` or ```**OFF**```');
			}
			else if (args[0] === 'anti-rickroll') {

				if (args[1] === 'on' || args[1] === 'off') {
					config.RickRollDetection = args[1];

					functions.configUpdate();
					functions.configChangeEmbed(message, "RickRollDetection");
					//message.channel.send(`Anti-Rickroll is now **${config.RickRollDetection}**`);
					console.log('Anti-RickRoll' + config.RickRollDetection);
				}
				else message.channel.send('Detection commands can only be `**ON**` or `**OFF**`');
			}
			else if (args[0] === 'status') {
				if (message.author.id == olue) {
					functions.changeStatus(message);
					functions.configChangeEmbed(message, "Status");
				}
				else message.reply(`You can't do this.`);
			}
			else if (message.content.includes('logging') || args[0] == 'log' || message.content.includes('messagelog')) {
				if (args[1] === 'on' || args[1] === 'off') {
					if (message.author.id == olue) {
						config.messageLogging = args[1];
						functions.configUpdate();
						functions.configChangeEmbed(message, "MessageLogging");
						console.log('Message Logging' + config.messageLogging);
					} else message.reply(`You can't do this.`);
				} else message.channel.send('Logging can only be ```ON``` or ```OFF```');
			}
			else if (args[0].includes('verif') || args[0] == 'verify') {
				if (args[1] === 'on' || args[1] === 'off') {
					if (message.member.hasPermission("MANAGE_ROLES")) {
						config.verify = args[1];

						functions.configUpdate();
						functions.configChangeEmbed(message, "Verify");
					} else message.reply(`You can't do this.`);
				} else message.channel.send('Detection commands can only be ```ON``` or ```OFF```');
			}
		}
		else // ako nqma admin perms
         message.reply(':x: `You do not have ADMIN permissions.`');
         */
    }
}