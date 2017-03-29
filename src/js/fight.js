export default class Fight {

    // consider: calling rollForAttack from in here, instead of making callers do it?
    attack(defender, attackRoll, attacker) {
        let didItHit = false,
            damage = 0;

        didItHit = this.doesHitLand(defender, attackRoll);

        if (didItHit) {
            damage = this.calcDamage(attacker, attackRoll);

            return this.deductHitPoints(defender, attackRoll, damage);
        }
        return defender;
    }

    doesHitLand(defender, attackRoll) {
        return attackRoll.modifiedRoll >= defender.armorClass;
    }

    deductHitPoints(defender, attackRoll, damage) {
        if (attackRoll.originalRoll === 20) {
            defender.hitPoints -= damage * 2;
        }
        else {
            defender.hitPoints -= damage;
        }
        return defender;
    }

    calcDamage(attacker, attackRoll) {
        
        let damage = 1,
            originalRoll = attackRoll.originalRoll;

        if (originalRoll === 20) {
            damage += (attacker.modifier(attacker.strength) * 2);
        }
        else {
            damage += attacker.modifier(attacker.strength);
        }

        if (damage < 1) {
            damage = 1;
        }
        return damage;
    }

}