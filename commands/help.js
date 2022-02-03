module.exports = {
    name : 'help',
    aliases: ['help'],
    description : "Sends help embed",
    execute (message,cmd,args,functions){
        functions.helpEmbed(message);
    }
}