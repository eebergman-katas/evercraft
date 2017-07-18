import Character from '../src/js/character';

const expect = require('chai').expect;

describe('Abilities Spec', () => {
    let player;

    beforeEach(() => {
        player = new Character('Alice', 'neutral');
    });

    describe('A new Character has six default ability scores', () => {
        it('should have a default Strength ability score', () => {
            expect(player.abilities.strength).to.equal(10);
        });

        it('should have a default Dexterity ability score', () => {
            expect(player.abilities.dexterity).to.equal(10);
        });

        it('should have a default Constitution ability score', () => {
            expect(player.abilities.constitution).to.equal(10);
        });

        it('should have a default Wisdom ability score', () => {
            expect(player.abilities.wisdom).to.equal(10);
        });

        it('should have a default Intelligence ability score', () => {
            expect(player.abilities.intelligence).to.equal(10);
        });

        it('should have a default Charisma ability score', () => {
            expect(player.abilities.charisma).to.equal(10);
        });
    });

    describe('Abilities are 1 - 20', () => {
        it('should disallow all abilities to go below 1', () => {
            player.abilities.strength = -1;
            player.abilities.dexterity = 0;
            player.abilities.constitution = -14;
            player.abilities.wisdom = -10;
            player.abilities.intelligence = -100;
            player.abilities.charisma = -20;

            expect(player.abilities.strength).to.equal(1);
            expect(player.abilities.dexterity).to.equal(1);
            expect(player.abilities.constitution).to.equal(1);
            expect(player.abilities.wisdom).to.equal(1);
            expect(player.abilities.intelligence).to.equal(1);
            expect(player.abilities.charisma).to.equal(1);
        });

        it('should disallow all abilities to go above 20', () => {
            player.abilities.strength = 21;
            player.abilities.dexterity = 22;
            player.abilities.constitution = 25;
            player.abilities.wisdom = 40;
            player.abilities.intelligence = 210;
            player.abilities.charisma = 39;

            expect(player.abilities.strength).to.equal(20);
            expect(player.abilities.dexterity).to.equal(20);
            expect(player.abilities.constitution).to.equal(20);
            expect(player.abilities.wisdom).to.equal(20);
            expect(player.abilities.intelligence).to.equal(20);
            expect(player.abilities.charisma).to.equal(20);
        });
    });

    describe('Abilities relate to a modifier score', () => {
        it('should get a modifer score for each ability score', () => {
            player.abilities.charisma = 1;

            expect(player.abilities.modifier(player.abilities.charisma)).to.equal(-5);
        });
    });
});
