'use strict';

import Abilities from './abilities';

const alignmentErr = new ReferenceError('Sorry, that is not a valid alignment');
const aDie = require('d20');
const defaultArmorClass = 10;
const defaultHitPoints = 5;
const pointOfDeath = 0;


export default class Character {

    constructor(name, alignment, armorClass, hitPoints) {
        this.name = name;
        this.alignment = alignment;
        this.abilities = new Abilities();
        this.armorClass = armorClass || defaultArmorClass;
        this.hitPoints = hitPoints || defaultHitPoints;
    }

    validateAlignments(inputAlignment) {
        const validAlignments = ['good', 'evil', 'neutral'];
        let localAlignment = String(inputAlignment);

        if (!(validAlignments.includes(localAlignment.toLocaleLowerCase()))) {
            throw new ReferenceError('Sorry, that is not a valid alignment');
        }
        return inputAlignment;
    }

    modifyArmorClass() {

        // dexModifier = isNaN(dexModifier) ? 0 : dexModifier;

        let dexScore = this.abilities.dexterity;
        let dexModifier = this.abilities.modifier(dexScore);

        return defaultArmorClass + dexModifier;
    }

    isAlive() {
        return this.hitPoints > pointOfDeath;
    }


    get alignment() { return this._alignment; }
    set alignment(inputAlignment) { this._alignment = this.validateAlignments(inputAlignment); }

    get hitPoints() { return this._hitPoints; }
    set hitPoints(inputHP) { this._hitPoints = inputHP; }

    get armorClass() { return this.modifyArmorClass(); }
    set armorClass(inputAC) { this._armorClass = inputAC; }
};



