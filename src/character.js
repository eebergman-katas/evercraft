'use strict';

const alignmentErr = new ReferenceError('Sorry, that is not a valid alignment');
const aDie = require('d20');

class Character {

    constructor(name, alignment) {
        this.name = name;
        this.alignment = alignment;
    }

    get alignment() {
        return this._alignment;
    }

    set alignment(value) {
        const validAlignments = ['good', 'evil', 'neutral'];
        let localAlignment = String(value);

        if (!(validAlignments.includes(localAlignment.toLocaleLowerCase()))) {
            throw new ReferenceError('Sorry, that is not a valid alignment');
        }
        this._alignment = value;
    };

    get armorClass() {
        return 10;
    };
    
    get hitPoints() {
        return 5;
    };

    get rollForAttack() {
        return aDie.roll(20);
    };

}; // class 

module.exports = Character;
