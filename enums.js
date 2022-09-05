const basicRaces = [
    {name: "Human",age: 70,abilitiesScoresIncrease:[{name : "strenght", score: 1},{name : "dexterity", score: 1},{name : "constitution", score: 1},{name : "intelligence", score: 1},{name : "wisdom", score: 1},{name : "charisma", score: 1}],speed:30,darkVision:0, img : "./src/img/human.jpg"},
    {name: "Dwarf",age: 350,abilitiesScoresIncrease:[{name : "strenght", score: 2},{name : "constitution", score: 2}],speed:30,darkVision:0,  img : "./src/img/dwarf.jpg"},
    {name: "Elf",age: 650,abilitiesScoresIncrease:[{name : "dexterity", score: 2},{name : "intelligence", score: 1}],speed:30,darkVision:0,  img : "./src/img/elf.jpg"}
];

const basicClasses = [
    {name: "Fighter",hitDice: "10",savingThrow:["strenght","constitution"],choosableSkills:2,skills:[0,1,5,9,10,12,13,15],  img : "./src/img/fighter.jpg", items: ["longsword","chain-mail"],spells : []},
    {name: "Wizard",hitDice: "6",savingThrow:["intelligence","wisdom"],choosableSkills:2,skills:[4,5,6,8,10,11],  img : "./src/img/wizard.jpg", items: [], spells : ["fire-bolt","shield"]},
    {name: "Rogue",hitDice: "8",savingThrow:["dexterity","intelligence"],choosableSkills:4,skills:[0,1,2,3,6,10,12,14,15,16,17],  img : "./src/img/rogue.jpg", items: ["shortbow","leather-armor"], spells: []}
];

const proficiencyBonus = [0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];

const basicAbilities = ["strenght","dexterity","constitution","intelligence","wisdom","charisma"]

export { basicRaces,basicClasses,proficiencyBonus,basicAbilities}                    