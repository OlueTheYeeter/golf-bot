const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emojify')
		.setDescription('Replaces letters with emojis')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to emojify')
                .setRequired(true)),
	async execute(interaction, client, functions, config) {
        let text = interaction.options.getString('text');
		await interaction.reply(functions.emojify(text));
	},
};