'use strict';

const defaultHitPoints = 5,
    pointOfDeath = 0;

export default class HitPoints {

    constructor(maxHP, currentHP) {
        this.maxHP = maxHP         || defaultHitPoints;
        this.currentHP = currentHP || defaultHitPoints;
    }

    adjustedMaxHP(player) {
        let constScore = player.abilities.constitution;
        let constModifier = player.abilities.modifier(constScore);
        let unmoddedHP = player.rank.level * defaultHitPoints;
        let moddedMaxHp = unmoddedHP + constModifier;

        this.maxHP = moddedMaxHp < 1 ? 1 : moddedMaxHp;
    }

    isAlive(defender) {
        return defender.hitPoints.currentHP > pointOfDeath;
    }
}
