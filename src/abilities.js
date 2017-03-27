const defaultAbilityScore = 10;

export default class Abilities {

    constructor(strength, dexterity, constitution, wisdom, intelligence, charisma) {
        this.strength = strength         || defaultAbilityScore;
        this.dexterity = dexterity       || defaultAbilityScore;
        this.constitution = constitution || defaultAbilityScore;
        this.wisdom = wisdom             || defaultAbilityScore;
        this.intelligence = intelligence || defaultAbilityScore;
        this.charisma = charisma         || defaultAbilityScore;
    }

    validateAbilityScore(value) {
        if (value < 1) {
            value = 1;
        } 
        else if (value > 20) {
            value = 20;
        }
        return value;
    }

    modifier(abilityScore) {
        return Math.floor((abilityScore - 10) / 2);
    }


    get strength() { return this._strength; }
    set strength(value) { this._strength = this.validateAbilityScore(value); }


    get dexterity() { return this._dexterity; }
    set dexterity(value) { this._dexterity = this.validateAbilityScore(value); }


    get constitution() { return this._constitution; }
    set constitution(value) { this._constitution = this.validateAbilityScore(value); }


    get wisdom() { return this._wisdom; }
    set wisdom(value) { this._wisdom = this.validateAbilityScore(value); }


    get intelligence() { return this._intelligence; }
    set intelligence(value) { this._intelligence = this.validateAbilityScore(value); }


    get charisma() { return this._charisma; }
    set charisma(value) { this._charisma = this.validateAbilityScore(value); }
}
