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
            //this.setPlaying(song.title)
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
            this.isConnecting = true
            if (!id) {
                return this.voice.channel.join()
            } else {
                this.voice.channel = this.client.channels.get(id)
                return this.voice.channel.join()
            }
        }
    }

    leave() {
        this.musicPlayer.clear();
        if(this.musicPlayer.controller) {
            this.musicPlayer.controller.end();
        }
        if (this.connection) {
            this.voice.channel.leave()
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

    // setplaying()

    play(input) {
        /*
        const args = message.content.split(' ');
        const vchannel = in.member.voiceChannel;
        const permissions = vchannel.permissionsFor(message.client.user);

        if(!vchannel) {
            message.reply('You are not in an active voice channel!')
        }
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.channel.send('I need the permissions to join and speak in your voice channel!');
        }

         */

        const args = input.content.split(' ');
        const info = ytdl.getInfo(args[1]);
        const Song = new song(info);

        //this.message('Added ' + Song.title + 'to queue.', null);
        this.musicPlayer.add(Song);

        this.checkConnection();
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