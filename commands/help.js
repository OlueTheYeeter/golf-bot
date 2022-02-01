const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
//import {changePrefix,changeStatus,configUpdate,configEmbed,configChangeEmbed,RickRollCheck,RacismCheck,clear,findChannel,helpEmbed} from '/functions.js';
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('idk, helps ig'),
	async execute(interaction, client,functions) {

		await interaction.reply({
			embeds: [{
				color: '#dab420',
				title: 'Help',
				description: 'Help embed',
				fields: [
					{ name: 'Prefix', value: `\`\`\`${functions.configValue().prefix}\`\`\`` },
					//{ name: 'Prefix reset', value: `${client.user} reset` },
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
};