//import {changePrefix,changeStatus,configUpdate,configEmbed,configChangeEmbed,RickRollCheck,RacismCheck,clear,findChannel,helpEmbed} from './functions.js';

const Discord = require('discord.js');
/*const client = new Discord.Client({
	intents: [
		'GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES', 'GUILD_PRESENCES','GUILD_MESSAGE_REACTIONS'
	]
});*/
const client = new Discord.Client({
	intents: new Discord.Intents(32767) ///ALL INTENTS
})

const fs = require('fs');
const functions = eval(fs.readFileSync('functions.js') + '');
//const { token } = require('./config.json');
let configFile='config.json';
let config = JSON.parse(fs.readFileSync('config.json'));
require('dotenv').config();
client.login(process.env.TOKEN);
client.once('ready', () => {
	console.log('\nMangustata e online');
	console.log(`\nLogged in as ${client.user.tag}`);
	console.log('Servers: \n'); client.guilds.cache.forEach(g => { console.log(g.name) });
	console.log('\nConfig:');
	console.log(config);
	client.user.setActivity(config.status);
	/*client.users.fetch(config.botOwner, false).then((user) => {
		user.send({
			embeds: [{
				color: '#99AAB5',
				title: 'Mangusta is online!\nConfig:',
				fields: [
					{ name: 'Prefix', value: `\`\`\`${config.prefix}\`\`\`` },
					{ name: 'Anti-Racism', value: `\`\`\`${config.RacismDetection}\`\`\`` },
					{ name: 'Anti-Rickroll', value: `\`\`\`${config.RickRollDetection}\`\`\`` },
					{ name: 'Status', value: `\`\`\`${config.status}\`\`\`` },
					{ name: 'Message Logging', value: `\`\`\`${config.messageLogging}\`\`\`` },
					{ name: 'Version', value: `\`\`\`${config.version}\`\`\`` },
				]

			}]
		});
	});*/
})
client.slashCommands = new Discord.Collection();
const slashCommandFiles = fs.readdirSync('./slashcommands').filter(file => file.endsWith('.js'));
for (const file of slashCommandFiles) {
	const slashCommand = require(`./slashcommands/${file}`);
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

		if (config.RickRollDetection === 'off') return;
		const RickFilters = ["dQw4w9WgXcQ", "iik25wqIuFo", 'HIcSWuKMwOw',]
		if (message.content.split(" ").filter(w => RickFilters.indexOf(w) != -1).length > 0) {

			message.delete() .then(messages => console.log(`Deleted rickroll message.`)) .catch(console.error);
			message.channel.send(`${message.author} get rekt.`);
			console.log(`${message.author.username} got rekt.`);

		}

		const TMfilters = ["maika", "majka", "maina", 'majka', 'майна', 'майка']
		if (message.content.split(" ").filter(w => TMfilters.indexOf(w) != -1).length > 0) {
			if (Math.floor(Math.random() * 2)) message.channel.send(functions.emojify("twoqta majka"));
			else message.channel.send(functions.emojify("maika ti"));
		}


		if (config.RacismDetection === 'off') return;
		const RacistFilters = ["nigga", "niger", "негър", 'nigger',]
		if (message.content.split(" ").filter(w => RacistFilters.indexOf(w) != -1).length > 0) {
			message.delete()  .then(messages => console.log(`Deleted racist message.`))  .catch(console.error);
			message.channel.send(`${message.author} was racist.`);
			console.log(`${message.author.username} was racist.`)
		}

	
	const args = message.content.slice(config.prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();
	const command = client.commands.get(cmd) ||
		client.commands.find(a => a.aliases.indexOf(cmd)+1);
	if(!command) return;
	try {
		 command.execute(message,cmd,args,functions,client);
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


