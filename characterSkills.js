class Skill{
    constructor(name, modifier, score, isProficient, hasExpertise, proficiencyBonus){
    this.name = name;
    this.modifier = modifier;
    this.isProficient = isProficient;
    this.hasExpertise = hasExpertise;
    this.score = this.getScore(score, proficiencyBonus);
}

setScore(score){
    this.score = score;
}

setProficiency(proficiency, hasExpertise){
    this.isProficient = proficiency;
    this.hasExpertise = hasExpertise;
}

getScore(score, proficiencyBonus){
    if(this.isProficient){
        return score + proficiencyBonus;
    }else if(this.hasExpertise){
        return score + (proficiencyBonus*2);
    }else return score;
}
}

export {Skill}  