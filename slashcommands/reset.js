const { SlashCommandBuilder } = require('@discordjs/builders');

const fs = require('fs');
let config = JSON.parse(fs.readFileSync('config.json'));
module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('Resets bot prefix(does not affect slash commands)'),
	async execute(interaction, client,functions) {
		config.prefix = "pernik ";
		functions.fileUpdate('config.json',config);
        interaction.reply('Bot prefix reset to: '+config.prefix);
	},
};