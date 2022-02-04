const {MessageAttachment} = require("discord.js");
module.exports = {
    name : 'pernik',
    aliases: ['pernik','golf'],
    description : "Sends an image of a golf",
    execute (message,cmd,args,functions){
        const golf = new MessageAttachment('golf4.jpg');
        message.reply({files:[golf]});
    }
}