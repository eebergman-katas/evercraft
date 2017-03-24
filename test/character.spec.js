const expect = require('chai').expect;
const sinon = require('sinon');

import Character from '../src/character';

describe('Character Creation', () => {
    describe('Character Name', () => {
        let claire = new Character('Claire', 'Good');
        let peter = new Character('Peter', 'Neutral');

        it('should return \'Claire\' for the name', () => {
            expect(claire.name).to.equal('Claire');
        });

        it('should return the name passed to it as the name', () => {
            expect(peter.name).to.equal('Peter');
        });
    });

    describe('Character Alignment', () => {
        let george = new Character('George', 'Good');
        it('should set alignment from alignment input(Good)', () => {
            expect(george.alignment).to.equal('Good');
        });

        it("should disallow alignments other than 'Evil', 'Good', and 'Neutral'", () => {
            expect(() => { let chelsea = new Character('Chelsea', 'Okayish'); }).to.throw(ReferenceError);
        });
    });
});

describe('Character has properties and actions', () => {
    let ourHero,
        ourEnemy;

    beforeEach(() => {
        ourHero = new Character('Loni', 'Good');
        ourEnemy = new Character('Theo', 'Evil');
    });

    describe('Armor Class and Hit points', () => {
        it('should return 10 when asked for the armor class value', () => {
            expect(ourHero.armorClass).to.equal(10);
        });

        it('should have a starting amount of 5 hit points', () => {
            expect(ourHero.hitPoints).to.equal(5);
        });
    });

    describe('Character can Attack', () => {
        it('should allow the character to roll a d20', () => {
            expect(ourHero.rollADie()).to.be.within(0, 20);
        });

        it('should land a hit if the roll is greater than the enemy\'s armorClass', () => {
            let defenderArmorScore = ourEnemy.armorClass;
            let hitScore = (sinon.stub(ourHero, "rollADie").returns(11).defaultBehavior.returnValue);

            expect(ourEnemy.doesHitLand(defenderArmorScore, hitScore)).to.be.true;
        });
    });

    describe('Character can be damaged', () => {
        let ourHero,
            ourEnemy;

        beforeEach(() => {
            ourHero = new Character('Loni', 'Good');
            ourEnemy = new Character('Theo', 'Evil');
        });

        it('should reduce defender hitPoints by one if offensive lands hit', () => {
            //Arange
            let initalHitPoints = ourEnemy.hitPoints;
            let hitScore = (sinon.stub(ourHero, "rollADie").returns(11).defaultBehavior.returnValue);
            //Act
            ourEnemy = ourHero.attack(ourEnemy, hitScore);
            let postAttackHitPoints = ourEnemy.hitPoints;

            //Expect
            expect(initalHitPoints).to.be.greaterThan(postAttackHitPoints);
        });

        it('should not reduce defender hitPoints if offensive does not land hit', () => {
            //Arrange
            let initalHitPoints = ourEnemy.hitPoints;
            let hitScore = (sinon.stub(ourHero, "rollADie").returns(3).defaultBehavior.returnValue);
            //Act
            ourEnemy = ourHero.attack(ourEnemy, hitScore);
            let postAttackHitPoints = ourEnemy.hitPoints;

            //Expect
            expect(initalHitPoints).to.equal(postAttackHitPoints);
        });

        it('should reduce defender hitPoints by 2 if player rolls a nat 20', () => {
            //Arange
            let initalHitPoints = ourEnemy.hitPoints;
            let hitScore = (sinon.stub(ourHero, "rollADie").returns(20).defaultBehavior.returnValue);
            //Act
            ourEnemy = ourHero.attack(ourEnemy, hitScore);
            let postAttackHitPoints = ourEnemy.hitPoints;

            //Expect
            expect(postAttackHitPoints).to.equal(3);
        });

        it('should return false(is dead) if HP <= to 0', () => {
            // Arrange
            ourHero.hitPoints = 0;
            // Act
            ourHero.aliveOrDead(ourHero);
            //Expect
            expect(ourHero.alive).to.be.false;
        });


    });
});