"use strict";

const defaultXP = 0,
    defaultLevel = 1;

export default class Rank {

    constructor(xp, level) {
        this.xp = xp || defaultXP;
        this._level = level || defaultLevel;
    }

    checkXP(player) {
        let currentXP = player.rank.xp;
        let currentLvl = player.rank.level;
        if (currentXP >= (currentLvl * 1000)) {
            player.rank.level += 1;
        }
    }

    get level() {
        return this._level;
    }
    set level(inputLvl) {
        this._level = inputLvl;
    }
}