const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
const token = process.env.TOKEN, id = process.env.CLIENT_ID;

// Global commands
const commands = [];
const commandFiles = fs.readdirSync('./commands-slash').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands-slash/${file}`);
	commands.push(command.data.toJSON());
}

const slashCommands = [];
const slashCommandFiles = fs.readdirSync('./commands-slash').filter(file => file.endsWith('.js'));
for (const file of slashCommandFiles) {
	const slashCommand = require(`./commands-slash/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	slashCommands.push(slashCommand.data.toJSON());
}
	const rest = new REST({ version: '9' }).setToken(token);

	(async () => {
		try {
			console.log('Started refreshing application (/) commands.');
	
			await rest.put(
				Routes.applicationCommands(id),
				{ body: commands },
			);
	
			console.log('Successfully reloaded application (/) commands.');
		} catch (error) {
			console.error(error);
		}
	})();