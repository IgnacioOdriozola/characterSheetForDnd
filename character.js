import { proficiencyBonus } from "./enums.js";
import { attack } from "./functions.js";

class Character{
    constructor(name, race,characterClass){
        this._name = name;
        this._gender;
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
        this._armor;
        this._weapon;
    }


    lvlUp(){
        this._lvl++;
        this._proficiencyBonus = proficiencyBonus[this._lvl];
        this._hitPoints += (parseInt(this._characterClass._hitDice)/2)+1;
    }

    //Calcula la armadura del personaje según sus items
    setArmor(){
        let bestArmor ="";
        let bestArmorModifier = 0
        let armors = this._inventory.filter(item => 
            item.equipment_category.index === "armor");
        armors.forEach(armor=>{
            if(armor.armor_class.base>bestArmor){
                bestArmorModifier = armor.armor_class.base
                bestArmor = armor
            }
        }) 

        if(bestArmor && bestArmor.armor_class.dex_bonus){
            this._armor = bestArmorModifier + (bestArmor.armor_class.dex_bonus && this.getDexterity().modifier);
        }else if(bestArmor){
            this._armor = bestArmorModifier
        }else{
            this._armor = 10 + this.getDexterity().modifier;
        }
    }

    //inventario del personaje  (...) a desarrollar
    addItemsToInventory(...equipment){
        equipment.forEach(item => this._inventory.push(item))
    }

    //hechizos del personaje (...) a desarrollar
    addSpell(spell){
        this._spellList.push(...spell);
    }

    setHitPoints(){
        this._hitPoints = parseInt(this._characterClass.hitDice)+parseInt(this.getConstitution().modifier);
    }

    //devolución de los atributos del personaje
    getAbility(ability){return this._abilities.find( iterator => iterator.name === ability)}
    getStrenght(){return this._abilities.find(iterator => iterator.name === "strenght")}
    getDexterity(){return this._abilities.find(iterator => iterator.name === "dexterity")}
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

    //Prepara los datos para calcular el ataque segun la clase y arma/hechizo
    characterAttack(armor){
        let attackModifier;
        let attackDice;
        if(this._characterClass._name !=="Wizard"){
            let weapon = this._inventory.filter(item => 
                item.equipment_category.index === "weapon")[0];
            attackDice = weapon.damage.damage_dice.split("d");
            attackModifier =  this.getAttackModifier(weapon);
        }else{
            /* let fireBolt = this._characterClass._spells.filter(spell => spell.index === "fire-bolt")[0];
            const {
                lvlOne ,
                lvlFive,
                lvlEleven ,
                lvlSeventeen 
            } =  fireBolt.damage.damage_at_character_level;
            console.log(lvlOne); 
            TODO la API devuelve un objeto donde el identificador son numeros ¿Como se recupera ese dato?*/
            attackDice = [1,10]
            attackModifier = this.getIntelligence().modifier;
        }

        let attackDamage = attack(armor,
            attackModifier + this._proficiencyBonus,
            attackDice[0],
            attackDice[1])
        attackDamage && (attackDamage +=(this._characterClass._name !=="Wizard"?attackModifier : 0))
        return attackDamage
    }

    getAttackModifier(weapon){
        return weapon.properties.some(prop => prop.index==="finesse"||prop.index==="ammunition")?
                    this.getDexterity().modifier:
                    this.getStrenght().modifier;
    }
}

export {Character}