'use strict';

import Abilities from './abilities';

const alignmentErr = new ReferenceError('Sorry, that is not a valid alignment');
const aDie = require('d20');

export default class Character extends Abilities {

    constructor(name, alignment, alive, armorClass, hitPoints) {
        super();
        this.name = name;
        this.alignment = alignment;
        this.alive = alive || true;
        this.armorClass = armorClass || 10;
        this.hitPoints = hitPoints || 5;
    }

    get alignment() {
        return this._alignment;
    }

    set alignment(value) {
        value = this.validateAlignments(value);

        this._alignment = value;
    }

    get hitPoints() {
        return this._hitPoints;
    }

    set hitPoints(value) {
        this._hitPoints = value;
    }

    validateAlignments(value) {
        const validAlignments = ['good', 'evil', 'neutral'];
        let localAlignment = String(value);

        if (!(validAlignments.includes(localAlignment.toLocaleLowerCase()))) {
            throw new ReferenceError('Sorry, that is not a valid alignment');
        }
        return value;
    }

    attack(defender, hitScore) {
        let didItHit = false;

        if (isNaN(hitScore)) {
            hitScore = this.rollADie();
        }

        didItHit = this.doesHitLand(defender.armorClass, hitScore);

        if (didItHit) {
            defender = this.deductHitPoints(defender, hitScore);
        }

        return defender;
    }

    rollADie() {
        let ourRoll = 0;
        ourRoll = aDie.roll(20);
        return ourRoll;
    }

    doesHitLand(defenderArmorScore, hitScore) {
        let didItHit = false;

        if (hitScore >= defenderArmorScore) {
            didItHit = true;
        } else {
            didItHit = false;
        }
        return didItHit;
    }

    deductHitPoints(defender, hitScore) {

        if (hitScore === 20) {
            defender.hitPoints -= 2;
        } else {
            defender.hitPoints -= 1;
        }

        return defender;
    }

    aliveOrDead(defender) {
        if (defender.hitPoints <= 0) {
            defender.alive = false;
        }
        return defender;
    }
};
