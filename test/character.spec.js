import Character from '../src/js/character';
import Abilities from '../src/js/abilities';

const expect = require('chai').expect;

const defaultArmorClass = 10;
const defaultHitPoints = 5;

describe('Character Spec', () => {
    let defender;
    let attacker;

    beforeEach(() => {
        defender = new Character('Danni', 'Good');
        attacker = new Character('Oscar', 'Evil');
    });

    describe('Character Name', () => {
        it('should return the name passed to it as the name', () => {
            expect(attacker.name).to.equal('Oscar');
        });
    });

    describe('Character Alignment', () => {
        let goodCharacter = new Character('George', 'Good');

        it('should set alignment from alignment input (Good)', () => {
            expect(goodCharacter.alignment).to.equal('Good');
        });

        it("should disallow alignments other than 'Evil', 'Good', and 'Neutral'", () => {
            expect(() => { let chelsea = new Character('Chelsea', 'Okayish'); }).to.throw(Error);
        });
    });

    describe('Armor Class and Hit Points', () => {
        it('should return the default ArmorClass when asked for the armorClass on a new Character', () => {
            expect(defender.armorClass).to.equal(defaultArmorClass);
        });

        it('should return the default HitPoints when asked for the hitPoints on a new Character', () => {
            expect(defender.hitPoints.maxHP).to.equal(defaultHitPoints);
        });
    });


    describe('Dexterity modifies Armor Class', () => {
        it('should add the dex modifier to the armor class', () => {
            defender.abilities.dexterity = 20;

            expect(defender.armorClass).to.equal(15);
        });

        it('should disallow the armorClass to go below 10', () => {
            defender.abilities.dexterity = 1;

            expect(defender.armorClass).to.equal(10);
        });
    });

    describe('Constitution modifies hit points', () => {
        it('should add the const modifier to the default hitpoints', () => {
            defender.abilities.constitution = 20;
            defender.hitPoints.adjustedMaxHP(defender);

            expect(defender.hitPoints.maxHP).to.equal(10);
        });

        it('should disallow the HitPoints maxHP to go below 1', () => {
            defender.abilities.constitution = 1;
            defender.hitPoints.adjustedMaxHP(defender);

            expect(defender.hitPoints.maxHP).to.equal(1);
        });
    });
});
