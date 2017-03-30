import Character from '../src/js/character';
import Abilities from '../src/js/abilities';
import { AttackRoll } from '../src/js/dice';

const expect = require('chai').expect;

const defaultArmorClass = 10,
    defaultHitPoints = 5;

describe('Character Creation', () => {
    let defender,
        attacker;

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
        let george = new Character('George', 'Good');

        it('should set alignment from alignment input (Good)', () => {
            expect(george.alignment).to.equal('Good');
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
});

describe('Dexterity modifies Armor Class', () => {
    let player;

    beforeEach(() => {
        player = new Character('Shaggy', 'Good');
    });

    it('should add the dex modifier to the armor class', () => {
        player.abilities.dexterity = 20;

        expect(player.armorClass).to.equal(15);
    })

    it('should disallow the armorClass to go below 10', () => {
        player.abilities.dexterity = 1;

        expect(player.armorClass).to.equal(10);
    })
});

describe('Constitution modifies hit points', () => {
        let player;

    beforeEach(() => {
        player = new Character('Shaggy', 'Good');
    });

    it('should add the const modifier to the default hitpoints', () => {
        player.abilities.constitution = 20;
        player.hitPoints.adjustedMaxHP(player);

        expect(player.hitPoints.maxHP).to.equal(10);
    })

    it('should disallow the HitPoints maxHP to go below 1', () => {
        player.abilities.constitution = 1;
        player.hitPoints.adjustedMaxHP(player);

        expect(player.hitPoints.maxHP).to.equal(1);
    })

});