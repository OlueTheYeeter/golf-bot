module.exports = {
    name : 'verify',
    aliases: ['verify'],
    description : "Clears messages",
    execute (message,cmd,args,functions,client){
        if (message.member.permissions.has('MANAGE_ROLES')) {
			const target = message.mentions.users.first();
			if (target) {
				let memberTarget = message.guild.members.cache.get(target.id);
				try {
					memberTarget.roles.add(message.guild.roles.cache.find(role => role.name === "Member").id);
					//console.log("Added member role to "+target.user.tag);
				} catch (err) {
					console.log(err);
					message.reply("Error: " + err);
				}
				message.channel.send(`<@${memberTarget.user.id}> has been verified`);
			}
			else {
				message.channel.send('Could not find this nishtastnik!');
			}
		} else message.channel.send(':x: Nice try, you do not have the right permissions.');
    }
}