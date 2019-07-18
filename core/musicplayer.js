'use strict'

// const playlist = require('./playlist');
const ytdl = require('ytdl-core');
const queue = require('./queue');
const EventEmitter = require('events');

class musicplayer {
    constructor() {
        this.queue = new queue;
        this.playing = null;
        this.eventemitter = new EventEmitter();


    }

    play() {
        if(!this.queue.isempty()) {
            let currently_playing = this.queue.dequeue();
            this.playing = currently_playing;

            let music = ytdl(currently_playing.url, {filter: 'audioonly', quality: 'lowest'})
        }
    }

    shuffle() {
        this.queue.shuffle();
    }

    add() {

    }


}

module.exports = musicplayer;