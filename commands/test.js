module.exports = {
    name : 'test',
    aliases: ['test'],
    description : "testwa",
    execute (message,cmd,args,functions){
       message.channel.send('baca');
    }
}