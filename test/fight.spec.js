import Fight from '../src/js/fight';
import Character from '../src/js/character';
import { AttackRoll } from '../src/js/dice';

const expect = require('chai').expect;

const rollEnoughToHit = 11,
    rollNotEnoughToHit = 9,
    rollCriticalHit = 20;

describe('Characters Attack', () => {
    let defender,
        attacker,
        attackRoll,
        fight;

    beforeEach(() => {
        defender = new Character('Danni', 'Good');
        attacker = new Character('Oscar', 'Evil');
        attackRoll = new AttackRoll(),
        fight = new Fight();
    });

    describe('can Attack', () => {
        it('should land a hit if the roll is greater than the enemy\'s armorClass', () => {
            attackRoll.originalRoll = rollEnoughToHit;
            attackRoll.modifiedRoll = rollEnoughToHit;

            expect(fight.doesHitLand(defender, attackRoll)).to.be.true;
        });
    });

    describe('can be damaged', () => {

        it('should reduce defender hitPoints if attacker lands hit', () => {
            let initalHitPoints = defender.hitPoints;

            attackRoll.originalRoll = rollEnoughToHit;
            attackRoll.modifiedRoll = rollEnoughToHit;

            fight.attack(defender, attackRoll, attacker);

            let postAttackHitPoints = defender.hitPoints;

            expect(initalHitPoints).to.be.greaterThan(postAttackHitPoints);
        });

        it('should not reduce defender hitPoints if attacker does not land hit', () => {
            let initalHitPoints = attacker.hitPoints;

            fight.attack(attacker, rollNotEnoughToHit);
            let postAttackHitPoints = attacker.hitPoints;

            expect(initalHitPoints).to.equal(postAttackHitPoints);
        });

        it('should reduce defender hitPoints by double if player rolls a critical hit', () => {
            let postAttackExpectedHealth = 3;

            attackRoll.originalRoll = rollCriticalHit;
            attackRoll.modifiedRoll = rollCriticalHit;

            fight.attack(defender, attackRoll, attacker);
            let postAttackHitPoints = defender.hitPoints;

            expect(postAttackHitPoints).to.equal(postAttackExpectedHealth);
        });

        it('should return false if asked if alive when HP < 1', () => {
            const pointOfDeath = 0;

            defender.hitPoints = pointOfDeath;

            expect(defender.isAlive()).to.be.false;
        });
    });
});

describe('Strength Modification', () => {
    let attacker,
        defender,
        attackRoll,
        fight;

    beforeEach(() => {
        attacker = new Character("Ella", "Neutral");
        defender = new Character("Jayne", "Good");
        attackRoll = new AttackRoll(),
        fight = new Fight();
    });

    describe('Using ability modifiers', () => {
        it('should add the strength modifier to the attack roll', () => {
            attackRoll.originalRoll = rollEnoughToHit;
            attackRoll.modifyAttackRoll(attacker, attackRoll);

            attacker.strength = 15;

            let expectedModifiedRoll = attackRoll.modifyAttackRoll(attacker, attackRoll).modifiedRoll;

            expect(expectedModifiedRoll).to.equal(13);
        });

        it('should add the strength modifier to the damage dealt', () => {
            attackRoll.originalRoll = rollEnoughToHit;

            attacker.strength = 15;

            expect(fight.calcDamage(attacker, attackRoll)).to.equal(3);
        });

        it('should add the strength modifier to the damage dealt', () => {
            attackRoll.originalRoll = rollCriticalHit;

            attacker.strength = 15;

            expect(fight.calcDamage(attacker, attackRoll)).to.equal(5);
        });

        it('should hit for at least 1 point of damage if the attacker is able to hit', () => {
            attackRoll.originalRoll = rollEnoughToHit;

            attacker.strength = 1;

            expect(fight.calcDamage(attacker, attackRoll)).to.equal(1);
        });
    });
});
