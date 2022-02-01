const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
import {changePrefix,changeStatus,configUpdate,configEmbed,configChangeEmbed,RickRollCheck,RacismCheck,clear,findChannel,helpEmbed} from '/functions.js';
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('idk, helps ig'),
	async execute(interaction, client) {

		await interaction.reply({
			embeds: [{
				color: '#dab420',
				title: 'Help',
				description: 'Help embed',
				fields: [
					{ name: 'Prefix', value: `\`\`\`${functions.config.prefix}\`\`\`` },
					//{ name: 'Prefix reset', value: `${client.user} reset` },
					{ name: 'Purge Commands - delete, purge, clear', value: `\`\`\`${functions.config.prefix}delete 69\`\`\`` },
					{ name: 'Mute Commands - mute', value: `\`\`\`${functions.config.prefix}mute @target <time>\`\`\`` },
					{ name: 'Unmute Commands - unmute', value: `\`\`\`${functions.config.prefix}unmute @target\`\`\`` },
					{ name: 'Minecraft Commands -  ', value: `\`\`\`${functions.config.prefix}mc <minecraft-server-ip>\`\`\`` },
					{ name: 'Help', value: `\`\`\`${functions.config.prefix}help\`\`\`` },
					{ name: 'Settings/functions.config/Set', value: `\`\`\`${functions.config.prefix}set\`\`\`` },

				],
			}]
		});
	},
};