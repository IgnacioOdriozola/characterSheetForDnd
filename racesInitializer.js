import { Race } from "./race.js";

class RacesIntializer{
    constructor(){
        this.racesList = [];
    }

    initializeRaces(){
        //se crean razas para el personaje y se le setean los valores correspondientes
        const dwarf = new Race("Dwarf");
        dwarf.setAge(250);
        dwarf.setSize("medium");
        dwarf.setSpeed(30);
        dwarf.setdarkVision(60);
        dwarf.addAbilityScoreIncrease( "constitution",  2);
        dwarf.addAbilityScoreIncrease( "strenght", 2);

        const elf = new Race("Elf");
        elf.setAge(600);
        elf.setSize("medium");
        elf.setSpeed(30);
        elf.setdarkVision(60);
        elf.addAbilityScoreIncrease( "dexterity",  2);
        elf.addAbilityScoreIncrease( "intelligence", 2);
        this.racesList.push(dwarf,elf);
    }

    getRaces(){
        return this.racesList;
    }

}

export {RacesIntializer}