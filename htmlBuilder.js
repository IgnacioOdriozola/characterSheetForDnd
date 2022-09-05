import {getRandomIntInclusive, externalResource} from "./functions.js";
import { basicAbilities } from "./enums.js";

class HtmlBuilder{
    constructor(){
        this.character = null;
    }

    //Construye el modal para elegir las habilidades de la hoja del personaje
    setAbilitiesChoosables(diceThrows){
        const dicesModal = document.getElementById("dicesThrower");
        const subtitle = document.createElement("h2");
        subtitle.innerText = "Rolls";
        dicesModal.appendChild(subtitle);
        const dicesDiv = document.createElement("div");
        dicesDiv.setAttribute("class","dicesDiv");
        let i=0;
        diceThrows.forEach(dt => {
            const throwContainer = document.createElement("div")
            throwContainer.setAttribute("class","throwContainer doubleRedBorder")
            const diceThrow = document.createElement("span");
            diceThrow.setAttribute("class","dicesScore");
            diceThrow.setAttribute("id","diceThrow"+i);
            diceThrow.innerText = dt;
            
            const info = document.createElement("button");
            info.setAttribute("class", "info btn btn-info");
            info.innerText = "❓"
            info.onclick = async () => {
                const data = await externalResource("ability-scores/",info.getAttribute("id"))
                Swal.fire("",data.desc[0])
            }
            throwContainer.appendChild(info)
            throwContainer.appendChild(diceThrow);
            dicesDiv.appendChild(throwContainer);

            const abilitiesSelector = document.createElement("select");
            abilitiesSelector.innerHTML = `
            <option selected disabled>Choose one</option>
            <option value="strenght">Strenght</option>
            <option value="dexterity">Dexterity</option>
            <option value="constitution">Constitution</option>
            <option value="intelligence">Intelligence</option>
            <option value="wisdom">Wisdom</option>
            <option value="charisma">Charisma</option>`;

            abilitiesSelector.setAttribute("id","abilitiesSelector"+i);
            abilitiesSelector.onchange = () => {
                let value = abilitiesSelector.options[abilitiesSelector.selectedIndex].value
                this.setInfo(value,info);
            }
            
            throwContainer.appendChild(abilitiesSelector)
            dicesDiv.appendChild(throwContainer);
            i++;
        })
        const abilitiesConfirmationButton = document.getElementById("abilitiesConfirmation")
        abilitiesConfirmationButton.style.display = "block"
        dicesModal.appendChild(dicesDiv);        
        dicesModal.appendChild(abilitiesConfirmationButton);
    }

    setInfo(value, input){
        let subString = value.slice(0,3);
        input.setAttribute("id",subString);
        input.style.display = "block";
    }

    //Construye la sección de información del personaje de la hoja
    setCharacterInfo(){
        const htmlMain = document.getElementsByTagName("main")[0];
        const sectionInfo = document.createElement("section");
        sectionInfo.setAttribute("id","characterDescription");
        sectionInfo.setAttribute("class", "doubleRedBorder")
        sectionInfo.innerHTML = `<article class="characterInfo doubleRedBorder">
                                    <picture id="characterPicture">
                                        <img id="characterImg" src="${this.character._portrait}" alt="Imagen del personaje ${this.character._name}">
                                    </picture>
                                    <div class="characterNameAndClass">
                                        <h2>${this.character._name}</h2>
                                        <p>${this.character._race._name} ${this.character._characterClass._name}</p>
                                        <p>Lvl: ${this.character._lvl}</p>
                                    </div>
                                </article>
                                <article class="attributes doubleRedBorder">
                                    <span id="armorContainer" class="attributesContainer">
                                        <h2>Armor</h2>
                                        <span class="abilityToFill" id="characterArmor">${this.character._armor}</span>
                                    </span>
                                    <span id="hpContainer" class="attributesContainer">
                                        <h2>HP</h2>
                                        <span class="abilityToFill" id="characterHp">${this.character._hitPoints}</span>
                                    </span>
                                </article>
                                <article>
                                <div class="attributes doubleRedBorder">
                                <span id="armorContainer" class="attributesContainer">
                                    <p>Proficiency</p>
                                    <span class="abilityToFill" id="proficiency">${this.character._proficiencyBonus}</span>
                                </span>
                                <span id="armorContainer" class="attributesContainer">
                                    <p>Speed</p>
                                    <span class="abilityToFill" id="speed">${this.character._race._speed}</span>
                                </span>
                                </div>
                                </article>`
        htmlMain.appendChild(sectionInfo);
        /* 
        <input type='file' id="newImage" />

        document.getElementById("newImage").onchange = () => readURL(this.character); */
    }

    //Construye la sección de las habilidades de la hoja del personaje
    setHtmlAbilities(){
        const htmlMain = document.getElementsByTagName("main")[0]
        const divAbilities = document.createElement("div");
        divAbilities.setAttribute("id","abilitiesDiv");
        divAbilities.setAttribute("class","abilitiesDiv doubleRedBorder")
        const subtitle = document.createElement("h2");
        subtitle.innerText = "Abilities";
        divAbilities.appendChild(subtitle);
        const characterSheetAbilities = document.createElement("section");
        characterSheetAbilities.setAttribute("class","characterAbilities");
        
        basicAbilities.forEach(basicAbility => {
            let ability = this.character._abilities.find(a => a.name === basicAbility);
            let sign= "";
            (ability.modifier>0||ability.modifier==0) && (sign = "+");

            const characterSheetAbility = document.createElement("article");
            characterSheetAbility.setAttribute("class","abilityContainer doubleRedBorder")
            characterSheetAbility.innerHTML = `
            <div>
                <h3>${ability.name}</h3>
                <p class="habilityScore">${ability.score}</p>
            </div>
            <p>modifier ${sign}${ability.modifier}</p>`
            characterSheetAbilities.appendChild(characterSheetAbility);

        })
        divAbilities.appendChild(characterSheetAbilities)
        htmlMain.appendChild(divAbilities)
    }

