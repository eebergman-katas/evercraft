const expect = require('chai').expect;
const sinon = require('sinon');

import { AttackRoll } from '../src/resources/js/utilities';

describe('PRINT a Roll', () => {
    let attackRoll;

    beforeEach(() => {
        attackRoll = new AttackRoll();
    });

    describe('PRINT a Roll', () => {
        it('PRINT a Roll', () => {
            expect(attackRoll.rollADie(20)).to.be.within(1, 20);
        });
    });
});

