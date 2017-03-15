const expect = require('chai').expect;
const sinon = require('sinon');
const app = require('../src/app');

let Character = require('../src/character');

describe('App', () => {
    it('should return true if app.js exists', () => {
        expect('app').to.exist;
    });
});

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
        ourEnemy = new Character ('Theo', 'Evil');
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
            expect(ourHero.rollForAttack()).to.be.within(0, 20);
        });

        it('should land a hit if the roll is greater than the enemy\'s armorClass', () => {

            let hitScore = (sinon.stub(ourHero, "rollForAttack").returns(11).defaultBehavior.returnValue);
            
            expect(app.doesHitLand(ourHero, ourEnemy, hitScore)).to.be(true);
        })
    });
});

