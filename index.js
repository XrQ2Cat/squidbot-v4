/////////////////////
//// Squidbot V4 ////
/////////////////////

const {Client, Intents, MessageEmbed} = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const {token} = process.env.DISCORD_TOKEN;

const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Squidbot V4');
});
server.listen(3000);

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.once('ready', () => {
	console.log('Bot is ready!');
});

client.on('messageCreate', (message) => {
    let prefixes = ['sq!', '!', 's!'];
    let arguments = (message.content).toLowerCase().split(' ');
    let commandwithprefix = arguments.splice(0, 1)[0];
    let embed;

    if(!message.member) {
        return;
    }

    // Not a bot
    if(message.member.bot) {
        return;
    }
 
    // Not me
    if(message.member.id === '990652063610458153') {
        return;
    }



    for(let i = 0; i < prefixes.length; i++) {
        if(commandwithprefix.startsWith(prefixes[i])) {
            let command = commandwithprefix.slice(prefixes[i].length, commandwithprefix.length);
            switch(command){
                case 'help': 
                    embed = new MessageEmbed()
                    .setColor('#399eb5')
                    .setTitle('Help')
                    .setAuthor({
                        name: message.member.user.tag,
                        iconURL: message.member.user.displayAvatarURL()
                        
                    })
                    .addFields(
                        {
                            name: 'Ping',
                            value: '`sq!ping`, returns the bot delay'
                        }
                    )
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTimestamp()
                    .setFooter({
                        text: 'This bot is still very much in development, feel free to suggest things/post bugs in the server feedback channel!'
                    })
                    message.reply({
                        embeds: [embed]
                    })
                break;

                case 'ping': 
                    message.reply(`Pong! ${client.ws.ping}ms.`);
                    break;

                case 'eval': 
                    if(message.member.id === '874729043122077707') {
                        try {
                            eval(arguments.join(' '));
                            message.channel.send('Evaluation successful. Output: ' + String(eval(arguments.join(' '))));
                        } catch(err) {
                            message.channel.send(err)
                        }
                        
                    } else {
                        message.channel.send('Only LaserCat can run this command.');
                    }
                    break;
                case 'avatar':
                    embed = new MessageEmbed()
                    .setColor('#399eb5')
                    .setTitle('Your Avatar')
                    .setAuthor({
                        name: message.member.user.tag,
                        iconURL: message.member.user.displayAvatarURL()
                        
                    })
                    .setImage(message.member.user.displayAvatarURL() + '?size=4096')
                    message.reply({
                        embeds: [embed]
                    })
                    break;
            }
        }
    }

});

client.login(token);