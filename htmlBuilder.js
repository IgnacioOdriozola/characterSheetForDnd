import {startBuilder} from "./functions.js"

class HtmlBuilder{
    constructor(){
        this.character = null;
    }

    setHtmlRaces(races){
        let racesList = document.querySelector("#characterRace");
        races.forEach( race => {
            let newRace = document.createElement("option");
            newRace.innerText = race._name;
            newRace.className = "characterRace";
            newRace.setAttribute("value",race._name);
            racesList.appendChild(newRace)
        })
    }

    setHtmlCharacterClasses(characterClasses){
        let classesList = document.querySelector("#characterClass");
        characterClasses.forEach( characterClass => {
            let newClass = document.createElement("option");
            newClass.innerText = characterClass._name;
            newClass.className = "characterClass";
            newClass.setAttribute("value",characterClass._name);
            classesList.appendChild(newClass)
        })
    }

    setSkillProficiences(character){
        const characterSheetAbilities = document.getElementById("classModalContent");
        const skillsSelectable = document.createElement("div");
        skillsSelectable.setAttribute("id","skillsSelectable")
        const choosedClass = character._characterClass;
        for(let i=0;i<choosedClass._chooseableSkills;i++){
            const skillSelectable = document.createElement("select");
            skillSelectable.setAttribute("name","skill"+i)
            choosedClass.getSkills().forEach(skill => {
                let newSkill = document.createElement("option");
                newSkill.innerText = skill.name;
                newSkill.className = "characterRace";
                newSkill.setAttribute("value",skill.name);
                skillSelectable.appendChild(newSkill);
            })
            skillsSelectable.appendChild(skillSelectable);
        }
        const skillSelectableButton = document.createElement("button");
        skillSelectableButton.setAttribute("id","skillSelectableButton");
        skillSelectableButton.setAttribute("value","Ok");
        skillSelectableButton.innerText = "Ok";
        skillsSelectable.appendChild(skillSelectableButton)
        characterSheetAbilities.appendChild(skillsSelectable);

        skillSelectableButton.onclick = () => startBuilder(character)
    }

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
            throwContainer.setAttribute("class","throwContainer")
            const diceThrow = document.createElement("span");
            diceThrow.setAttribute("class","dicesScore");
            diceThrow.setAttribute("id","diceThrow"+i);
            diceThrow.innerText = dt;
            
            throwContainer.appendChild(diceThrow);
            dicesDiv.appendChild(throwContainer);

            const abilitiesSelector = document.createElement("select");
            abilitiesSelector.innerHTML = `
            <option value="strenght">Strenght</option>
            <option value="dexterity">Dexterity</option>
            <option value="constitution">Constitution</option>
            <option value="intelligence">Intelligence</option>
            <option value="wisdom">Wisdom</option>
            <option value="charisma">Charisma</option>`;

            abilitiesSelector.setAttribute("id","abilitiesSelector"+i);
            
            throwContainer.appendChild(abilitiesSelector)
            dicesDiv.appendChild(throwContainer);
            i++;
        })
        const abilitiesConfirmationButton = document.getElementById("abilitiesConfirmation")
        abilitiesConfirmationButton.style.display = "block"
        dicesDiv.appendChild(abilitiesConfirmationButton);
        dicesModal.appendChild(dicesDiv);        
    }

    setCharacterInfo(){
        const htmlMain = document.getElementsByTagName("main")[0];
        const sectionInfo = document.createElement("section");
        sectionInfo.setAttribute("id","characterDescription");
        sectionInfo.innerHTML = `<article class="characterInfo">
                                    <picture id="characterPicture">
                                        <img id="characterImg" src="${this.character._portrait}" alt="Imagen del personaje ${this.character._name}">
                                        
                                    </picture>
                                    <div class="characterNameAndClass">
                                        <h2>${this.character._name}</h2>
                                        <p>${this.character._race._name} ${this.character._characterClass._name}</p>
                                        <p>Lvl 1</p>
                                    </div>
                                </article>
                                <article class="attributes">
                                    <span id="armorContainer" class="attributesContainer">
                                        <h2>Armor</h2>
                                        <span class="abilityToFill" id="characterArmor">${parseInt(this.character.getdexterity().modifier)+10}</span>
                                    </span>
                                    <span id="hpContainer" class="attributesContainer">
                                        <h2>HP</h2>
                                        <span class="abilityToFill" id="characterHp">${parseInt(this.character._characterClass._hitDice)+parseInt(this.character.getConstitution().modifier)}</span>
                                    </span>
                                </article>
                                <article>
                                <div class="attributesContainer">
                                    <p>Proficiency</p>
                                    <span class="abilityToFill" id="proficiency">${this.character._proficiencyBonus}</span>
                                    <p>Speed</p>
                                    <span class="abilityToFill" id="speed">${this.character._race._speed}</span>
                                </div>
                                </article>`
        htmlMain.appendChild(sectionInfo);
        /* 
        <input type='file' id="newImage" />

        document.getElementById("newImage").onchange = () => readURL(this.character); */
    }

    setHtmlAbilities(){
        const basicAbilities = ["strenght","dexterity","constitution","intelligence","wisdom","charisma"]
        const htmlMain = document.getElementsByTagName("main")[0]
        const divAbilities = document.createElement("div");
        divAbilities.setAttribute("id","abilitiesDiv");
        divAbilities.setAttribute("class","abilitiesDiv")
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
            characterSheetAbility.setAttribute("class","abilityContainer")
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

    setHtmlSkills(){
        const htmlMain = document.getElementsByTagName("main")[0];
        const characterUtilities = document.createElement("section");
        characterUtilities.setAttribute("class","characterUtilities")
        const characterSheetSkillsScores = document.createElement("article");
        characterSheetSkillsScores.setAttribute("class", "characterSkills");
        const subtitle = document.createElement("h2");
        subtitle.innerText = "Skills";
        characterSheetSkillsScores.appendChild(subtitle)
        characterUtilities.appendChild(characterSheetSkillsScores)
        htmlMain.appendChild(characterUtilities);

        this.character._skills.forEach(skill => {
            let sign= "";

            (skill.score>0||skill.score==0) && (sign = "+");

            const skillContainer = document.createElement("container");
            skillContainer.setAttribute("class","skillContainer");
            skillContainer.innerHTML=`<span class="skillTooltip profCheckbox">
                                            <span class="skillTooltipText">prof</span>
                                            <input id="${skill.name}Prof" type="checkbox"></input>
                                        </span>
                                        <span class="skillTooltip profCheckbox">
                                            <span class="skillTooltipText">expertise</span>
                                            <input type="checkbox" id="${skill.name}Expertise"></input>
                                        </span>
                                        <span class="skillTooltip skillModifier">${skill.modifier.toUpperCase().substr(0,3)}
                                            <span class="skillTooltipText">MOD</span>
                                        </span>
                                        <span class="skillTooltip skillDesc">${skill.name}
                                            <span class="skillTooltipText">Skill</span>
                                        </span>
                                        <span class="skillTooltip skillScore">${sign}${skill.score}
                                            <span class="skillTooltipText">bonus</span>
                                        </span>`
                                        characterSheetSkillsScores.appendChild(skillContainer);
            
            const characterSheetSkillProficiency = document.getElementById(`${skill.name}Prof`);
            const characterSheetSkillExpertise = document.getElementById(`${skill.name}Expertise`);
            
            if(skill.isProficient){
                characterSheetSkillProficiency.checked = true;
            }else if(skill.hasExpertise){
                characterSheetSkillExpertise.checked = true;
            }
           
        })
        
    }
}

export {HtmlBuilder}