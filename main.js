
const Discord = require('discord.js');
const client = new Discord.Client({
	intents: new Discord.Intents(32767) ///ALL INTENTS
})

const fs = require('fs');
const functions = require('./essential/functions.js');
let config = JSON.parse(fs.readFileSync('essential/config.json'));
require('dotenv').config();
client.login(process.env.TOKEN);
client.once('ready', () => {

	console.log('\nGolfa e online');	
	console.log(`\nLogged in as ${client.user.tag}`);	
	console.log('Servers: \n'); client.guilds.cache.forEach(g => { console.log(g.name) });
	console.log('\nConfig:');
	console.log(config);
	//client.user.setActivity(config.status);
	client.user.setActivity(config.status, {
		type: "STREAMING",
		url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
	});

	/*client.users.fetch(config.botOwner, false).then((user) => {
		user.send({
			embeds: [{
				color: '#99AAB5',
				title: 'Golfa is online!\nConfig:',
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
const slashCommandFiles = fs.readdirSync('./commands-slash').filter(file => file.endsWith('.js'));
for (const file of slashCommandFiles) {
	const slashCommand = require(`./commands-slash/${file}`);
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
client.on('guildMemberAdd', guildMember => {
	if (config.verify === 'on') {
		guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.name === config.verifyRole));
		guildMember.guild.channels.cache.get('815985682303680547')
			.send(` <@${guildMember.user.id}> was verified by ***The Golf Advanced Mafia Verification System™***  Provided By **The Olue® Company**.`);
	}
});
client.on('messageCreate', message => {

	if (message.guild) {
		if (config.messageLogging == "on") {
			var month = message.createdAt.getMonth() + 1;
			var hour = message.createdAt.getUTCHours() + config.timezone;
			var date = message.createdAt.getUTCDate;
			if (message.createdAt.getUTCHours() < 0 && hour > 0) date = date + 1;
			if (message.guild.name == "Mafia")
				fs.appendFileSync('data/txt/messages.txt', message.createdAt.getDate() + '/' + month + '/' + message.createdAt.getFullYear() + ' - ' + hour + ':' + message.createdAt.getUTCMinutes() + ':' + message.createdAt.getUTCSeconds() + ' - ' + message.channel.name + ' - ' + message.author.tag + '\n' + message.content + '\n==========\n');
		}
		if (message.content.includes("825440225999192084")) {
			console.log(`Bot mentioned.`);
			//prefix reset
			if (message.content.includes('reset')) {
				config.prefix = "golf ";
				console.log('Prefix reset.');
				message.channel.send('Prefix reset to "golf "');
				configUpdate();
				configEmbed(message);

			}
			else {
				message.channel.send(`Hello, comrade, I am The Golf 4ka and I am at your service. My prefix is "**${config.prefix}**"`);
				console.log(`Hello message sent.`);
			}
		}
	}

	if (config.RickRollDetection === 'on'){
	const RickFilters = ["dQw4w9WgXcQ", "iik25wqIuFo", 'HIcSWuKMwOw',]
	if (message.content.split(" ").filter(w => RickFilters.indexOf(w) != -1).length > 0) {

		message.delete().then(messages => console.log(`Deleted rickroll message.`)).catch(console.error);
		message.channel.send(`${message.author} get rekt.`);
		console.log(`${message.author.username} got rekt.`);

	}}

	const TMfilters = ["maika", "majka", "maina", 'majka', 'майна', 'майка']
	if (message.content.split(" ").filter(w => TMfilters.indexOf(w) != -1).length > 0) {
		if (functions.rng(0,2)) message.channel.send(functions.emojify("twoqta majka"));
		else message.channel.send(functions.emojify("maika ti"));
	}


	if (config.RacismDetection === 'on'){
	const RacistFilters = ["nigga", "niger", "негър", 'nigger',]
	if (message.content.split(" ").filter(w => RacistFilters.indexOf(w) != -1).length > 0) {
		message.delete().then(messages => console.log(`Deleted racist message.`)).catch(console.error);
		message.channel.send(`${message.author} was racist.`);
		console.log(`${message.author.username} was racist.`)
	}}
	if (message.content.indexOf(config.prefix) != 0 || message.author.bot) return;
	const args = message.content.slice(config.prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();
	const command = client.commands.get(cmd) ||
		client.commands.find(a => a.aliases.indexOf(cmd) + 1);
	if (!command) return;
	if(command.permissions){
		for(perm of command.permissions){
			if(functions.permissionCheck(message,perm));
			else return;
		}
	}
	try {
		command.execute(message, cmd, args, functions, client);
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

 
 