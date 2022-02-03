//import {changePrefix,changeStatus,configUpdate,configEmbed,configChangeEmbed,RickRollCheck,RacismCheck,clear,findChannel,helpEmbed} from './functions.js';

const Discord = require('discord.js');
const client = new Discord.Client({
	intents: [
		'GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES', 'GUILD_PRESENCES'
	]
});
const fs = require('fs');
const functions = eval(fs.readFileSync('functions.js') + '');
//const { token } = require('./config.json');

let config = JSON.parse(fs.readFileSync('config.json'));
require('dotenv').config();
client.login(process.env.TOKEN);
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
	console.log('Servers: \n'); client.guilds.cache.forEach(g => { console.log(g.name) });
})
client.slashCommands = new Discord.Collection();
const slashCommandFiles = fs.readdirSync('./slash-commands').filter(file => file.endsWith('.js'));
for (const file of slashCommandFiles) {
	const slashCommand = require(`./slash-commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.slashCommands.set(slashCommand.data.name, slashCommand);
}
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
client.on('messageCreate',  message => {
	const args = message.content.slice(config.prefix.length).split(/ +/);

	const cmd = args.shift().toLowerCase();
	const command = client.commands.get(cmd) ||
		client.commands.find(a => a.aliases.includes(cmd));
	if(!command) return;
	try {
		 command.execute(message,cmd,args,functions);
	} catch (error) {
		console.error(error);
		 message.channel.send({ content: 'There was an error while executing this command!', ephemeral: true });
	}

})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	//if (interaction.commandName === "test") return interaction.reply("Baca");
	const slashCommand = client.slashCommands.get(interaction.commandName);

	if (!slashCommand) return;

	try {
		await slashCommand.execute(interaction, client, functions, config);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


