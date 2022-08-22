import { HtmlBuilder } from "./htmlBuilder.js";
import { initialize,objectToCharacter,swalInitName } from "./functions.js";

//se setean razas y clases en el html para que el jugador elija
const htmlBuilder = new HtmlBuilder();
initialize(htmlBuilder)

const characters = localStorage.getItem("characters");
//si en el storage hay personajes creados, los carga para elegir o crear uno nuevo (ya está en el html)
if(characters){
    const characterListModal = document.getElementById("charactersListModal");
    characterListModal.style.display = "block";

    const newCharOption = document.getElementById("newCharacter");
    newCharOption.onclick = () => swalInitName(htmlBuilder);// startNameModal(racesInitializer.getRaces(),classesInitializer.getClasses());

    let parsedCharacters = JSON.parse(characters);

    const characterList = document.getElementById("characterList");
    const characterListSubtitle = document.createElement("h2");
    characterListSubtitle.innerText = "Choose your character!";
    parsedCharacters.forEach(element => {
        let character = objectToCharacter(parsedCharacters.find(char => char._name === element._name));

        const newChar = document.createElement("span");
        newChar.setAttribute("class","newCharContainer");
        newChar.setAttribute("id",character._name)
        newChar.innerHTML = ` <img src="${character._portrait}" alt="Choose your character: ${character._name}">
                        <h3>${character._name}</h3>
                    `

                
        //al elegir un personaje arma la hoja
        newChar.onclick = () => {
            const characterListModal = document.getElementById("charactersListModal");
            characterListModal.style.display = "none";
            htmlBuilder.character = character;
            
            htmlBuilder.setCharacterInfo();
            htmlBuilder.setHtmlAbilities();
            htmlBuilder.setHtmlSkills();
        }
        characterList.appendChild(newChar);
    });
}
//si no hay personajes creados pasa directamente a la creación
else{
    swalInitName(htmlBuilder)
    //startNameModal(racesInitializer.getRaces(),classesInitializer.getClasses());
}


