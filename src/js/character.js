'use strict';

import Abilities from './abilities';

const alignmentErr = new ReferenceError('Sorry, that is not a valid alignment');
const aDie = require('d20');
const defaultArmorClass = 10;
const defaultHitPoints = 5;
const pointOfDeath = 0;


export default class Character extends Abilities {

    constructor(name, alignment, armorClass, hitPoints) {
        super();
        this.name = name;
        this.alignment = alignment;
        this.armorClass = armorClass || defaultArmorClass;
        this.hitPoints = hitPoints || defaultHitPoints;
        // this.abilities = new Abilities();
    }

    get alignment() { return this._alignment; }
    set alignment(value) {
        value = this.validateAlignments(value);

        this._alignment = value;
    }

    get hitPoints() { return this._hitPoints; }
    set hitPoints(value) { this._hitPoints = value; }

    validateAlignments(value) {
        const validAlignments = ['good', 'evil', 'neutral'];
        let localAlignment = String(value);

        if (!(validAlignments.includes(localAlignment.toLocaleLowerCase()))) {
            throw new ReferenceError('Sorry, that is not a valid alignment');
        }
        return value;
    }

    isAlive() {
        return this.hitPoints > pointOfDeath;
    }
};
