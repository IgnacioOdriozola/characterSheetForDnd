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
                /* const htmlBuilder = new HtmlBuilder();
                htmlBuilder.setSkillProficiences(character); */
            } 
        }  
      }).then((result)=>{
        if(result.isConfirmed){
            swalSkillProf();
        }
      })
}

function swalSkillProf(){
    const divSkill = document.createElement("div");
    divSkill.setAttribute("class","d-flex flex-row justify-content-around");
    for(let i =1;i<=(characterClass._chooseableSkills);i++){
        console.log(characterClass);
        let options = document.createElement("select");
        options.setAttribute("name","skill"+i);
        options.setAttribute("id","skill"+i);
        characterClass._skills.forEach(skill=>{
            const newSkill = document.createElement("option");
            newSkill.setAttribute("value",skill.name);
            newSkill.innerText=skill.name
            options.appendChild(newSkill);
        })
        divSkill.appendChild(options);
    }
    let choosedSkills = [];
    const { value: formValues } =  Swal.fire({
        title: 'Choose your proficiencies',
        html:divSkill,
        width: 'auto',
        padding : '3rem',
        focusConfirm: false,
        preConfirm: () => {
            
            for(let i =1;i<=(characterClass._chooseableSkills);i++){
                choosedSkills.push(document.getElementById("skill"+i).value)
            }
          console.log( choosedSkills)
        }
      }).then((result)=>{
        if(result.isConfirmed){
            startBuilder(choosedSkills)
        }
      })
}


/* function startNameModal(racesOptions, classesOptions){
    //cierra el modal para elegir personaje
    const characterListModal = document.getElementById("charactersListModal");
    characterListModal.style.display = "none";
    
    //abre otro modal para comenzar la creacion de un personaje nuevo
    const nameModal = document.getElementById("nameModal");
    nameModal.style.display = "none";

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
                startClassModal();
            }      
        }    
    }
 
    characterName.onchange =  change;
    choosedRaceName.onchange =  change;
} */

/* function startClassModal(){   
    const characterListModal = document.getElementById("charactersListModal");
    characterListModal.style.display = "none";
    classModal.style.display = "block";
    let character = null;
    let choosedClass = document.getElementById("characterClass");
    choosedClass.onchange = ()=>  {
        let selectedClass =choosedClass.options[choosedClass.selectedIndex];
        let finalClass = classesOptions.find( co => co._name == selectedClass.value);

        if(character){
            character._characterClass = finalClass;
        }else{
            character = new Character(characterName,characterRace,finalClass);
            //se puede mejorar?
            character._portrait= basicRaces[basicRaces.indexOf(basicRaces.find(br=> br.name === characterRace._name))].img;
        }
        const htmlBuilder = new HtmlBuilder();
        htmlBuilder.setSkillProficiences(character);
    }
} */

function startBuilder(skillAcumulator){/* 
    var classModal = document.getElementById("classModal");
    classModal.style.display = "none";
    let choosedSkills = document.getElementById("skillsSelectable")

    let skillAcumulator = [];
    for(let i =0;i<choosedSkills.childNodes.length-1;i++){
        let skillProficiency = document.getElementsByName("skill"+i)[0];
        skillAcumulator.push(skillProficiency.options[skillProficiency.selectedIndex].value)
    } */

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



export {/* startNameModal, */ startBuilder,objectToCharacter,readURL,swalInitName,initialize}