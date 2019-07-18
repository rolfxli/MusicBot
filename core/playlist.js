'use strict'

class playlist {
    constructor(id) {
        this.id = id;
        this.contents = [];
    }

    push(song) {
        this.contents.push(song);
    }

    inlist() {
        return this.contents;
    }
}


module.exports = playlist;