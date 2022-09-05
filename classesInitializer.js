import { CharacterClass } from "./characterClass.js";
import { basicClasses } from "./enums.js";
import { externalResource } from "./functions.js";

class ClassesInitializer{

    constructor(){
        this.classesOptions = [];
    }

        initializeClasses(){
        //se crean clases para los personajes y se le setean los valores correspondientes
        basicClasses.forEach(basicClass=>{
            const newClass = new CharacterClass(basicClass.name,basicClass.hitDice);
            newClass.addSavingThrow(...basicClass.savingThrow);
            basicClass.items.forEach(async item => {
                newClass._equipment.push(await externalResource("equipment/",item));
            })
            basicClass.spells.forEach(async spell=>{
                newClass._spells.push(await externalResource("spells/",spell));
            })
            this.classesOptions.push(newClass);
        })
    }

    getClasses(){
        return this.classesOptions;
    }

}

export {ClassesInitializer}