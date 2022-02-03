const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Bachkaj, za da ne backam majka ti'),
	async execute(interaction) {
		await interaction.reply('Baca be momche, baca');
	},
};