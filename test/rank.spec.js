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
            let postAttackXP = 0;

            attackRoll.originalRoll = 15;
            attackRoll.modifiedRoll = 15;

            fight.attack(defender, attackRoll, attacker);
            postAttackXP = attacker.rank.xp;

            expect(postAttackXP).to.equal(xpFromOneAttack);
        });
    });

    describe('Player has a level', () => {
        it('should return 1 for default level', () => {
            expect(defender.rank.level).to.equal(1);
        })
    })

    describe('Player can level up after 1000 xp', () => {
        it('should level up the player', () => {
            let originalLevel = attacker.rank.level;
            attacker.rank.xp = 1000;
            attacker.rank.checkXP(attacker);
            let newLevel = attacker.rank.level;

            expect(newLevel).to.be.greaterThan(originalLevel);
        });
    })

    describe('Check player\'s level', () => {
        it('should check the level when xp is gained', () => {
            let originalLevel = attacker.rank.level;
            attacker.rank.xp = 1000;

            attackRoll.originalRoll = 15;
            attackRoll.modifiedRoll = 15;

            fight.attack(defender, attackRoll, attacker);

            let newLevel = attacker.rank.level;

            expect(newLevel).to.be.greaterThan(originalLevel);
        })
    })
});