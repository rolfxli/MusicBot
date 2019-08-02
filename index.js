require('dotenv').config()

const Discord = require('discord.js')
//const client = new Discord.Client()
const bot = require('./core/bot')
const command = require('./core/command')
const { Client } = require('pg')
const readline = require('readline')
const Song = require('./core/song')

var Jisoo = new bot();
var DB = new Client();

// --------- handle Postgres --------- //

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.prompt();

rl.on('line', (line) => {
    const currTime = new Date().trim();
    const currTimeCommand = "INSERT INTO record(play_time) VALUES($1) RETURNING*"

    var readin = line.trim();
    const args = readin.content.split(' ');
    if (args[0] === "!play") {
        const info = ytdl.getInfo(args[1]);
        const Song = new song(info);

        const text = "INSERT INTO played(song_name, youtube_url) VALUES($1, $2) RETURNING*"
        const values = [Song.title, args[1]];

        DB.query(text, values, (err, res) => {
            if (err) {
                console.log("An error occurred when querying the database.")
            }
            else {
                console.log("Sucessfully added " + Song.title + "to the play history.")
            }
        })

        DB
            .query(currTimeCommand, currTime)
            .then(res => {
                console.log(res.rows[0] + "sucessfully queried.")
            }).catch(e => console.log("query failed"))
    }
});

rl.on('close', () => {
    console.log("Closing connection to DB.");
    Jisoo.client.destroy().then(() => {
        process.exit(0);
    })
});



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