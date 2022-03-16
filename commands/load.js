const {MessageAttachment} = require("discord.js");
module.exports = {
    name : 'load',
    aliases: ['load','log'],
    permissions: ["ADMINISTRATOR"],
    description : "Load file.",
    execute (message,cmd,args,functions){
        //if(functions.permissionCheck(message,"ADMINISTRATOR")){
            const log = new MessageAttachment('./data/txt/messages.txt');
            message.reply({files:[log]});
        //}
        
    }
}