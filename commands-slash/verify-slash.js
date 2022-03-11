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
		let target = interaction.options.getMentionable('user');
		if (functions.permissionCheck(interaction,'MANAGE_ROLES')) {

			if (target) {
				let memberTarget = interaction.guild.members.cache.get(target.id);
				try {
					memberTarget.roles.add(interaction.guild.roles.cache.find(role => role.name === "Member").id);
					console.log("Added member role to "+target.user.tag);
				} catch (err) {
					console.log(err);
					interaction.reply("Error: " + err);
				}
				interaction.reply(`<@${memberTarget.user.id}> has been verified`);
			}
			else {
				interaction.reply('Could not find this nishtastnik!');
			}
		} else interaction.reply(':x: Nice try, you do not have the right permissions.');
	},
};