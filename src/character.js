'use strict';

import Abilities from './abilities';

const alignmentErr = new ReferenceError('Sorry, that is not a valid alignment');
const aDie = require('d20');
const defaultArmorClass = 10;
const defaultHitPoints = 5;
const pointOfDeath = 0;


export default class Character extends Abilities {

    constructor(name, alignment, armorClass, hitPoints) {
        super();
        this.name = name;
        this.alignment = alignment;
        this.armorClass = armorClass || defaultArmorClass;
        this.hitPoints = hitPoints || defaultHitPoints;
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

    rollADie(numberOfSides) {
        return aDie.roll(numberOfSides);
    }




    attack(defender, hitScore, numberOfSides) { 
        let didItHit = false;
        let didARollGetPassedIn = isNaN(hitScore);

        if (didARollGetPassedIn) {
            hitScore = this.rollADie(numberOfSides);
        }
        didItHit = this.doesHitLand(defender.armorClass, hitScore);

        if (didItHit) {
            defender = this.deductHitPoints(defender, hitScore);
        }
        return defender;
    }




    doesHitLand(defenderArmorScore, hitScore) {
        return hitScore >= defenderArmorScore;
    }

    deductHitPoints(defender, hitScore) {
        let defaultDamage = 1,
            damageDealt = defaultDamage;

        if (hitScore === 20) {
            defender.hitPoints -= damageDealt * 2;
        } 
        else {
            defender.hitPoints -= damageDealt;
        }
        return defender;
    }

    isAlive(defender) {
        return defender.hitPoints > pointOfDeath;
    }
};
