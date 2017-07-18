import { AttackRoll } from '../src/js/dice';
import Character from '../src/js/character';

const expect = require('chai').expect;

const rollHigherThanDefaultAC = 11;

describe('Dice Spec', () => {
    let attackRoll;
    let attacker;

    beforeEach(() => {
        attackRoll = new AttackRoll();
        attacker = new Character("Liz", "Good");
    });

    describe('Roll dice', () => {
        it('should return a number between 1 and 20 for a d20', () => {
            expect(attackRoll.rollADie(20)).to.be.within(1, 20);
        });
    });

    describe('Is a roll needed?', () => {
        it('should check if roll was input by user', () => {
            let randomRoll = (attackRoll.isARollNeeded()).originalRoll;

            expect(randomRoll).to.be.within(1, 20);
        });
    });

    describe('AttackRoll accounts for level', () => {
        it('should add earned levels to the attackRoll', () => {
            let attackRollPlusTwoLevels = 13;
            attacker.rank.level = 3;

            attackRoll = attackRoll.rollForAttack(attacker, rollHigherThanDefaultAC);

            expect(attackRoll.modifiedRoll).to.equal(attackRollPlusTwoLevels);
        });
    });
});

