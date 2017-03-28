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

    get alignment() { return this._alignment; }
    set alignment(value) {
        value = this.validateAlignments(value);

        this._alignment = value;
    }

    get hitPoints() { return this._hitPoints; }
    set hitPoints(value) { this._hitPoints = value; }

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

    modifyAttackRoll(attacker, attackRoll, numberOfSides) {
        let strengthModifier = 0,
            attackRollObj = { originalRoll: 0, modifiedRoll: 0 };

        attackRollObj.originalRoll = this.isADieRollNeeded(attackRoll, numberOfSides);

        strengthModifier = attacker.modifier(attacker.strength);

        attackRollObj.modifiedRoll = attackRoll + strengthModifier;

        return attackRollObj;
    }

    attack(defender, attackRoll) {
        let didItHit = false;

        didItHit = this.doesHitLand(defender.armorClass, attackRoll);

        if (didItHit) {
            defender = this.deductHitPoints(defender, attackRoll);
        }
        return defender;
    }

    isADieRollNeeded(attackRoll, numberOfSides) {
        let didARollGetPassedIn = isNaN(attackRoll);

        if (didARollGetPassedIn) {
            return attackRoll = this.rollADie(numberOfSides);
        }
        return attackRoll;
    }

    doesHitLand(defenderArmorScore, attackRoll) {
        return attackRoll >= defenderArmorScore;
    }

    // remove attackRoll and add damage from calcDamage
    deductHitPoints(defender, attackRoll) {
        let defaultDamage = 1, // this will go
            damageDealt = defaultDamage; // go

        if (attackRoll === 20) {
            defender.hitPoints -= damageDealt * 2;
        }
        else {
            defender.hitPoints -= damageDealt;
        }
        return defender;
    }

    calcDamage(attacker, attackRoll) {
        let damage = 1,
            originalRoll = attackRoll.originalRoll;

        if (originalRoll === 20) {
            damage += (attacker.modifier(attacker.strength) * 2);
        }
        else {
            damage += attacker.modifier(attacker.strength);
        }
        return damage;
    }

    isAlive(defender) {
        return defender.hitPoints > pointOfDeath;
    }
};
