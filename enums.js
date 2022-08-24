const _basicSkills = [{name:"athletics",modifier:"strenght"},//0
                    {name:"acrobatics",modifier:"dexterity"},//1
                    {name:"sleight of hands",modifier:"dexterity"},//2
                    {name:"stealth",modifier:"dexterity"},//3
                    {name:"arcana",modifier:"intelligence"},//4
                    {name:"history",modifier:"intelligence"},//5
                    {name:"investigation",modifier:"intelligence"},//6
                    {name:"nature",modifier:"intelligence"},//7
                    {name:"religion",modifier:"intelligence"},//8
                    {name:"animal handling",modifier:"wisdom"},//9
                    {name:"insight",modifier:"wisdom"},//10
                    {name:"medicine",modifier:"wisdom"},//11
                    {name:"perception",modifier:"wisdom"},//12
                    {name:"survival",modifier:"wisdom"},//13
                    {name:"deception",modifier:"charisma"},//14
                    {name:"intimidation",modifier:"charisma"},//15
                    {name:"performance",modifier:"charisma"},//16
                    {name:"persuasion",modifier:"charisma"},];//17


const basicRaces = [
    {name: "Human",age: 70,abilitiesScoresIncrease:[{name : "strenght", score: 1},{name : "dexterity", score: 1},{name : "constitution", score: 1},{name : "intelligence", score: 1},{name : "wisdom", score: 1},{name : "charisma", score: 1}],speed:30,darkVision:0, img : "./src/img/human.jpeg"},
    {name: "Dwarf",age: 350,abilitiesScoresIncrease:[{name : "strenght", score: 2},{name : "constitution", score: 2}],speed:30,darkVision:0,  img : "./src/img/dwarf.jpeg"},
    {name: "Elf",age: 650,abilitiesScoresIncrease:[{name : "dexterity", score: 2},{name : "intelligence", score: 1}],speed:30,darkVision:0,  img : "./src/img/elf.jpeg"}
];

const basicClasses = [
    {name: "Figther",hitDice: "10",savingThrow:["strenght","constitution"],choosableSkills:2,skills:[0,1,5,9,10,12,13,15]},
    {name: "Wizard",hitDice: "6",savingThrow:["intelligence","wisdom"],choosableSkills:2,skills:[4,5,6,8,10,11]},
    {name: "Rogue",hitDice: "8",savingThrow:["dexterity","intelligence"],choosableSkills:4,skills:[0,1,2,3,6,10,12,14,15,16,17]}
];

const proficiencyBonus = [0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];

export {_basicSkills, basicRaces,basicClasses,proficiencyBonus}                    