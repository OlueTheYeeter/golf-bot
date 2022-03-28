module.exports = {
    name : 'rps',
    aliases: ['rps'],
    description : "Rock, Paper, Scissors",
    execute (message){
        let golf4tdi = rps();
        console.log("RPS pick: "+ golf4tdi)
        message.channel.send("RPS: Rock 🤜, Paper ✋, Scissors ✌️").then(async (msg) => {
            msg.react('🤜')
            msg.react('✋')
            msg.react('✌️')
            let res;
            const filter = (reaction, user) => {
                return ['🤜', '✋','✌️'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            const collector = msg.createReactionCollector(filter, { time: 30000 });
            collector.on('collect', async (reaction, user) => {
                if (user.bot) return;
                if (reaction.emoji.name === rpsWin(golf4tdi)) {
                     res = "You won!"
                }
                else{
                    if (reaction.emoji.name === golf4tdi)
                    {
                        res = "You tied!"
                    }
                    else  res = "You lost!"

                }
                const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

                try {
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(user.id);
                    }
                } catch (error) {
                    console.error('Failed to remove reactions.');
                }
                msg.edit("RPS: "+res);
                msg.reactions.removeAll();
            });
            
        })

        
    }
}
function rps (){
    let mangal = Math.floor(Math.random()*3);
    console.log(mangal);
    switch(mangal){
        case 0 : return '🤜'
        case 1 : return '✋'
        case 2 : return '✌️'
    }
}
function rpsWin(emoji){
    //returns winning emoji
    switch(emoji){
        case '🤜' : return '✋'
        case '✋': return '✌️'
        case '✌️' : return '🤜'
    }
}