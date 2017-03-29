class Fight {

    // consider: calling modifyAttackRoll from in here, instead of making callers do it?
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

    

}