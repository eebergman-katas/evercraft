import Combat from '../src/js/combat';
import Character from '../src/js/character';
import { AttackRoll } from '../src/js/dice';

const expect = require('chai').expect;

const rollHigherThanDefaultAC = 11,
    rollLowerThanDefaultAC = 9,
    rollCriticalHit = 20;

describe('Combat Spec', () => {
    let defender,
        attacker,
        attackRoll,
        combat;

    beforeEach(() => {
        defender = new Character('Danni', 'Good');
        attacker = new Character('Oscar', 'Evil');
        attackRoll = new AttackRoll();
        combat = new Combat();
    });

    describe('can Attack', () => {
        it('should land a hit if the roll is greater than the enemy\'s armorClass', () => {
            attackRoll.originalRoll = rollHigherThanDefaultAC;
            attackRoll.modifiedRoll = rollHigherThanDefaultAC;
            
            // if this asked for defender hp to go down would it work?
            expect(combat.doesHitLand(defender, attackRoll)).to.be.true;



            // console.log("NMNMNMNMNMNMNNMNMNMNMMNMNMNMNMNMNMNMNMNMNMNMNMNMNMNM")

            // combat.attack(defender, rollHigherThanDefaultAC, attacker);

            // expect(defender.hitPoints.currentHP).to.equal(4); // broke


        });
    });

    describe('can be damaged', () => {

        it('should reduce defender hitPoints if attacker lands hit', () => {
            let initalHitPoints = defender.hitPoints.currentHP;

            attackRoll.originalRoll = rollHigherThanDefaultAC;
            attackRoll.modifiedRoll = rollHigherThanDefaultAC;

            combat.attackOld(defender, attackRoll, attacker);

            let postAttackHitPoints = defender.hitPoints.currentHP;

            expect(postAttackHitPoints).to.be.lessThan(initalHitPoints);
        });

        it('should not reduce defender hitPoints if attacker does not land hit', () => {
            let initalHitPoints = attacker.hitPoints;

            combat.attackOld(attacker, rollHigherThanDefaultAC);

            let postAttackHitPoints = attacker.hitPoints;

            expect(initalHitPoints).to.equal(postAttackHitPoints);
        });

        it('should reduce defender hitPoints by double if player rolls a critical hit', () => {
            let postAttackExpectedHealth = 3;

            attackRoll.originalRoll = rollCriticalHit;
            attackRoll.modifiedRoll = rollCriticalHit;

            combat.attackOld(defender, attackRoll, attacker);
            let postAttackHitPoints = defender.hitPoints.currentHP;

            expect(postAttackHitPoints).to.equal(postAttackExpectedHealth);
        });

        it('should return false if asked if alive when HP < 1', () => {
            const pointOfDeath = 0;

            defender.hitPoints.currentHP = pointOfDeath;

            expect(defender.hitPoints.isAlive(defender)).to.be.false;
        });
    });

    describe('Strength modifies attack and damage', () => {
        it('should add the strength modifier to the attack roll', () => {
            attacker.abilities.strength = 15;
            
            attackRoll = attackRoll.rollForAttack(attacker, rollHigherThanDefaultAC);

            let expectedModifiedRoll = attackRoll.modifiedRoll;

            expect(expectedModifiedRoll).to.equal(13);
        }); 

        it('should add the strength modifier to the damage dealt', () => {
            const modifiedDamage = 3;
            attackRoll.originalRoll = rollHigherThanDefaultAC;

            attacker.abilities.strength = 15;

            expect(combat.calcDamage(attacker, attackRoll)).to.equal(modifiedDamage); 
        });

        it('should add the strength modifier to the damage dealt with a critical hit', () => {
            const critModifiedDamage = 5; 
            attackRoll.originalRoll = rollCriticalHit;

            attacker.abilities.strength = 15;

            expect(combat.calcDamage(attacker, attackRoll)).to.equal(critModifiedDamage);
        });

        it('should hit for at least 1 point of damage if the attacker is able to hit', () => {
            const minimumDamage = 1; 
            attackRoll.originalRoll = rollHigherThanDefaultAC;

            attacker.strength = 1;

            expect(combat.calcDamage(attacker, attackRoll)).to.equal(minimumDamage);
        });
    });
});