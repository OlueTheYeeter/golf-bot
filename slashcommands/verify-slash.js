const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Verifies someone.')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('The user that will be verified')
                .setRequired(true)),
	async execute(interaction, client, functions, config) {
        let target = interaction.options.getMention('user');
		await interaction.reply(functions.emojify(text));
        if (message.member.permissions.has('MANAGE_ROLES')) {

			if (target) {
				let memberTarget = message.guild.members.cache.get(target.id);
				memberTarget.roles.add(message.guild.roles.cache.find(role => role.name === "Member").id);
				message.channel.send(`<@${memberTarget.user.id}> has been verified`);
			}
			else {
				message.channel.send('Could not find this nishtastnik!');
			}
		} else message.channel.send(':x: Nice try, you do not have the right permissions.');
	},
};