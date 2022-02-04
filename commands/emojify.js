module.exports = {
    name : 'emojify',
    aliases: ['emoji'],
    description : "Emojify",
    execute (message,cmd,args,functions){
        message.channel.send(functions.emojify(args.join(" ")));
    }
}