const { SlashCommandBuilder } = require('@discordjs/builders');
const ourcraft = require('minecraft-server-util');
const Discord= require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('minecraft')
		.setDescription('Minecraft command')
        .addStringOption(option =>
            option.setName('ip')
                .setDescription('The minecraft server ip (WITHOUT THE PORT)')
                .setRequired(true))
		.addIntegerOption(option =>
					option.setName('port')
						.setDescription('The minecraft server port')
						.setRequired(false)),
	async execute(interaction, client, functions, config) {
        let serverIp = interaction.options.getString('ip');
		let serverPort = interaction.options.getInteger('port');
		//if (!serverIp) return message.channel.send('What about minecraft?')
		if (serverIp === 'smp') {
			serverIp = "213.214.94.248";
		}
		if (serverIp === 'hypixel') serverIp = "mc.hypixel.net";
		if (!serverPort) serverPort = 25565;
		try{
		ourcraft.status(serverIp, { port: parseInt(serverPort) }).then((response) => {
			//console.log(response);
			if(!response) interaction.reply('Server'+ serverIp + ":")
            console.log("Server IP: " + response.host);
			console.log("Online Players: " + response.onlinePlayers);
			console.log("Max Players: " + response.maxPlayers);
			console.log("Version: " + response.version);
			console.log("Latency: " + response.roundTripLatency);
            interaction.reply({
                embeds: [{
                    color: '#197103',
                    title: 'Minecraft Server Status',
                    fields: [
                        { name: 'Server IP:', value: response.host.toString() },
					    { name: 'Online Mangos:', value: response.onlinePlayers.toString() },
					    { name: 'Max Mangos:', value: response.maxPlayers.toString() },
					    { name: 'Minecraft Version:', value: response.version.toString() },
    
                    ],
                }]
            });
            
			//console.log(embed);
			

		})
		.catch(console.error);
		}catch(err){
			console.log(err);
		}
	},
};