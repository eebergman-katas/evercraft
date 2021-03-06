'use strict';

import Abilities from './abilities';
import HitPoints from './hitpoints';
import Rank from './rank';

const alignmentErr = new Error('Sorry, that is not a valid alignment'),
    aDie = require('d20'),
    defaultArmorClass = 10;

export default class Character {

    constructor(name, alignment, armorClass, xp) {
        this.name = name;
        this.alignment = alignment;
        this.armorClass = armorClass || defaultArmorClass;
        this.abilities = new Abilities();
        this.hitPoints = new HitPoints();
        this.rank = new Rank();
    }

    validateAlignments(inputAlignment) {
        const validAlignments = ['good', 'evil', 'neutral'];
        let localAlignment = String(inputAlignment);

        if (!(validAlignments.includes(localAlignment.toLocaleLowerCase()))) {
            throw new Error('Sorry, that is not a valid alignment');
        }
        return inputAlignment;
    }

    modifyArmorClass() {

        let dexScore = this.abilities.dexterity;
        let dexModifier = this.abilities.modifier(dexScore);

        let moddedAC = defaultArmorClass + dexModifier;

        return moddedAC < 10 ? 10 : moddedAC;
    }

    gainXPForAttack(attacker) { 
        attacker.rank.xp += 10;
        attacker.rank.checkForLevelUp(attacker); 
        return attacker;
    }

    get alignment() { return this._alignment; }
    set alignment(inputAlignment) { 
        this._alignment = this.validateAlignments(inputAlignment); 
    }

    get armorClass() { return this.modifyArmorClass(); }
    set armorClass(inputAC) { this._armorClass = inputAC; }
};



