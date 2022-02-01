function changePrefix(message) {
	const index1 = message.content.indexOf("\"");
	const out = message.content.replace("\"", " ");
	const index2 = out.indexOf("\"");
	config.prefix = message.content.substring(index1 + 1, index2);
	configUpdate();
}
function changeStatus(message) {
	const index1 = message.content.indexOf("\"")
		, out = message.content.replace("\"", " ")
		, index2 = out.indexOf("\"");
	config.status = message.content.substring(index1 + 1, index2);
	client.user.setActivity(config.status);
	configUpdate();
}
function configUpdate() {
	fs.writeFile('config.json', JSON.stringify(config, null, 2), (err) => {
		if (err) throw err;
		console.log('Config saved.\n\n');
		console.log(config);
		console.log("\n\n\n");
	});
}
function configEmbed(message) {
	message.channel.send({
		embed: {
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

		}
	})
	console.log("Config embed sent.")
}
async function configChangeEmbed(message, setting) {
	let configsetting;
	let color1;
	switch (setting) {
		case "Prefix": {
			color1 = '#427b7d'
			configsetting = config.prefix;
			break;
		}
		case "Verify": {
			color1 = '#00d407'
			configsetting = config.verify;
			break;
		}
		case "RacismDetection": {
			color1 = '#000000'
			configsetting = config.RacismDetection;
			break;
		}
		case "RickRollDetection": {
			color1 = '#d1d1ba'
			configsetting = config.RickRollDetection;
			break;
		}
		case "Status": {
			color1 = '#6a04c9'
			configsetting = config.status;
			break;
		}
		case "MessageLogging": {
			color1 = '#7289DA'
			configsetting = config.messageLogging;
			break;
		}


	}
	console.log(setting + " is now " + configsetting);

	let configEmbedUpdateMessage = await message.channel.send({
		embed: {
			color: color1,
			title: 'Config Update:',
			fields: [
				{ name: setting, value: `\`\`\`${configsetting}\`\`\`` },
			],
		}
	})
	console.log("Config change embed sent.");
	configEmbedUpdateMessage.react('⚙️');

	const filter = (reaction, user) => {
		return ['⚙️'].includes(reaction.emoji.name) && user.id === message.author.id;
	};

	configEmbedUpdateMessage
		.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
		.then(collected => {
			const reaction = collected.first();
			if (reaction.emoji.name === '⚙️') {
				console.log("Config embed requested.");
				configEmbed(message);
			}
		})

}

function helpEmbed(message) {
	message.channel.send({
		embed: {
			color: '#dab420',
			title: 'Help',
			fields: [
				{ name: 'Prefix', value: `\`\`\`${config.prefix}\`\`\`` },
				{ name: 'Prefix reset', value: `${client.user} reset` },
				{ name: 'Purge Commands - delete, purge, clear', value: `\`\`\`${config.prefix}delete 69\`\`\`` },
				{ name: 'Mute Commands - mute', value: `\`\`\`${config.prefix}mute @target <time>\`\`\`` },
				{ name: 'Unmute Commands - unmute', value: `\`\`\`${config.prefix}unmute @target\`\`\`` },
				{ name: 'Minecraft Commands -  ', value: `\`\`\`${config.prefix}mc <minecraft-server-ip>\`\`\`` },
				{ name: 'Help', value: `\`\`\`${config.prefix}help\`\`\`` },
				{ name: 'Settings/Config/Set', value: `\`\`\`${config.prefix}set\`\`\`` },

			],
			description: 'Help embed'

		}
	})
}
function findChannel(channelId) {
	return client.channels.cache.find(channel => channel.id === channelId);
}

function clear(amount, message, out) {
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
					setTimeout(() => clear(1, message, true), 5000); //in ms
				}


			});
		} catch (err) {
			console.log(err);
		}


	}
}
//racism detection
function RacismCheck(message) {
	if (config.RacismDetection === 'off') return;
	for (let i = 0; i < racist.length; i++) {
		if (message.content.indexOf(racist[i]) != -1) {
			//clear(1, message);
			message.channel.bulkDelete(1) /**/.then(messages => console.log(`Deleted racist message.`)) /**/.catch(console.error);
			message.channel.send(`${message.author} was racist.`);
			console.log(`${message.author.username} was racist.`)
		}

	}
}
//rickroll detection
function RickRollCheck(message) {
	if (config.RickRollDetection === 'off') return;
	for (let i = 0; i < rick.length; i++) {
		if (message.content.indexOf(rick[i]) != -1) {
			clear(1, message);
			message.channel.send(`${message.author}, get rekt.`);
		}

	}
}
export {changePrefix,changeStatus,configUpdate,configEmbed,configChangeEmbed,RickRollCheck,RacismCheck,clear,findChannel,helpEmbed};