/*const ourcraft = require('minecraft-server-util');

module.exports = {
	name : 'minecraft',
	aliases: ['ourcraft','mc'],
	description : "Minecraft server status",
	execute (message,cmd,args,functions){
		if (!args[0]) return message.channel.send('What about minecraft?')
		if (args[0] === 'smp') {
			args[0] = "213.214.94.248";
		}
		if (args[0] === 'hypixel') args[0] = mc.hypixel.net;
		if (!args[1]) args[1] = 25565;
		try{
		ourcraft.status(args[0], { port: parseInt(args[1]) }).then((response) => {
			
		   console.log("Server IP: " + response.host);
			console.log("Online Players: " + response.onlinePlayers);
			console.log("Max Players: " + response.maxPlayers);
			console.log("Version: " + response.version);
			console.log("Latency: " + response.roundTripLatency);
			message.channel.send({
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
	}
}*/
const Discord= require('discord.js');
const { MinecraftServerListPing, MinecraftQuery } = require("minecraft-status");
module.exports = {
	name: 'minecraft',
	aliases: ['ourcraft', 'mc'],
	description: "Minecraft server status",
	execute(message, cmd, args, functions) {
		if (!args[0]) return message.channel.send('What about minecraft?')
		if (args[0] === 'smp') {
			args[0] = "213.214.94.248";
		}
		if (args[0] === 'hypixel') args[0] = "mc.hypixel.net";
		if (!args[1]) args[1] = 25565;
		MinecraftServerListPing.ping(4, args[0], parseInt(args[1]), 300)
			.then(response => {
				message.channel.send({
					embeds: [{
						color: '#197103',
						title: 'Minecraft Server Status',
						fields: [
							{ name: 'Server IP:', value: args[0] },
							{ name: 'Online Players:', value: response.players.online.toString() },
							{ name: 'Max Players:', value: response.players.max.toString() },
							{ name: 'Minecraft Version:', value: response.version.name.toString() },
		
						],
					}]
				});

			})
			.catch(error => {
				console.log(error);
			});
	}
}
