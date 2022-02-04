module.exports = {
    name : 'version',
    aliases: ['v'],
    description : "Sends version embed",
    execute (message,cmd,args,functions){
        message.channel.send({
			embeds: [{
				color: '#c3c908',
				title: 'Mangusta Botka by Olue',
				fields: [
					{ name: 'Version: ', value: `\`\`\`${functions.configValue().version}\`\`\`` },
				]
			}]
		})
    }
}