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

    rollForAttack(attacker, attackRoll, numberOfSides) {
        let strengthModifier = 0;

        this.isARollNeeded(attackRoll, numberOfSides);

        strengthModifier = attacker.abilities.modifier(attacker.abilities.strength);

        this.modifiedRoll = this.originalRoll + strengthModifier;

        return attackRoll;
    }

    isARollNeeded(attackRoll, numberOfSides) {
        if (attackRoll === undefined) {
            let newAttackRoll = new AttackRoll();
            newAttackRoll.originalRoll = this.rollADie(numberOfSides);
            return newAttackRoll;
        }

        return attackRoll;
    }
}

export { AttackRoll };
