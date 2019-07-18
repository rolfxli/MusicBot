const commandqueue = require('./commandqueue')
const bot = require('./bot')
const song = require('./song')

// take in message from index.js
// check for '!' and act accordingly
// all commands are checked here and stored in command queue to resolve async properties
// then the commands are passed into commands.js which executes one by one to bot.js
// which does some more processing, then passes to music player that actually plays music
// bot.js is middle man that handles output messages etc...

class command {
    constructor() {
        //this.commands = new commandqueue;
        this.bot = null;
    }

    processMessage(jisoo, msg) {
        let valid = this.getMessageCommand(msg);
        if (valid) {
            if (msg.content.startsWith('!play')) {
                jisoo.play(message);
            }
            else if (msg.content.startsWith(('!skip'))) {
                jisoo.skip();
            }
            else if (msg.content.startsWith(('!stop'))) {
                jisoo.stop();
            }
            else if (msg.content.startsWith(('!shuffle'))) {
                jisoo.shuffle();
            }
            else if (msg.content.startsWith('!ping')) {
                msg.channel.send('pong');
            }
            else {
                //
            }
        }
    }

    getMessageCommand (msg) {
        if (!msg.content.startsWith('!')) {
            return false;
        }
        else if (!msg.author.bot) {
            return false;
        }
        else {
            return true;
        }
    }
}

module.exports = command;