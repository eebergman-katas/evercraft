'use strict';

const alignmentErr = new ReferenceError('Sorry, that is not a valid alignment');

class Character {

    constructor(name, alignment) {
        this.name = name;
        this.alignment = alignment;

    }

    get alignment() {
        return this._alignment;
    }

    set alignment(value) {
        const validAlignments = ['good', 'bad', 'neutral'];
        let localAlignment = String(value);

        if (!(validAlignments.includes(localAlignment.toLocaleLowerCase()))) {
            throw new ReferenceError('Sorry, that is not a valid alignment');
        }
        
        this._alignment = value;
    };


}; // class 

module.exports = Character;
