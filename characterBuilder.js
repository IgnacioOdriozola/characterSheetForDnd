import { AbilityScore } from "./abilityScore.js";
import { HtmlBuilder} from "./htmlBuilder.js";
import { getRandomIntInclusive } from "./functions.js";

class CharacterBuilder{
    constructor(characterClass,race){
        this.classBuilder = characterClass
        this.abilitiesBuilder = [];
        this.htmlBuilder = new HtmlBuilder()
        this.raceBuilder = race;
        this.throws = []
    }

    

    //características del personaje segun sus tiradas de dados, raza y clase
    throwDices(){
        const diceModal = document.getElementById("dicesModal");
        diceModal.style.display = "block";

        const dicesButton = document.getElementById("dicesButton");
        let count = 0;

            dicesButton.onclick = ()=>{
                let acum=0;
                for(let i =1; i<4;i++){
                    let throwed = getRandomIntInclusive(1,6);
                    const dice = document.getElementById("dice"+i);
                    acum = throwed + acum;
                    dice.setAttribute("src","./src/img/dice"+throwed+".png");
                }
                this.throws.push(acum);  
                count++;                               
                if(count===6) {
                    document.getElementById("dicesDiv").style.display = "none";
                    this.htmlBuilder.setAbilitiesChoosables(this.throws)
                }
                
            }
    } 

    setAbilitiesScores(character){
        for(let i =0; i<6;i++){
            const newScore = parseInt(document.getElementById("diceThrow"+i).innerText);
            let ability = document.getElementById("abilitiesSelector"+i);
            ability = ability.options[ability.selectedIndex].value;
            let savingThrow = this.classBuilder.getSavingThrow().some(((st)=>st === ability)); 
            if(this.raceBuilder.getAbilitiesScoresIncrease().some(asi => asi.name === ability)){
                let newAbility = new AbilityScore(ability, newScore + this.raceBuilder.getAbilityScoreIncrease(ability).score,savingThrow);
                this.abilitiesBuilder.push(newAbility);
            }else{
                let newAbility = new AbilityScore(ability, newScore, savingThrow);
                this.abilitiesBuilder.push(newAbility);
            }
        }
        character._abilities= this.abilitiesBuilder;
    }

    getAbility(ability){return this.abilitiesBuilder.find(iterator => iterator.name == ability)}
}

export {CharacterBuilder}