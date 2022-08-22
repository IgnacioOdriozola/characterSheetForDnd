import { CharacterClass } from "./characterClass.js";
import {_basicSkills,basicClasses} from "./enums.js"

class ClassesInitializer{

    constructor(){
        this.classesOptions = [];
    }

    initializeClasses(){
        //se crean clases para los personajes y se le setean los valores correspondientes
        basicClasses.forEach(basicClass=>{
            const newClass = new CharacterClass(basicClass.name,basicClass.hitDice);
            newClass._chooseableSkills = basicClass.choosableSkills;
            newClass.addSavingThrow(...basicClass.savingThrow);
            basicClass.skills.forEach(skill=> newClass.addSkill(_basicSkills[skill]));
            this.classesOptions.push(newClass);
        })
        /* const fighter = new CharacterClass("Figther",10);
        fighter.setHitDice(10);
        fighter.addSavingThrow("strenght");
        fighter.addSavingThrow("constitution");
        fighter.setChooseableSkills(2);
        fighter.addSkill(_basicSkills[0]);
        fighter.addSkill(_basicSkills[1]);
        fighter.addSkill(_basicSkills[6]);
        fighter.addSkill(_basicSkills[9]);
        fighter.addSkill(_basicSkills[11]);
        fighter.addSkill(_basicSkills[13]);
        fighter.addSkill(_basicSkills[14]);
        fighter.addSkill(_basicSkills[16]);

        const mage = new CharacterClass("Mage",6);
        mage.setHitDice(6);
        mage.addSavingThrow("intelligence");
        mage.addSavingThrow("constitution");
        mage.setChooseableSkills(2);
        mage.addSkill(_basicSkills[0]);
        mage.addSkill(_basicSkills[9]);
        mage.addSkill(_basicSkills[11]);
        mage.addSkill(_basicSkills[13]);
        mage.addSkill(_basicSkills[14]);
        mage.addSkill(_basicSkills[16]);
        
        this.classesOptions.push(fighter,mage); */
    }

    getClasses(){
        return this.classesOptions;
    }

}

export {ClassesInitializer}