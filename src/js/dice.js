const aDie = require('d20');

export class Dice {
    rollADie(numberOfSides) {
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
        if (isNaN(attackRoll.originalRoll)) {
            this.originalRoll = this.rollADie(numberOfSides);
            return attackRoll;
        }
        return attackRoll;
    }
}

export { AttackRoll };
