const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });
const fs = require('fs');
//const { token } = require('./config.json');

let config = JSON.parse(fs.readFileSync('config.json'));
import {changePrefix,changeStatus,configUpdate,configEmbed,configChangeEmbed,RickRollCheck,RacismCheck,clear,findChannel,helpEmbed} from '/functions.js';
client.login(config.token);
client.once('ready', ()=>{
    console.log(`Logged in as ${client.user.tag}`);
    console.log('Servers: \n'); client.guilds.cache.forEach(g => { console.log(g.name) });
})
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction,client,functions);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
