module.exports = {
    name : 'clear',
    aliases: ['delete','purge'],
    description : "Clears messages",
    execute (message,cmd,args,functions){
        if (message.member.permissions.has('MANAGE_MESSAGES')) {
			if (args[0] === 'a' || args[0] === 'all') args[0] = 100;
			functions.clear(args[0], message);
		}
		else message.channel.send(':x: Nice try, you do not have the right permissions.');
    }
}