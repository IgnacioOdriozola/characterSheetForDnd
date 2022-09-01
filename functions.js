import { Character } from "./character.js";
import { CharacterBuilder } from "./characterBuilder.js";
import { HtmlBuilder } from "./htmlBuilder.js";
import { _basicSkills, basicRaces, basicClasses } from "./enums.js";
import { RacesIntializer } from "./racesInitializer.js";
import { ClassesInitializer } from "./classesInitializer.js";

let htmlBuilder;
let racesOptions;
let classesOptions;
let classesOptionNames = [];
let characterName = "";
let characterRace = "";
let characterClass = "";
let gender = "";
let character = null;

function initialize(builder) {
  htmlBuilder = builder;
  const racesInitializer = new RacesIntializer();
  racesInitializer.initializeRaces();
  racesOptions = racesInitializer.getRaces();
  htmlBuilder.setHtmlRaces(racesInitializer.getRaces());
  const classesInitializer = new ClassesInitializer();
  classesInitializer.initializeClasses();
  classesOptions = classesInitializer.getClasses();
  classesOptions.forEach((option) => classesOptionNames.push(option._name));
  htmlBuilder.setHtmlCharacterClasses(classesInitializer.getClasses());
}

function swalInitName() {
  const characterListModal = document.getElementById("charactersListModal");
  characterListModal.style.display = "none";
  Swal.fire({
    title: `Enter your character's name`,
    input: "text",
    showCancelButton: false,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      } else {
        characterName = value;
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      swalInitGender();
    }
  });
}

function swalInitGender() {
  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        male: "male",
        female: "female",
      });
    }, 500);
  });

  Swal.fire({
    title: "Select gender",
    input: "radio",
    inputOptions: inputOptions,
    width: "auto",
    padding: "3rem",
    inputValidator: (value) => {
      if (!value) {
        return "You need to choose something!";
      } else {
        gender = value;
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      swalInitRace();
    }
  });
}

function swalInitRace() {
  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        Human: `<img src="${basicRaces[0].img}"  width="100%" height="auto" style="object-fit: cover" alt="new Character">`,
        Dwarf: `<img src="${basicRaces[1].img}" width="100%" style="object-fit: cover" height="auto" alt="new Character">`,
        Elf: `<img src="${basicRaces[2].img}" width="100%" height="auto" style="object-fit: cover" alt="new Character">`,
      });
    }, 500);
  });

  Swal.fire({
    title: "Select race",
    input: "radio",
    inputOptions: inputOptions,
    width: "auto",
    padding: "3rem",
    inputValidator: (value) => {
      if (!value) {
        return "You need to choose something!";
      } else {
        characterRace = racesOptions.find((co) => co._name == value);
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      swalInitClass();
    }
  });
}

function swalInitClass() {
  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        Fighter: `<img src="${basicClasses[0].img}"  width="100%" height="auto" style="object-fit: cover" alt="new Character">`,
        Wizard: `<img src="${basicClasses[1].img}" width="100%" style="object-fit: cover" height="auto" alt="new Character">`,
        Rogue: `<img src="${basicClasses[2].img}" width="100%" height="auto" style="object-fit: cover" alt="new Character">`,
      });
    }, 500);
  });

  Swal.fire({
    title: "Select class",
    input: "radio",
    inputOptions: inputOptions,
    width: "auto",
    padding: "3rem",
    inputValidator: (value) => {
      if (!value) {
        return "You need to choose something!";
      } else {
        characterClass = classesOptions.find((co) => co._name == value);
        if (character) {
          character._characterClass = characterClass;
        } else {
          character = new Character(
            characterName,
            characterRace,
            characterClass
          );
          //characterClass._equipment.forEach(item => character.addItemsToInventory(item))
          character.addItemsToInventory(...characterClass._equipment);
          character._gender = gender;
          character._portrait = `./src/img/${character._gender.toLowerCase()}${character._race._name.toLowerCase()}${character._characterClass._name.toLowerCase()}.jpg`;
        }
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      startBuilder();
    }
  });
}

function startBuilder() {
  let builder = new CharacterBuilder(
    character._characterClass,
    character._race
  );
  builder.throwDices();

  const abilitiesConfirmation = document.getElementById(
    "abilitiesConfirmation"
  );
  abilitiesConfirmation.onclick = () => {
    document.getElementById("dicesModal").style.display = "none";
    builder.setAbilitiesScores(character);
    character.setArmor();
    character.setHitPoints();
    character.addItemsToInventory(...character._characterClass._equipment);

    setCharactersStorage(character);

    const htmlBuilder = new HtmlBuilder();
    htmlBuilder.character = character;
    htmlBuilder.setCharacterInfo();
    htmlBuilder.setHtmlAbilities();
    htmlBuilder.setActionsOption();
  };
}

function objectToCharacter(object) {
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

function setCharactersStorage(character) {
  const characters = localStorage.getItem("characters");
  let parsedCharacters = JSON.parse(characters);

  //si no existe el objeto del storage se crea uno nuevo
  !parsedCharacters && (parsedCharacters = []);

  //Si el personaje está en la lista del storage se actualiza, sino se agrega
  if (parsedCharacters.some((char) => char._name === character._name)) {
    let index = parsedCharacters.indexOf(
      parsedCharacters.find((pc) => pc._name === character._name)
    );
    parsedCharacters[index] = character;
  } else parsedCharacters.push(character);
  localStorage.setItem("characters", JSON.stringify(parsedCharacters));
}

async function externalResource(path, value) {
  const response = await fetch("https://www.dnd5eapi.co/api/" + path + value);
  const data = await response.json();
  return data;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function attack(armor,attackModifier,diceQtty,diceFaces) {
  let dice = getRandomIntInclusive(1, 20);
  let attack = dice + attackModifier;
  console.log("d20 roll: " + dice);
  console.log("Attack: "+attack);
  if (attack >= armor) {
    return dice===20?
        getRandomIntInclusive(parseInt(diceQtty), parseInt(diceFaces))*2
        :getRandomIntInclusive(parseInt(diceQtty), parseInt(diceFaces))
  } else {
    return false;
  }
}

export {
  startBuilder,
  objectToCharacter,
  swalInitName,
  initialize,
  externalResource,
  getRandomIntInclusive,
  attack
};
