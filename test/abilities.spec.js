import Character from '../src/js/character';
const expect = require('chai').expect;

describe('Character Abilities', () => {
    let emikelda;

    beforeEach(() => {
        emikelda = new Character('Emikela', 'neutral');  // maybe test Abilities directly?
    });

    describe('A new Character has six default ability scores', () => {
        it('should have a default Strength ability score', () => {
            expect(emikelda.strength).to.equal(10);
        });

        it('should have a default Dexterity ability score', () => {
            expect(emikelda.dexterity).to.equal(10);
        });

        it('should have a default Constitution ability score', () => {
            expect(emikelda.constitution).to.equal(10);
        });

        it('should have a default Wisdom ability score', () => {
            expect(emikelda.wisdom).to.equal(10);
        });

        it('should have a default Intelligence ability score', () => {
            expect(emikelda.intelligence).to.equal(10);
        });

        it('should have a default Charisma ability score', () => {
            expect(emikelda.charisma).to.equal(10);
        });
    });

    describe('Abilities are 1 - 20', () => {
        it('should disallow all abilities to go below 1', () => {
            emikelda.strength = -1;
            emikelda.dexterity = 0;
            emikelda.constitution = -14;
            emikelda.wisdom = -10;
            emikelda.intelligence = -100;
            emikelda.charisma = -20;

            expect(emikelda.strength).to.equal(1);
            expect(emikelda.dexterity).to.equal(1);
            expect(emikelda.constitution).to.equal(1);
            expect(emikelda.wisdom).to.equal(1);
            expect(emikelda.intelligence).to.equal(1);
            expect(emikelda.charisma).to.equal(1);
        });

        it('should disallow all abilities to go above 20', () => {
            emikelda.strength = 21;
            emikelda.dexterity = 22;
            emikelda.constitution = 25;
            emikelda.wisdom = 40;
            emikelda.intelligence = 210;
            emikelda.charisma = 39;

            expect(emikelda.strength).to.equal(20);
            expect(emikelda.dexterity).to.equal(20);
            expect(emikelda.constitution).to.equal(20);
            expect(emikelda.wisdom).to.equal(20);
            expect(emikelda.intelligence).to.equal(20);
            expect(emikelda.charisma).to.equal(20);
        });
    });

    describe('Abilities relate to a modifier score', () => {
        it('should get a modifer score for each ability score', () => {
            emikelda.charisma = 1;

            expect(emikelda.modifier(emikelda.charisma)).to.equal(-5);
        });
    });




});
