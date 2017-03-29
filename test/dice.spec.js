const expect = require('chai').expect;
const sinon = require('sinon');

import { AttackRoll } from '../src/js/dice';

describe('PRINT a Roll', () => {
    let attackRoll;

    beforeEach(() => {
        attackRoll = new AttackRoll();
    });

    // idea: opportunity to use sinon for reals

    describe('Dice Spec is here', () => {
        it('DICE SPEC WORKS', () => {
            expect(attackRoll.rollADie(20)).to.be.within(1, 20);
        });
    });
});

