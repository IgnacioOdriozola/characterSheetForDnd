class CharacterClass{
    constructor(name, hitDice){
        this._name = name;
        this._hitDice = hitDice;
        this._proficiencies=[];
        this._savingThrows=[];
        this._chooseableSkills = "";
        this._skills = [];
        this._equipment = [];
        this._features = [];
    }

    //dado de puntos de vida del personaje segun su clase
    setHitDice(hitDice){
        this._hitDice = hitDice;
    }
    
    //habilidades con las que el personaje es habil según su clase
    addProficiencies(proficiency){
        this._proficiencies.push(proficiency);
    }

    //tiradas de salvación con las que el personaje es competente según su clase
    addSavingThrow(savingThrow){
        this._savingThrows.push(savingThrow);
    }

    //Cantidad de habilidades para elegir proficiencias
    setChooseableSkills(quantity){
        this._chooseableSkills = quantity;
    }

    //habilidades para elegir las proficiencias
    addSkill(skills){
        this._skills.push(skills);
    }

    //armas, armaduras y herramientas otorgadas por la clase al personaje
    addEquipment(equipment){
        this._equipment.push(equipment);
    }

    //funcionalidades que le da la clase al personaje
    addFeatures(feature){
        this._features.push(feature);
    }

    //devolución de los diferentes atributos otorgados por la clase
    get hitDice(){
        return this._hitDice;
    }

    getSavingThrow(){return this._savingThrows}

    getSkills(){return this._skills}

    getChooseableSkills(){
        return this._chooseableSkills;
    }

    //TODO sub clase del personaje (...) a desarrollar
    characterSubclass = class subClass{
        constructor(){
            this.subClassFeature = [];
        }

        addSubClassFeature(feature){
            this.subClassFeature.push(feature);
        }
    }
}

export {CharacterClass}