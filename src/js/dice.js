'use strict';
const aDie = require('d20');

export class Dice {
    rollADie(numberOfSides) {
        if (numberOfSides === undefined) { numberOfSides = 20; };
        return aDie.roll(numberOfSides);
    }
}

class AttackRoll extends Dice {

    constructor(originalRoll, modifiedRoll) {
        super();
        this.originalRoll = originalRoll;
        this.modifiedRoll = modifiedRoll;
    }

    rollForAttack(attacker, userRoll, numberOfSides) {
        let attackRoll = new AttackRoll();

        let strengthModifier = 0;

        attackRoll = this.isARollNeeded(userRoll, numberOfSides); // rename roll input by user

        strengthModifier = attacker.abilities.modifier(attacker.abilities.strength);

        attackRoll.modifiedRoll = attackRoll.originalRoll + strengthModifier;

        return attackRoll;
    }

    isARollNeeded(userRoll, numberOfSides) {
        let attackRoll = new AttackRoll();
        if (userRoll === undefined) {
            attackRoll.originalRoll = this.rollADie(numberOfSides);
            return attackRoll;
        }
        attackRoll.originalRoll = userRoll;
        return attackRoll;
    }
}

export { AttackRoll };
