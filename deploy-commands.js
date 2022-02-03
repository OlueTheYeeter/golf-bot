const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
//const token = process.env.TOKEN, id = process.env.CLIENT_ID;
const { token,clientId } = require('./config.json');
let config = JSON.parse(fs.readFileSync('config.json'));
const commands = [];
const commandFiles = fs.readdirSync('./slash-commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./slash-commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

// Global commands
rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered global application commands.'))
	.catch(console.error);