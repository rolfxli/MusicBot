require('dotenv').config()

const Discord = require('discord.js')
//const client = new Discord.Client()
const bot = require('./core/bot')
const command = require('./core/command')

var Jisoo = new bot();

// implement from https://www.freecodecamp.org/news/how-to-create-a-music-bot-using-discord-js-4436f5f3f0f8/

// --------- handle messages --------- //

var request = new command();


Jisoo.client.on('ready', () => {
    console.log('Logged in')
    Jisoo.setTextChannel(process.env.BOT_CHANNEL);
    Jisoo.setVoiceChannel(process.env.BOT_VOICE_CHANNEL);
});

Jisoo.client.on('message', msg => {


    if (msg.author.bot) {
        return;
    }
    else if (msg.content.startsWith('!play')) {
        Jisoo.play(msg);
    }
    else if (msg.content.startsWith(('!skip'))) {
        Jisoo.skip();
    }
    else if (msg.content.startsWith(('!stop'))) {
        Jisoo.stop();
    }
    else if (msg.content.startsWith(('!shuffle'))) {
        Jisoo.shuffle();
    }
    else if (msg.content.startsWith('!ping')) {
        msg.channel.send('pong');
    }
    else {
        msg.channel.send('Invalid command!');
    }

/*
    if(message.channel.type === 'dm') {
        return false;
    }

    request.processMessage(Jisoo, message);


 */
});

Jisoo.login(process.env.BOT_TOKEN);

// index to be developed