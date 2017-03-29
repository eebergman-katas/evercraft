import Character from '../src/js/character';
const expect = require('chai').expect;

describe('Character Abilities', () => {
    let emikelda;

    beforeEach(() => {
        emikelda = new Character('Emikela', 'neutral');  
    });

    describe('A new Character has six default ability scores', () => {
        it('should have a default Strength ability score', () => {
            expect(emikelda.abilities.strength).to.equal(10);
        });

        it('should have a default Dexterity ability score', () => {
            expect(emikelda.abilities.dexterity).to.equal(10);
        });

        it('should have a default Constitution ability score', () => {
            expect(emikelda.abilities.constitution).to.equal(10);
        });

        it('should have a default Wisdom ability score', () => {
            expect(emikelda.abilities.wisdom).to.equal(10);
        });

        it('should have a default Intelligence ability score', () => {
            expect(emikelda.abilities.intelligence).to.equal(10);
        });

        it('should have a default Charisma ability score', () => {
            expect(emikelda.abilities.charisma).to.equal(10);
        });
    });

    describe('Abilities are 1 - 20', () => {
        it('should disallow all abilities to go below 1', () => {
            emikelda.abilities.strength = -1;
            emikelda.abilities.dexterity = 0;
            emikelda.abilities.constitution = -14;
            emikelda.abilities.wisdom = -10;
            emikelda.abilities.intelligence = -100;
            emikelda.abilities.charisma = -20;

            expect(emikelda.abilities.strength).to.equal(1);
            expect(emikelda.abilities.dexterity).to.equal(1);
            expect(emikelda.abilities.constitution).to.equal(1);
            expect(emikelda.abilities.wisdom).to.equal(1);
            expect(emikelda.abilities.intelligence).to.equal(1);
            expect(emikelda.abilities.charisma).to.equal(1);
        });

        it('should disallow all abilities to go above 20', () => {
            emikelda.abilities.strength = 21;
            emikelda.abilities.dexterity = 22;
            emikelda.abilities.constitution = 25;
            emikelda.abilities.wisdom = 40;
            emikelda.abilities.intelligence = 210;
            emikelda.abilities.charisma = 39;

            expect(emikelda.abilities.strength).to.equal(20);
            expect(emikelda.abilities.dexterity).to.equal(20);
            expect(emikelda.abilities.constitution).to.equal(20);
            expect(emikelda.abilities.wisdom).to.equal(20);
            expect(emikelda.abilities.intelligence).to.equal(20);
            expect(emikelda.abilities.charisma).to.equal(20);
        });
    });

    describe('Abilities relate to a modifier score', () => {
        it('should get a modifer score for each ability score', () => {
            emikelda.abilities.charisma = 1;

            expect(emikelda.abilities.modifier(emikelda.abilities.charisma)).to.equal(-5);
        });
    });




});
