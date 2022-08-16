class AbilityScore{
    constructor(name, score,savingThrow) {
        this.name = name;
        this.score = score;
        this.modifier = parseInt(this.calculateModifier(score));
        this.proficientSavingThrow = savingThrow;
    }

    setAbilityScore(score){
        this.score = score;
        this.modifier = parseInt(this.calculateModifier(score));
    }

    getAbilityScore(){
        return this.score;
    }

    getAbilityModifier(){
        return this.modifier;
    }

    calculateModifier(score){
        if(score<10) return (score - 11)/2;
        else return (score -10)/2
    }

    setProficientSavingThrow(savingThrow){
        this.proficientSavingThrow = savingThrow;
    }
}

export {AbilityScore}