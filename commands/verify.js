module.exports = {
    name : 'verify',
    aliases: ['verify'],
    description : "Clears messages",
    execute (message,cmd,args,functions){
        if (message.member.permissions.has('MANAGE_ROLES')) {
			const target = message.mentions.users.first();
			if (target) {
				let memberTarget = message.guild.members.cache.get(target.id);
				memberTarget.roles.add(message.guild.roles.cache.find(role => role.name === "Member").id);
				message.channel.send(`<@${memberTarget.user.id}> has been verified`);
			}
			else {
				message.channel.send('Could not find this nishtastnik!');
			}
		} else message.channel.send(':x: Nice try, you do not have the right permissions.');
    }
}