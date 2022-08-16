class Race{
    constructor(name){
        this._name = name;
        this._abilitiesScoresIncrease = []
        this._age ="";
        this._size ="";
        this._speed="";
        this._darkVision="";
        this._traits = []
        this._language = []
    }

    //valor de característica dado por la clase que se sumará al valor de los dados de dicha caracteristica
    addAbilityScoreIncrease(abilityScore,score){
        this._abilitiesScoresIncrease.push({name: abilityScore,score: score})
    }

    //devuelve el valor de cierta caracteristica dado por la clase
    getAbilityScoreIncrease(ability){return this._abilitiesScoresIncrease.find(asi => asi.name === ability)}

    //devuelve el valor de todas las caracteristicas dado por la clase
    getAbilitiesScoresIncrease(){return this._abilitiesScoresIncrease}

    //seteo de las diferentes  atributos otorgados por la raza
    addLanguage(language){
        this._language.push(language)
    }
    addTraits(traits){
        this._traits.push(traits)
    }

    setAge(age){
        this._age = age;
    }
    setSize(size){
        this._size = size;
    }
    setSpeed(speed){
        this._speed = speed;
    }
    setdarkVision(darkVision){
        this._darkVision = darkVision;
    }

    //devolución de los diferentes atributos otorgados por la raza
    getAge(){
        return this._age;
    }

    getSize(){
        return this._size;
    }

    getSpeed(){
        return this._speed;
    }

    getDarkVision(){
        return this._darkVision;
    }

}

export {Race}