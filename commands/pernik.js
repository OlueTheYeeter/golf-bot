module.exports = {
    name : 'pernik',
    aliases: ['pernik'],
    description : "Sends an image of a golf",
    execute (message,cmd,args,functions){
        message.channel.send(new Discord.MessageAttachment('golf4.jpg'));
    }
}