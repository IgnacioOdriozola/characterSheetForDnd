import { Character } from "./character.js";
import { CharacterBuilder } from "./characterBuilder.js";
import {HtmlBuilder} from "./htmlBuilder.js";
import { _basicSkills} from "./enums.js"

function startNameModal(racesOptions, classesOptions){
    //cierra el modal para elegir personaje
    const characterListModal = document.getElementById("charactersListModal");
    characterListModal.style.display = "none";
    
    //abre otro modal para comenzar la creacion de un personaje nuevo
    const nameModal = document.getElementById("nameModal");
    nameModal.style.display = "block";

    const choosedRaceName = document.getElementById("characterRace");
    const characterName = document.getElementById("characterName");
    let change = () => {
        let selectedRace = choosedRaceName.options[choosedRaceName.selectedIndex].value;
        if(characterName.value.trim()!= "" && characterName.value!= null && selectedRace != "default"){
            let choosedRace = racesOptions.find( co => co._name == selectedRace);

            const nameModalButton = document.getElementById("modalNameButton");
            nameModalButton.style.display= "block";
            nameModalButton.onclick = ()=> {
                nameModal.style.display = "none";
                classModal.style.display = "block";
                startClassModal(characterName,choosedRace,classesOptions);
            }      
        }    
    }
 
    characterName.onchange =  change;
    choosedRaceName.onchange =  change;
}

function startClassModal(characterName,characterRace, classesOptions){   
    console.log(classesOptions);     
    let character = null;
    let choosedClass = document.getElementById("characterClass");
    choosedClass.onchange = ()=>  {
        let selectedClass =choosedClass.options[choosedClass.selectedIndex];
        let finalClass = classesOptions.find( co => co._name == selectedClass.value);

        if(character){
            character._characterClass = finalClass;
        }else{
            character = new Character(characterName.value,characterRace,finalClass);
            character._portrait= "./src/img/Character-design-paladin.jpg"
        }
        const htmlBuilder = new HtmlBuilder();
        htmlBuilder.setSkillProficiences(character);
    }
}

function startBuilder(character){
    var classModal = document.getElementById("classModal");
    classModal.style.display = "none";
    let choosedSkills = document.getElementById("skillsSelectable")

    let skillAcumulator = [];
    for(let i =0;i<choosedSkills.childNodes.length-1;i++){
        let skillProficiency = document.getElementsByName("skill"+i)[0];
        skillAcumulator.push(skillProficiency.options[skillProficiency.selectedIndex].value)
    }

    let builder = new CharacterBuilder(character._characterClass,character._race);
    builder.throwDices();

    const abilitiesConfirmation = document.getElementById("abilitiesConfirmation")
        abilitiesConfirmation.onclick = () => {
            document.getElementById("dicesModal").style.display = "none";
            builder.setAbilitiesScores(character);
            builder.setSkillsScores(2,skillAcumulator,_basicSkills,character);

            setCharactersStorage(character)

            const htmlBuilder = new HtmlBuilder();
            htmlBuilder.character = character;
            htmlBuilder.setCharacterInfo();
            htmlBuilder.setHtmlAbilities();
            htmlBuilder.setHtmlSkills();

    }
}

    function readURL(character) {
        const input =  document.getElementById("newImage")
        const charaterImg = document.getElementById("characterImg")
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                charaterImg.setAttribute("src",e.target.result)
            };
    
            let i = reader.readAsDataURL(input.files[0]);
            character._portrait = input.files[0].name;
            setCharactersStorage(character)
            //character._portrait = reader.readAsDataURL(input.files[0]);
        }
    }

    function objectToCharacter(object){
        const character = new Character();
        character._name = object._name;
        character._lvl = object._name;
        character._xp = object._xp;
        character._proficiencyBonus = object._proficiencyBonus;
        character._race = object._race;
        character._characterClass = object._characterClass;
        character._abilities = object._abilities;
        character._skills = object._skills;
        character._background = object._background;
        character._inventory = object._inventory;
        character._spellList = object._spellList;
        character._hitPoints = object._hitPoints;
        character._portrait = object._portrait;

        return character;
    }

    function setCharactersStorage(character){
        const characters = localStorage.getItem("characters");
        let parsedCharacters = JSON.parse(characters);

        //si no existe el objeto del storage se crea uno nuevo
        !parsedCharacters && (parsedCharacters=[]);
        
        //Si el personaje está en la lista del storage se actualiza, sino se agrega
        if(parsedCharacters.some(char=>char._name === character._name)){
            let index = parsedCharacters.indexOf(parsedCharacters.find(pc => pc._name === character._name))
            parsedCharacters[index] = character;
        }else  parsedCharacters.push(character);
        localStorage.setItem("characters",JSON.stringify(parsedCharacters));
    }



export {startNameModal, startBuilder,objectToCharacter,readURL}