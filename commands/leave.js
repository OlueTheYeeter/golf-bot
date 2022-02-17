module.exports = {
    name : 'leave',
    aliases: ['leave'],
    description : "Leaves server",
    execute (message,cmd,args,functions){
        if(message.author.id ===functions.configValue().botOwner)functions.leaveServer(args[0],args[1]);
    }
}