require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const bot = require('./bot')

var Jisoo = new bot();


// --------- handle messages --------- //


Jisoo.client.on('ready', () => {
    console.log('Logged in')
});

Jisoo.client.on('message', msg => {
    /*
    if (msg.content == 'ping') {
        msg.reply('Pong')
    }
     */

});

Jisoo.client.login(process.env.BOT_TOKEN)

// index to be developed