'use strict'

class song {
    constructor (id, title) {
        this.id = id;
        this.title = title;
    }

    get url() {
        return 'https://youtube.com/watch?v=' + this.id;
    }

    // add resolve title method
}

module.exports = song;