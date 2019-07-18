'use strict'

// const playlist = require('./playlist');
const ytdl = require('ytdl-core');
const queue = require('./queue');
const EventEmitter = require('events');
const bot = require('./bot')

class musicplayer {
    constructor() {
        this.controller = null;
        this.connection = null;
        this.options = {
            seek: 0,
            volume: 1
        };
        this.queue = new queue;
        this.playing = null;
        this.eventemitter = new EventEmitter();


    }

    on(event, callback) {
        this.eventemitter.on(event, callback);
    }

    emitter(event, ...args) {
        this.eventemitter.emit(event, ...args);
    }

    connect(connectionID) {
        this.connection = connectionID;
    }

    play() {
        if(!this.queue.isempty()) {
            let currently_playing = this.queue.dequeue();
            this.playing = currently_playing;
            this.emitter('play', currently_playing);

            let music = ytdl(currently_playing.url, {filter: 'audioonly', quality: 'lowest'});
            this.controller.connection.playStream(music);

            this.controller.on('end', () => {
                if(!this.queue.isempty()) {
                    this.emitter('end');
                    this.play();
                }
                else {
                    this.controller = null;
                    this.connection = null;
                    this.emitter('complete');
                }
            })
        }
    }

    clear() {
        this.queue.clear();
    }

    stop() {
        if(this.controller) {
            this.controller.end();
        }
    }

    skip() {
        if(this.controller) {
            this.controller.end();
            this.emitter('skip');
        }
    }

    shuffle() {
        this.queue.shuffle();
    }

    add(input) {
        this.queue.add(input);
    }


}

module.exports = musicplayer;