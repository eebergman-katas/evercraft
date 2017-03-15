'use strict';

const alignmentErr = new ReferenceError('Sorry, that is not a valid alignment');
const aDie = require('d20');

class Character {

    constructor(name, alignment) {
        this.name = name;
        this.alignment = alignment;
        this.armorClass = 10;
        this.hitPoints = 5;
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

    rollForAttack () {
        let ourRoll = Number(aDie.roll(20));
        return ourRoll;
    };

    doesHitLand (defenderArmorScore, hitScore) {
        let didItHit = false;

        if (hitScore >= defenderArmorScore) {
            didItHit = true;
        } else {
            didItHit = false;
        }

        return didItHit;
    }

}; // class 




module.exports = Character;
