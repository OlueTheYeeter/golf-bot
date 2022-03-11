module.exports = {
    name : 'test',
    aliases: ['test'],
    description : "testwa",
    execute (message,cmd,args,functions){
    functions.test="test";
       message.channel.send('baca');
      
    }
}