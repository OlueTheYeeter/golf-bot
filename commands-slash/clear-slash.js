
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
        interaction.reply('Command is bwoken.');
        /*let msg = interaction.options.getInteger('messages');
        client.on('messageCreate', message => {
        if (functions.permissionCheck(interaction,'MANAGE_MESSAGES')) {
            //if (args[0] === 'a' || args[0] === 'all') args[0] = 99;
            
                functions.clear(parseInt(msg), message);
            
		}
        else interaction.reply(':x: Nice try, you do not have the right permissions.');
        })*/
    },
};