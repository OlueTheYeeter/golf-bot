const fs = require('fs');
let config = JSON.parse(fs.readFileSync('essential/config.json'));
function configUpdate() {
	fs.writeFile('essential/config.json', JSON.stringify(config, null, 2), (err) => {
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
function letterToUnicode(L) {
	if (L == 'a') return '🇦 ';
	else if (L == 'b') return '🇧 ';
	else if (L == 'c') return '🇨 ';
	else if (L == 'd') return '🇩 ';
	else if (L == 'e') return '🇪 ';
	else if (L == 'f') return '🇫 ';
	else if (L == 'g') return '🇬 ';
	else if (L == 'h') return '🇭 ';
	else if (L == 'i') return '🇮 ';
	else if (L == 'j') return '🇯 ';
	else if (L == 'k') return '🇰 ';
	else if (L == 'l') return '🇱 ';
	else if (L == 'm') return '🇲 ';
	else if (L == 'n') return '🇳 ';
	else if (L == 'o') return '🇴 ';
	else if (L == 'p') return '🇵 ';
	else if (L == 'q') return '🇶 ';
	else if (L == 'r') return '🇷 ';
	else if (L == 's') return '🇸 ';
	else if (L == 't') return '🇹 ';
	else if (L == 'u') return '🇺 ';
	else if (L == 'v') return '🇻 ';
	else if (L == 'w') return '🇼 ';
	else if (L == 'x') return '🇽 ';
	else if (L == 'y') return '🇾 ';
	else if (L == 'z') return '🇿 ';
	else return L;
}
module.exports = {
	test: 1,
	permissionCheck: function (messageOrInteraction, permission) {
		if (messageOrInteraction.member.permissions.has(permission)) {
			return true;
		}
		else {
			messageOrInteraction.reply("You don't have the permission: `"+permission+"`.");
			return false;
		}
	},
	letterToUnicode: function (L) {
		return letterToUnicode(L);
	},
	rng: function (min, max) {
		return Math.round((Math.random() * max) + min);
	},
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
	configChangeEmbed: async function (message, setting, config1) {
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
					{ name: 'Prefix', value: `\`\`\`${config.prefix}\`\`\`` },
					{ name: 'Prefix reset', value: `\`\`\`@${config.clientId} reset\`\`\`` },
					{ name: 'Purge Commands - delete, purge, clear', value: `\`\`\`${config.prefix}delete 69\`\`\`` },
					{ name: 'Minecraft Commands -  ', value: `\`\`\`${config.prefix}mc <minecraft-server-ip>\`\`\`` },
					{ name: 'Help', value: `\`\`\`${config.prefix}help\`\`\`` },
					{ name: 'Settings/functions.config/Set', value: `\`\`\`${config.prefix}set\`\`\`` },

				],
			}]
		});

	},

	findChannel: function (channelId) {
		return client.channels.cache.find(channel => channel.id === channelId);
	},
	leaveServer: function (type, server) {
		if (type == "name") {
			client.guilds.cache.find(guild => guild.name == server).leave();
		}
		if (type == "id") {
			client.guilds.cache.find(guild => guild.id == server).leave();
		}

		return 0;
	},

	clear: function (amount, message) {
		if (!amount) return message.reply('*Instructions unclear, my bin exploded.* Please try again and enter the amount of messages you want me to delete.');
		else if (isNaN(amount)) return message.reply(':x: *Instructions unclear, my bin exploded.* Please enter a **number**.');
		else if (amount > 100) return message.reply(':x: :face_with_raised_eyebrow: U wot m8? You can only delete up to 100 messages');
		else if (amount < 1) return message.reply(':x: Enter a positive number please.');
		const deleteCount = parseInt(amount);

		if (!deleteCount || deleteCount < 1 || deleteCount > 100) return;
		message.channel
			.bulkDelete(deleteCount + 1,true)
			.then(messages => {
				console.log(`Bulk deleted ${messages.size} messages`)
				message.channel.send(`Deleted ${messages.size} messages.`)
		})
			.catch(console.error);

	},
	//racism detection

	emojify: function (string) {
		let result = string.replace(' ', '\n');
		result = result.toLowerCase().split('').map(letter => {
			if (/[a-z]/g.test(letter)) {
				//return `:regional_indicator_${letter}:`
				return letterToUnicode(letter);
			}

			return letter;
		}).join('');
		result.replace(" ", "\n");
		return result;
	},


	//rickroll detection

};