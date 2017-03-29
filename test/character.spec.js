import Character from '../src/js/character';
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
});
