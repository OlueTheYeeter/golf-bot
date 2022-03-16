const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fs = require('fs');
let config = JSON.parse(fs.readFileSync('essential/config.json'));
module.exports = {
	data: new SlashCommandBuilder()
		.setName('golf')
		.setDescription('Sends image of the greatest car of all time.'),
	async execute(interaction, client,functions) {
        const golf = new Discord.MessageAttachment('./data/images/golf4.jpg');
        interaction.reply({files:[golf]});
	},
};