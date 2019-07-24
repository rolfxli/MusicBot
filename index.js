require('dotenv').config()

const Discord = require('discord.js')
//const client = new Discord.Client()
const bot = require('./core/bot')
const command = require('./core/command')

var Jisoo = new bot();


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
    if(msg.channel.type === 'dm') {
        return false;
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
        Jisoo.message('You found me!', null);
    }
    else if (msg.content.startsWith('!help')) {
        Jisoo.help();
    }
    else {
        Jisoo.message('Invalid command!', null);
    }

    //request.processMessage(Jisoo, message);
});

Jisoo.login(process.env.BOT_TOKEN);

// index to be developed