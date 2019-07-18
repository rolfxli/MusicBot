const commands = require('./commands')
const commandqueue = require('./commandsqueue')

// take in message from index.js
// check for '!' and act accordingly
// all commands are checked here and stored in command queue to resolve async properties
// then the commands are passed into commands.js which executes one by one to bot.js
// which does some more processing, then passes to music player that actually plays music
// bot.js is middle man that handles output messages etc...

class filtercommands {
    constructor() {
        this.commands = new commandqueue;
    }

    setPrefix(prefix) {
        this.prefix = prefix;
    }

    processMessage(msg) {
        let message = this.getMessageCommand(msg.content);
        if (message) {
            ///
        }
    }

    getMessageCommand (msg) {
        if (msg.command.startsWith(this.prefix)) {
            return false;
        }
        if (msg.author.bot) {
            return false;
        }
        else {
            // actually resolve the command
        }
    }
}