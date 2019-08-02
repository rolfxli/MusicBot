'use strict'

class queue {
    constructor() {
        this.list = [];
    }

    isempty() {
        return (this.list.length == 0);
    }

    queuelength() {
        return this.list.length();
    }

    clear() {
        this.list = [];
    }

    add(song) {
        this.list.push(song);
    }

    dequeue() {
        if (this.list.queuelength() != 0) {
            return this.list.shift();
        }
        else {
            return false;
        }
    }

    addnext(song) {
        if (this.queuelength() != 0) {
            this.list.unshift(song);
        }
        else {
            this.list.push(song);
        }
    }

    skipnext() {
        if (this.queuelength() != 0) {
            this.list.shift();
        }
    }

    shuffle() {
        // algorithm from http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
        var j, x, i
        for (i = this.q.length; i; i--) {
            j = Math.floor(Math.random() * i)
            x = this.q[i - 1]
            this.q[i - 1] = this.q[j]
            this.q[j] = x
        }
    }

    delete(pos) {
        if (pos > 0 && pos < this.q.length + 1) {
            return this.list.splice(pos - 1, 1)[0];
        }
        else {
            return false;
        }
    }

    remove(pos) {
        let removed = this.list.delete(pos);
        if (removed) {
            this.list.shift();
        }
        else {
            return false;
        }
    }
}

module.exports = queue