import { proficiencyBonus } from "./enums.js";

class Character{
    constructor(name, race,characterClass){
        this._name = name;
        this._lvl = 1;
        this._xp=0;
        this._proficiencyBonus = 2;
        this._race = race;
        this._characterClass = characterClass;
        this._abilities = [];
        //this._skills = [];
        this._background ="";
        this._inventory=[];
        this._spellList = [];
        this._hitPoints = "";
        this._portrait = "";
        this._armor = 10;
        this._weapon;
    }


    lvlUp(){
        this._lvl++;
        this._proficiencyBonus = proficiencyBonus[this._lvl];
        this._hitPoints += (parseInt(this._characterClass._hitDice)/2)+1;
    }

    setArmor(){
        let bestArmor =0;
        this._inventory.filter(item => 
            item.type === "armor").forEach(armor=> armor.score> bestArmor || (bestArmor = armor.score))
        this._armor += this.getdexterity().modifier + bestArmor;
    }

    //inventario del personaje  (...) a desarrollar
    addItemsToInventory(equipment){
        this._inventory.push(equipment);
    }

    //hechizos del personaje (...) a desarrollar
    addSpell(spell){
        this._spellList.push(spell);
    }

    setHitPoints(){
        this._hitPoints = this._characterClass.hitDice+this.getConstitution().modifier;
    }

    //devolución de los atributos del personaje
    getAbility(ability){return this._abilities.find( iterator => iterator.name === ability)}
    getStrenght(){return this._abilities.find(iterator => iterator.name === "strenght")}
    getdexterity(){return this._abilities.find(iterator => iterator.name === "dexterity")}
    getConstitution(){return this._abilities.find(iterator => iterator.name === "constitution")}
    getIntelligence(){return this._abilities.find(iterator => iterator.name === "intelligence")}
    getWisdom(){return this._abilities.find(iterator => iterator.name === "wisdom")}
    getCharisma(){return this._abilities.find(iterator => iterator.name === "charisma")}
    getBackground(){return this._background}

    
    subItemsToInventory(equipmentToSubstract){
        this._inventory = this._inventory.filter(equipment => equipment !== equipmentToSubstract);
    }

    subSpell(spellToSubstract){
        this._spellList = this._spellList.filter(spell => spell !== spellToSubstract);
    }
}

export {Character}