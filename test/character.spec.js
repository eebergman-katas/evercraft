import Character from '../src/js/character';
import { AttackRoll } from '../src/js/dice';

const expect = require('chai').expect;

const defaultArmorClass = 10,
    defaultHitPoints = 5,
    useA20SidedDie = 20,
    rollEnoughToHit = 11,
    rollNotEnoughToHit = 9,
    rollCriticalHit = 20,
    rollCriticalFailure = 1;

describe('Character Creation', () => {
    let defender,
        attacker,
        attackRoll;

    beforeEach(() => {
        defender = new Character('Danni', 'Good');
        attacker = new Character('Oscar', 'Evil');
        attackRoll = new AttackRoll();
    });

    describe('Character Name', () => {
        it('should return the name passed to it as the name', () => {
            expect(attacker.name).to.equal('Oscar');
        });
    });

    describe('Character Alignment', () => {
        let george = new Character('George', 'Good');

        it('should set alignment from alignment input (Good)', () => {
            expect(george.alignment).to.equal('Good');
        });

        it("should disallow alignments other than 'Evil', 'Good', and 'Neutral'", () => {
            expect(() => { let chelsea = new Character('Chelsea', 'Okayish'); }).to.throw(ReferenceError);
        });
    });


    describe('Armor Class and Hit Points', () => {
        it('should return the default ArmorClass when asked for the armorClass on a new Character', () => {
            expect(defender.armorClass).to.equal(defaultArmorClass);
        });

        it('should return the default HitPoints when asked for the hitPoints on a new Character', () => {
            expect(defender.hitPoints).to.equal(defaultHitPoints);
        });
    });

    describe('can Attack', () => {
        it('should land a hit if the roll is greater than the enemy\'s armorClass', () => {
            attackRoll.originalRoll = rollEnoughToHit;

            attackRoll = attacker.modifyAttackRoll(attacker, attackRoll);

            expect(attacker.doesHitLand(defender, attackRoll)).to.be.true;
        });
    });

    describe('can be damaged', () => {

        it('should reduce defender hitPoints if attacker lands hit', () => {
            let initalHitPoints = defender.hitPoints;

            attackRoll.originalRoll = rollEnoughToHit;
            attackRoll = attacker.modifyAttackRoll(attacker, attackRoll);

            defender = attacker.attack(defender, attackRoll, attacker);

            let postAttackHitPoints = defender.hitPoints;

            expect(initalHitPoints).to.be.greaterThan(postAttackHitPoints);
        });

        it('should not reduce defender hitPoints if attacker does not land hit', () => {
            let initalHitPoints = attacker.hitPoints;

            attacker = defender.attack(attacker, rollNotEnoughToHit);
            let postAttackHitPoints = attacker.hitPoints;

            expect(initalHitPoints).to.equal(postAttackHitPoints);
        });

        it('should reduce defender hitPoints by double if player rolls a critical hit', () => {
            let postAttackExpectedHealth = 3;

            attackRoll.originalRoll = rollCriticalHit;
            attackRoll = attacker.modifyAttackRoll(attacker, attackRoll);

            defender = attacker.attack(defender, attackRoll, attacker);
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


describe('Character Modification', () => {
    let attacker,
        defender,
        attackRoll;

    beforeEach(() => {
        attacker = new Character("Ella", "Neutral");
        defender = new Character("Jayne", "Good");
        attackRoll = new AttackRoll();
    });

    describe('Using ability modifiers', () => {
        it('should add the strength modifier to the attack roll', () => {
            attackRoll.originalRoll = rollEnoughToHit;
            attackRoll = attacker.modifyAttackRoll(attacker, attackRoll);

            attacker.strength = 15;

            let expectedModifiedRoll = attacker.modifyAttackRoll(attacker, attackRoll).modifiedRoll;

            expect(expectedModifiedRoll).to.equal(13);
        });

        it('should add the strength modifier to the damage dealt', () => {
            attackRoll.originalRoll = rollEnoughToHit;

            attacker.strength = 15;

            expect(attacker.calcDamage(attacker, attackRoll)).to.equal(3);
        });

        it('should add the strength modifier to the damage dealt', () => {
            attackRoll.originalRoll = rollCriticalHit;

            attacker.strength = 15;

            expect(attacker.calcDamage(attacker, attackRoll)).to.equal(5);
        });

        it('should hit for at least 1 point of damage if the attacker is able to hit', () => {
            attackRoll.originalRoll = rollEnoughToHit;

            attacker.strength = 1;

            expect(attacker.calcDamage(attacker, attackRoll)).to.equal(1);
        });
    });
});

