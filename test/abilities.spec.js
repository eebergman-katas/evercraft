import Character from '../src/character';
const expect = require('chai').expect;

describe('Characters Abilities', () => {
    let emikelda;

    beforeEach(() => {
        emikelda = new Character('Emikela', 'neutral', true, 10, 5);
    });

    describe('There are six abilities', () => {
        it('should have a Strength ability', () => {
            expect(emikelda.strength).to.equal(10);
        });

        it('should have a Dexterity ability', () => {
            expect(emikelda.dexterity).to.equal(10);
        });

        it('should have a Constitution ability', () => {
            expect(emikelda.constitution).to.equal(10);
        });

        it('should have a Wisdom ability', () => {
            expect(emikelda.wisdom).to.equal(10);
        });

        it('should have a Intelligence ability', () => {
            expect(emikelda.intelligence).to.equal(10);
        });

        it('should have a Charisma ability', () => {
            expect(emikelda.charisma).to.equal(10);
        });
    });

    describe('Abilities are 1 - 20', () => {
        it('should disallow all abilities to go below 1', () => {
            // strength, dexterity, constitution, wisdom, intelligence, charisma
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
            // strength, dexterity, constitution, wisdom, intelligence, charisma
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
});

