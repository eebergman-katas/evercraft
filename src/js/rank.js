"use strict";

const defaultXP = 0,
    defaultLevel = 1;

export default class Rank {

    constructor(xp, level) {
        this.xp = xp || defaultXP;
        this.level = level || defaultLevel;
    }

    checkForLevelUp(player) { 
        let currentXP = player.rank.xp;
        let currentLvl = player.rank.level;

        if (currentXP >= (currentLvl * 1000)) {
            player.rank.level++;
        }
    }
}