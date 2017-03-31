const expect = require('chai').expect;
const sinon = require('sinon');

import { AttackRoll } from '../src/js/dice';

describe('Dice Spec', () => {
    let attackRoll;

    beforeEach(() => {
        attackRoll = new AttackRoll();
    });

    // idea: opportunity to use sinon for reals

    describe('Roll dice', () => {
        it('should return a number between 1 and 20 for a d20', () => {
            expect(attackRoll.rollADie(20)).to.be.within(1, 20);
        });
    });


    describe('Is a roll needed', () => {
        it('should check if roll was input by user', () => {
            let randomRoll = (attackRoll.isARollNeeded()).originalRoll;
            
            expect(randomRoll).to.be.within(1, 20);
        });
    });
});

