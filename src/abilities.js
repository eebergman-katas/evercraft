export default class Abilities {

    constructor(strength, dexterity, constitution, wisdom, intelligence, charisma) {
        this.strength = strength || 10;
        this.dexterity = dexterity || 10;
        this.constitution = constitution || 10;
        this.wisdom = wisdom || 10;
        this.intelligence = intelligence || 10;
        this.charisma = charisma || 10;
    }

    validate(value) {
        if (value < 1) {
            value = 1;

        } else if (value > 20) {
            value = 20;
        }
        return value;
    }


    get strength() {
        return this._strength;
    }
    set strength(value) {
        this._strength = this.validate(value);
    }


    get dexterity() {
        return this._dexterity;
    }
    set dexterity(value) {
        this._dexterity = this.validate(value);
    }


    get constitution() {
        return this._constitution;
    }
    set constitution(value) {
        this._constitution = this.validate(value);
    }


    get wisdom() {
        return this._wisdom;
    }
    set wisdom(value) {
        this._wisdom = this.validate(value);
    }


    get intelligence() {
        return this._intelligence;
    }
    set intelligence(value) {
        this._intelligence = this.validate(value);
    }


    get charisma() {
        return this._charisma;
    }
    set charisma(value) {
        this._charisma = this.validate(value);
    }


}