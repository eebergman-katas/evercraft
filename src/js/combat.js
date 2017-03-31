'use strict';
import { AttackRoll } from './dice';

//combat
export default class Combat {

    attack(defender, attackRoll, attacker) {
        let didItHit = false,
            damage = 0,
            roll = new AttackRoll(),
            combatants = {defender, attacker};

        didItHit = this.doesHitLand(defender, attackRoll);

        if (didItHit) {
            damage = this.calcDamage(attacker, attackRoll);
            attacker.gainXPForAttack(attacker);
            this.deductHitPoints(defender, attackRoll, damage);

            return defender, attacker;
        }
        return defender, attacker;
    }

// attack
    combat(attacker, defender, userRoll) {
        
    }

    doesHitLand(defender, attackRoll) {
        return attackRoll.modifiedRoll >= defender.armorClass;
    }

    deductHitPoints(defender, attackRoll, damage) {
        if (attackRoll.originalRoll === 20) {
            defender.hitPoints.currentHP -= damage * 2;
        }
        else {
            defender.hitPoints.currentHP -= damage;
        }
        return defender;
    }

    calcDamage(attacker, attackRoll) {
        let damage = 1;

        switch (attackRoll.originalRoll) {
            case 20:
                damage += (attacker.abilities.modifier(attacker.abilities.strength) * 2);
                break;
            default:
                damage += attacker.abilities.modifier(attacker.abilities.strength);
                break;
        }
        return (damage < 1) ? 1 : damage;
    }

}