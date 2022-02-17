
const { SlashCommandBuilder } = require('@discordjs/builders');

const Discord = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Deletes messages')
        .addIntegerOption(option =>
            option.setName('messages')
                .setDescription('Amount of messages')
                .setRequired(true)),
    async execute(interaction, client, functions, config) {
        client.on('messageCreate', message => {
        if (intecration.member.permissions.has('MANAGE_MESSAGES')) {
            //if (args[0] === 'a' || args[0] === 'all') args[0] = 99;
            
                functions.clear(parseInt(port), message);
            
		}
        else interaction.reply(':x: Nice try, you do not have the right permissions.');
        })
    },
};