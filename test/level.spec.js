// import { Experience } from '../src/js/level';
import Character from '../src/js/character';
import Fight from '../src/js/fight';
import { AttackRoll } from '../src/js/dice';

const expect = require('chai').expect;
const xpFromOneAttack = 10;


describe('Level Spec', () => {
    let defender,
        attacker,
        fight,
        attackRoll;

    beforeEach(() => {
        defender = new Character('Danni', 'Good');
        attacker = new Character('Oscar', 'Evil');
        fight = new Fight();
        attackRoll = new AttackRoll();
    });

    describe('Experience is gained for attacking', () => {
        it('should increase the character xp for a succesful attack', () => {
            let postAttackXP = 0,
                combatants = {};

            attackRoll.originalRoll = 15;
            attackRoll.modifiedRoll = 15;

            fight.attack(defender, attackRoll, attacker);
            postAttackXP = attacker.xp;

            expect(postAttackXP).to.equal(xpFromOneAttack);

        });
    });
});