    //Construye la sección de acciones de combate de la hoja del personaje
    setActionsOption(){
        const htmlMain = document.getElementsByTagName("main")[0];
        const actionsSection = document.createElement("section");
        actionsSection.setAttribute("class","actionsSection abilitiesDiv");
        const attackOption = document.createElement("article");
        attackOption.setAttribute("class","doubleRedBorder actionOption");
        const defenseOption = document.createElement("article");
        defenseOption.setAttribute("class","doubleRedBorder actionOption");
        switch(this.character._characterClass._name){
            case "Rogue": attackOption.innerHTML =`<h2>Attack<h2>
            <picture>
                <img src="./src/img/attack.jpg" alt="Attack option">
            </picture>`;
            
            defenseOption.innerHTML =`<h2>Hide</h2>
            <picture>
                <img src="./src/img/hide.jpg" alt="Hide option">
            </picture>`
            break;
            case "Wizard" : attackOption.innerHTML =`<h2>Attack<h2>
            <picture>
                <img src="./src/img/fire-bolt.jpg" alt="Attack option">
            </picture>`;
            
            defenseOption.innerHTML =`<h2>Defense</h2>
            <picture>
                <img src='./src/img/shield-spell.jpg' alt='Shield defense option'>
            </picture>`
            break;
            case "Fighter":attackOption.innerHTML =`<h2>Attack<h2>
            <picture>
                <img src="./src/img/attack.jpg" alt="Attack option">
            </picture>`;
            defenseOption.innerHTML =`<h2>Defense</h2>
                <picture>
                    <img src='./src/img/shield.png' alt='Shield defense option'>
                </picture>`
                break;
        }

        attackOption.onclick = () => {
            const attackDamage = this.character.characterAttack(12);
            attackDamage ?  
            Swal.fire("You hit it!","Yor was dealed " + attackDamage + " damage","success")
            :Swal.fire("You failed","You missed the attack","error")
        }
        defenseOption.onclick = () => {
            if(this.character._characterClass._name!=="Rogue"){
                Swal.fire("Increase your defense","Your defensive position add +5 against the next attack you recive","success")
            }else{
                let stealthThrow = getRandomIntInclusive(1, 20);
                console.log("Stealth throw: " + stealthThrow);
                console.log("Total: "+(stealthThrow+parseInt(this.character._proficiencyBonus)+parseInt(this.character.getDexterity().modifier)));
                if((stealthThrow+parseInt(this.character._proficiencyBonus)+parseInt(this.character.getDexterity().modifier))>12){
                    Swal.fire("You're hidding","Your Enemy cannot attacks you this turn and you gain +5 to the next attack","success")
                }else Swal.fire("You couldn't hide!","Your enemy saw you before you can hide","error")
            }
        }

         const seekOption = document.createElement("article");
        seekOption.setAttribute("class","doubleRedBorder actionOption");
        seekOption.innerHTML =`<h2>Track enemy</h2>
        <picture>
            <img src="./src/img/seek.jpg" alt="Tracking option">
        </picture>`
        seekOption.onclick =() => {
            let wisdomThrow  = getRandomIntInclusive(1, 20);
                console.log("Stealth throw: " + wisdomThrow );
                console.log("Total: " + (wisdomThrow +parseInt(this.character._proficiencyBonus)+parseInt(this.character.getWisdom().modifier)));
                if((wisdomThrow +parseInt(this.character.getWisdom().modifier))>12){
                    Swal.fire("You find it","You successfully find your enemy trying to hide from you and lose their bonus for hiding","success")
                }else Swal.fire("Oh no!","Your enemy is too good to hide","error")
        }
        const socializeOption = document.createElement("article");
        socializeOption.setAttribute("class","doubleRedBorder actionOption");
        socializeOption.innerHTML =`<h2>Diplomacy</h2>
        <picture>
            <img src="./src/img/diplomacy.jpg" alt="Social option">
        </picture>
        `
        socializeOption.onclick =() => {
            let charismaThrow = getRandomIntInclusive(1, 20);
                console.log("Diplomacy throw: " + charismaThrow);
                console.log("Total: " + (charismaThrow+this.character._proficiencyBonus+this.character.getCharisma().modifier));
                if((charismaThrow+parseInt(this.character.getCharisma().modifier))>12){
                    Swal.fire("You got away with it","You convinced your enemy to retreat without a fight","success")
                }else Swal.fire("Oh no!","Your enemy got more angry because your words","error")
        }
        actionsSection.appendChild(attackOption);
        actionsSection.appendChild(defenseOption);
        actionsSection.appendChild(seekOption); 
        actionsSection.appendChild(socializeOption);

        htmlMain.appendChild(actionsSection)
    }
}

export {HtmlBuilder}