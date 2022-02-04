const fs = require('fs');
let configFile = 'config.json';
let config = JSON.parse(fs.readFileSync('config.json'));
function configUpdate() {
	fs.writeFile('config.json', JSON.stringify(config, null, 2), (err) => {
		if (err) throw err;
		console.log('Config saved.\n\n');
		console.log(config);
		console.log("\n\n\n");
	});
}
function betweenQuotes(string) {
	return string.substring(
		string.indexOf("\"") + 1,
		string.lastIndexOf("\"")
	);
}
function configEmbed(message) {
	message.channel.send({
		embeds: [{
			color: '#99AAB5',
			title: 'Config',
			fields: [
				{ name: 'Prefix', value: `\`\`\`${config.prefix}\`\`\`` },
				{ name: 'Anti-Racism', value: `\`\`\`${config.RacismDetection}\`\`\`` },
				{ name: 'Anti-Rickroll', value: `\`\`\`${config.RickRollDetection}\`\`\`` },
				{ name: 'Status', value: `\`\`\`${config.status}\`\`\`` },
				{ name: 'Message Logging', value: `\`\`\`${config.messageLogging}\`\`\`` },
				{ name: 'Version', value: `\`\`\`${config.version}\`\`\`` },
			],
			description: 'Config embed'
		}]
	});
	console.log("Config embed sent.")
}
module.exports = {
	betweenQuotes: function (string) {
		return betweenQuotes(string);
	},
	changePrefix: function (message) {
		config.prefix = betweenQuotes(message.content);
		configUpdate();
	},
	changeStatus: function (message, client) {
		config.status = betweenQuotes(message.content);

		client.user.setActivity(config.status);

		configUpdate();
	},
	configValue: function () {
		return config;
	},
	fileUpdate: function (fileName, fileContent) {
		fs.writeFile(fileName, JSON.stringify(fileContent, null, 2), (err) => {
			if (err) throw err;
			console.log('File:' + fileName + 'saved.\n\n');
			console.log(fileContent);
			console.log("\n\n\n");
		});
	},
	configEmbed: function (message) {
		return configEmbed(message);
	},
	configChangeEmbed: async function (message, setting,config1) {
		let configsetting;
		let color1;
		switch (setting) {
			case "Prefix": {
				color1 = '#427b7d'
				configsetting = config1.prefix;
				break;
			}
			case "Verify": {
				color1 = '#00d407'
				configsetting = config1.verify;
				break;
			}
			case "RacismDetection": {
				color1 = '#000000'
				configsetting = config1.RacismDetection;
				break;
			}
			case "RickRollDetection": {
				color1 = '#d1d1ba'
				configsetting = config1.RickRollDetection;
				break;
			}
			case "Status": {
				color1 = '#6a04c9'
				configsetting = config1.status;
				break;
			}
			case "MessageLogging": {
				color1 = '#7289DA'
				configsetting = config1.messageLogging;
				break;
			}


		}
		console.log(setting + " is now " + configsetting);

		let configEmbedUpdateMessage = await message.channel.send({
			embeds: [{
				color: color1,
				title: 'Config Update:',
				fields: [
					{ name: setting, value: `\`\`\`${configsetting}\`\`\`` },
				],
			}]
		});
		console.log("Config change embed sent.");
		configEmbedUpdateMessage.react('⚙️');

		const filter = (reaction, user) => {
			return ['⚙️'].includes(reaction.emoji.name) && user.id === message.author.id;
		};

		configEmbedUpdateMessage
			.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();
				if (reaction.emoji.name === '⚙️') {
					console.log("Config embed requested.");
					configEmbed(message);
				}
			})
			.catch(console.error);

	},

	helpEmbed: function (message) {
		message.channel.send({
			embeds: [{
				color: '#dab420',
				title: 'Help',
				description: 'Help embed',
				fields: [
					{ name: 'Prefix', value: `\`\`\`${functions.configValue().prefix}\`\`\`` },
					{ name: 'Prefix reset', value: `\`\`\`@${client.user.tag} reset\`\`\`` },
					{ name: 'Purge Commands - delete, purge, clear', value: `\`\`\`${functions.configValue().prefix}delete 69\`\`\`` },
					{ name: 'Mute Commands - mute', value: `\`\`\`${functions.configValue().prefix}mute @target <time>\`\`\`` },
					{ name: 'Unmute Commands - unmute', value: `\`\`\`${functions.configValue().prefix}unmute @target\`\`\`` },
					{ name: 'Minecraft Commands -  ', value: `\`\`\`${functions.configValue().prefix}mc <minecraft-server-ip>\`\`\`` },
					{ name: 'Help', value: `\`\`\`${functions.configValue().prefix}help\`\`\`` },
					{ name: 'Settings/functions.config/Set', value: `\`\`\`${functions.configValue().prefix}set\`\`\`` },

				],
			}]
		});
	},

	findChannel: function (channelId) {
		return client.channels.cache.find(channel => channel.id === channelId);
	},

	clear: function (amount, message, out) {
		if (!amount) return message.reply('*Instructions unclear, my bin exploded.* Please try again and enter the amount of messages you want me to delete.');
		else if (isNaN(amount)) return message.reply(':x: *Instructions unclear, my bin exploded.* Please enter a **number**.');
		else if (amount > 100) return message.reply(':x: :face_with_raised_eyebrow: U wot m8? You can only delete up to 100 messages');
		else if (amount < 1) return message.reply(':x: Enter a positive number please.');
		else {
			try {
				message.channel.messages.fetch({ limit: amount }).then(messages => {
					message.channel.bulkDelete(messages, true);
					if (!out) {
						message.channel.send(`Deleted **${amount}** messages.`);
						console.log(`Deleted ${amount} messages.`);
						// setTimeout(clear(1,message,true), 5000) //in ms
						setTimeout(() => message.channel.bulkDelete(1), 5000); //in ms
					}


				});
			} catch (err) {
				console.log(err);
			}


		}
	},
	//racism detection
	
	emojify: function (string) {
		let result = string.toLowerCase().split('').map(letter => {
			if (/[a-z]/g.test(letter)) {
				return `:regional_indicator_${letter}:`
			}
			return letter;
		}).join('');
		return result;
	},
	//rickroll detection
	
};