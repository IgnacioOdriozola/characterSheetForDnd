import { Race } from "./race.js";
import { basicRaces } from "./enums.js";

class RacesIntializer{
    constructor(){
        this.racesList = [];
    }

    initializeRaces(){
        //se crean razas para el personaje y se le setean los valores correspondientes
        basicRaces.forEach(basicRace=>{
            const newRace = new Race(basicRace.name);
            newRace._age = basicRace.age;
            basicRace.abilitiesScoresIncrease.forEach(asi => newRace.addAbilityScoreIncrease(asi.name,asi.score))
            newRace._speed = basicRace.speed;
            newRace._darkVision = basicRace.darkVision;
            this.racesList.push(newRace);
        })
    }

    getRaces(){
        return this.racesList;
    }

}

export {RacesIntializer}