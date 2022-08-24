import { Character } from "./character.js";
import { CharacterBuilder } from "./characterBuilder.js";
import {HtmlBuilder} from "./htmlBuilder.js";
import { _basicSkills, basicRaces} from "./enums.js";
import { RacesIntializer } from "./racesInitializer.js";
import { ClassesInitializer} from "./classesInitializer.js";

let htmlBuilder;
let racesOptions;
let classesOptions;
let classesOptionNames = [];
let characterName = "";
let characterRace = "";
let characterClass = "";
let character = null;

function initialize(builder){
    htmlBuilder = builder
    const racesInitializer = new RacesIntializer();
    racesInitializer.initializeRaces();
    racesOptions = racesInitializer.getRaces();
    htmlBuilder.setHtmlRaces(racesInitializer.getRaces());
    const classesInitializer = new ClassesInitializer();
    classesInitializer.initializeClasses();
    classesOptions = classesInitializer.getClasses();
    classesOptions.forEach(option => classesOptionNames.push(option._name))
    htmlBuilder.setHtmlCharacterClasses(classesInitializer.getClasses());
}

function swalInitName(){
    const characterListModal = document.getElementById("charactersListModal");
    characterListModal.style.display = "none";
    Swal.fire({
        title: `Enter your character's name`,
        input: 'text',
        showCancelButton: false,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }else{
            characterName = value;
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
            swalInitRace()
          }
        })
}

function swalInitRace(){
    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            'Human': `<img src="${basicRaces[0].img}"  width="100%" height="auto" style="object-fit: cover" alt="new Character">`,
            'Dwarf': `<img src="${basicRaces[1].img}" width="100%" style="object-fit: cover" height="auto" alt="new Character">`,
            'Elf': `<img src="${basicRaces[2].img}" width="100%" height="auto" style="object-fit: cover" alt="new Character">`
          })
        }, 500)
      })
      
      Swal.fire({
        title: 'Select race',
        input: 'radio',
        inputOptions: inputOptions,
        width: 'auto',
        padding : '3rem',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to choose something!'
          }else{
            characterRace = racesOptions.find( co => co._name == value);
          } 
        }
      }).then((result) => {
        if (result.isConfirmed) {
            swalInitClass()
          }
        })

}

function swalInitClass(){
    const { value: choosedClass } = Swal.fire({
        title: 'Choose your class',
        input: 'select',
        inputOptions: {
          classesOptionNames
        },
        inputPlaceholder: 'Select a class',
        showCancelButton: false,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to choose something!'
            }else{
                characterClass = classesOptions.find( co => co._name == classesOptionNames[value]);
                
                if(character){
                    character._characterClass = characterClass;
                }else{
                    character = new Character(characterName,characterRace,characterClass);
                    //se puede mejorar?
                    character._portrait= basicRaces[basicRaces.indexOf(basicRaces.find(br=> br.name === characterRace._name))].img;    
                }
            } 
        }  
      }).then((result)=>{
        if(result.isConfirmed){
          startBuilder()
        }
      })
}

function startBuilder(){

    let builder = new CharacterBuilder(character._characterClass,character._race);
    builder.throwDices();

    const abilitiesConfirmation = document.getElementById("abilitiesConfirmation")
        abilitiesConfirmation.onclick = () => {
            document.getElementById("dicesModal").style.display = "none";
            builder.setAbilitiesScores(character);
            character.setArmor();
            character._hitPoints = parseInt(character._characterClass._hitDice) + parseInt(character.getConstitution().modifier);

            setCharactersStorage(character)

            const htmlBuilder = new HtmlBuilder();
            htmlBuilder.character = character;
            htmlBuilder.setCharacterInfo();
            htmlBuilder.setHtmlAbilities();

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



export { startBuilder,objectToCharacter,swalInitName,initialize}