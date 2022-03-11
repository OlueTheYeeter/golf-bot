module.exports = {
    name : 'rng',
    aliases: ['rng'],
    description : "RNG",
    execute (message,cmd,args,functions){
        if(!args[1]) args[1] =args[0]; args[0]=0;
        if(args[0]== undefined) {message.reply("Enter a number please");return;}
        message.reply(
             functions.rng( parseInt(args[0]), parseInt(args[1]) ) .toString()
        )

    }
}