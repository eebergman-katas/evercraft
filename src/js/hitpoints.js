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

        let moddedMaxHp = defaultHitPoints + constModifier;

        this._maxHP = moddedMaxHp < 1 ? 1 : moddedMaxHp;
    }

    isAlive(defender) {
        return defender.hitPoints.currentHP > pointOfDeath;
    }

    get maxHP() { return this._maxHP; }
    set maxHP(inputMaxHP) { this._maxHP = inputMaxHP; }
}