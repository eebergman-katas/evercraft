const aDie = require('d20');

export default class Dice { // default?
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

    modifyAttackRoll(attacker, attackRoll, numberOfSides) {
        let strengthModifier = 0;

        attackRoll = this.isADieRollNeeded(numberOfSides, attackRoll);

        strengthModifier = attacker.modifier(attacker.strength);

        attackRoll.modifiedRoll = attackRoll.originalRoll + strengthModifier;

        return attackRoll;
    }

    isADieRollNeeded(numberOfSides, attackRoll) {
        if (isNaN(attackRoll.originalRoll)) {
            this.originalRoll = this.rollADie(numberOfSides);
            return attackRoll;
        }
        return attackRoll;
    }
}

export { AttackRoll };
