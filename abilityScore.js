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
        let finalScore;
        score<10 ? finalScore = (score-11)/2 : finalScore = (score-10)/2 ;
        return finalScore;
    }

    setProficientSavingThrow(savingThrow){
        this.proficientSavingThrow = savingThrow;
    }
}

export {AbilityScore}