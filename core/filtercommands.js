const commands = require('./commands')
const commandqueue = require('./commandsqueue')

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