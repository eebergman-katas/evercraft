// import { Experience } from '../src/js/level';
import Character from '../src/js/character';
import Fight from '../src/js/fight';
import { AttackRoll } from '../src/js/dice';

const expect = require('chai').expect;


describe('Level Spec', () => {
    let defender,
        attacker,
        fight;

    beforeEach(() => {
        defender = new Character('Danni', 'Good');
        attacker = new Character('Oscar', 'Evil');
        fight = new Fight();
    });

    describe('Experience is gained for attacking', () => {
        it('should increase the character xp for a succesful attack', () => {
            let initalXP = attacker.xp;
            let attackRoll = 15;

            fight.attack()
        })
    })
})