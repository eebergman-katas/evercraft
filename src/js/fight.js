export default class Fight {

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