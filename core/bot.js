'use strict'

const Discord = require('discord.js');
const musicplayer = require('./musicplayer');
const playlist = require('./playlist');
const song = require('./song');
const ytdl = require('ytdl-core');

class bot {
    constructor() {
        this.client = new Discord.Client();
        this.voice = {
            channel: null
        };
        this.text = {
            channel: null
        };
        this.connection = null;
        this.config = {
            messageDelay: 20000
        };
        this.isConnecting = false;
        this.musicPlayer = new musicplayer();

        this.musicPlayer.on('play', song => {
            this.message('Now playing: ' + song.title)
        });
        this.musicPlayer.on('end', () => {
            let connections = this.client.voiceConnections.first().channel.members.array();
            if (connections.length <= 1) {
                this.message('Leaving Channel');
                this.stop();
            }
        });
        this.musicPlayer.on('complete', () => {
            this.message('Q empty');
            this.stop();
        })

    }

    join (id) {
        if (!this.voice.connection) {
            this.isConnecting = true;
            if (!id) {
                return this.voice.channel.join();
            } else {
                this.voice.channel = this.client.channels.get(id);
                return this.voice.channel.join();
            }
        }
    }

    leave() {
        this.musicPlayer.clear();
        if(this.musicPlayer.controller) {
            this.musicPlayer.controller.end();
        }
        if (this.connection) {
            this.voice.channel.leave();
            this.connection = null
        }
    }

    message(msg, callback) {
        this.text.channel.send(msg).then(msg => {
            if (typeof callback === 'function') {
                callback(msg)
            }
            let delay = this.config.messageDelay;
            if (delay > 0) {
                msg.delete(delay)
            }
        }).catch(console.error)
    }

    checkConnection() {
        if(!this.connection && !this.isConnecting) {
            this.join().then(conID => {
                this.connection = conID;
                this.isConnecting = false;
                this.musicPlayer.connect(conID);
                this.musicPlayer.play();
            }).catch(e => {
                console.error(e);
                this.leave();
            })
        }
    }

    // this is an alternate version
    async play(input) {
        const args = input.content.split(' ');
        const info = await ytdl.getInfo(args[1]);
        const Song = new song(info);
        this.message('Added ' + Song.title + ' to queue.', null);
        this.musicPlayer.add(Song);
        this.checkConnection();
    }

    /*

    parsePlay(input, callback) {
        const args = input.content.split(' ');
        const info = ytdl.getInfo(args[1]);
        const Song = new song(info);
        if (callback) {
            callback(Song);
        }
    }

    play(input) {
        this.parsePlay(input, (invalue) => {
            this.message('Added ' + invalue.title + ' to queue.', null);
            this.musicPlayer.add(invalue);
            this.checkConnection();
        });
    }

     */

    help() {
        this.message('Looks like you need help, here are some commands:' +
            '!play url: plays the music from the given url' +
            '!stop: stop the music from playing' +
            '!skip: skips the current song' +
            '!playlist create......', null);
    }

    stop() {
        this.musicPlayer.stop();
        this.leave();
    }

    skip() {
        this.musicPlayer.skip();

    }

    shuffle() {
        this.musicPlayer.shuffle();

    }

    setVoiceChannel (chanID) {
        this.voice.channel = this.client.channels.get(chanID)
    }

    setTextChannel (chanID) {
        this.text.channel = this.client.channels.get(chanID)
    }

    login(token) {
        this.client.login(token);
    }
 }

 module.exports = bot;