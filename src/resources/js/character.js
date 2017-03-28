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
            modifiedAttackRoll = 0;

        attackRoll = this.isADieRollNeeded(attackRoll, numberOfSides);

        strengthModifier = attacker.modifier(attacker.strength);
        modifiedAttackRoll = attackRoll + strengthModifier;

        return modifiedAttackRoll;
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

    deductHitPoints(defender, attackRoll) {
        let defaultDamage = 1,
            damageDealt = defaultDamage;

        if (attackRoll === 20) {
            defender.hitPoints -= damageDealt * 2;
        }
        else {
            defender.hitPoints -= damageDealt;
        }
        return defender;
    }

    calcDamage(attacker) {
        let defaultDamage = 1,
            damage = 0;

        damage = defaultDamage + attacker.modifier(attacker.strength);

        return damage;
    }

    isAlive(defender) {
        return defender.hitPoints > pointOfDeath;
    }
};
