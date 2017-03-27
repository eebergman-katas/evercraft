const expect = require('chai').expect;
const sinon = require('sinon');

import Character from '../src/character';
const defaultArmorClass = 10;
const defaultHitPoints = 5;

describe('Character Creation', () => {
    describe('Character Name', () => {
        let peter = new Character('Peter', 'Neutral');

        it('should return the name passed to it as the name', () => {
            expect(peter.name).to.equal('Peter');
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

    const useA20SidedDie = 20;
    let defender,
        offensive;

    beforeEach(() => {
        defender = new Character('Danni', 'Good');
        offensive = new Character('Oscar', 'Evil');
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
        it('should allow the character to roll a d20', () => {
            const minimumDieRoll = 0,
                maximumDieRoll = 20;

            expect(defender.rollADie(useA20SidedDie)).to.be.within(minimumDieRoll, maximumDieRoll);
        });

        it('should land a hit if the roll is greater than the enemy\'s armorClass', () => {
            let defenderArmorScore = offensive.armorClass;
            let hitScore = (sinon.stub(defender, "rollADie").returns(11).defaultBehavior.returnValue);

            expect(offensive.doesHitLand(defenderArmorScore, hitScore)).to.be.true;
        });
    });

    describe('can be damaged', () => {

        it('should reduce defender hitPoints if offensive lands hit', () => {
            let initalHitPoints = defender.hitPoints;
            let hitScore = (sinon.stub(offensive, "rollADie").returns(11).defaultBehavior.returnValue);

            defender = offensive.attack(defender, hitScore, useA20SidedDie);
            let postAttackHitPoints = defender.hitPoints;

            expect(initalHitPoints).to.be.greaterThan(postAttackHitPoints);
        });

        it('should not reduce defender hitPoints if offensive does not land hit', () => {
            let initalHitPoints = offensive.hitPoints;
            let hitScore = (sinon.stub(defender, "rollADie").returns(3).defaultBehavior.returnValue);

            offensive = defender.attack(offensive, hitScore);
            let postAttackHitPoints = offensive.hitPoints;

            expect(initalHitPoints).to.equal(postAttackHitPoints);
        });

        it('should reduce defender hitPoints by double if player rolls a nat 20', () => {
            let postAttackExpectedHealth = 3;
            let initalHitPoints = offensive.hitPoints;
            let hitScore = (sinon.stub(defender, "rollADie").returns(20).defaultBehavior.returnValue);

            offensive = defender.attack(offensive, hitScore);
            let postAttackHitPoints = offensive.hitPoints;

            expect(postAttackHitPoints).to.equal(postAttackExpectedHealth);
        });

        it('should return false(is dead) if HP <= to 0', () => {
            let pointOfDeath = 0;

            defender.hitPoints = pointOfDeath;

            expect(defender.isAlive(defender)).to.be.false;
        });
    });
});

// describe('Character Modification', () => {

//     beforeEach(() => {
//         let ella = new Character("Ella", "Good");
//     })

//     it('should add the strength modifier to the attack roll', () => {

//         ella.

//         expect()
//     });
// });
