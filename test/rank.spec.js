import Character from '../src/js/character';
import Combat from '../src/js/combat';
import { AttackRoll } from '../src/js/dice';

const expect = require('chai').expect;

const xpFromOneAttack = 10;
const rollHigherThanDefaultAC = 11;


describe('Rank Spec', () => {
    let defender;
    let attacker;
    let combat;
    let attackRoll;

    beforeEach(() => {
        defender = new Character('Danni', 'Good');
        attacker = new Character('Oscar', 'Evil');
        combat = new Combat();
        attackRoll = new AttackRoll();
    });

    describe('Experience is gained for attacking', () => {
        it('should increase the character xp for a succesful attack', () => {
            let postAttackXP = 0;

            combat.attack(attacker, defender, rollHigherThanDefaultAC);
            postAttackXP = attacker.rank.xp;

            expect(postAttackXP).to.equal(xpFromOneAttack);
        });
    });

    describe('Player has a level', () => {
        it('should return 1 for default level', () => {
            expect(defender.rank.level).to.equal(1);
        });
    });

    describe('Player can level up after 1000 xp', () => {
        it('should level up the player', () => {
            let originalLevel = attacker.rank.level;
            attacker.rank.xp = 1000;
            attacker.rank.checkForLevelUp(attacker);
            let newLevel = attacker.rank.level;

            expect(newLevel).to.be.greaterThan(originalLevel);
        });
    });

    describe('Check player\'s level', () => {
        it('should check the level when xp is gained', () => {
            let originalLevel = attacker.rank.level;
            attacker.rank.xp = 1000;

            combat.attack(attacker, defender, rollHigherThanDefaultAC);

            let newLevel = attacker.rank.level;

            expect(newLevel).to.be.greaterThan(originalLevel);
        });
    });

    describe('MaxHp increases on level up', () => {
        it('should add 5 to MaxHp on level up', () => {
            let hpAfterLevelTwo = 10;
            attacker.rank.xp = 999;

            combat.attack(attacker, defender, rollHigherThanDefaultAC);

            expect(attacker.hitPoints.maxHP).to.equal(hpAfterLevelTwo);
        });
    });
});