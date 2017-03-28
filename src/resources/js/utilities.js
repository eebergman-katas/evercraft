const aDie = require('d20');

export default class Dice {
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
}





export { AttackRoll };