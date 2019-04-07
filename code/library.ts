module RaidNight.Engine
{
    export class Library 
    {
        skillCatalogue = {
            "FIREBALL": new skill_Fireball(),
            "IGNITE": new skill_Ignite(),
            "MEDITATE": new skill_Meditate(),
            
            "HEAL": new skill_Heal(),

            "STRIKE": new skill_Strike(),
            "FORTIFY": new skill_Fortify(),
            "TAUNT":new skill_Taunt(),

            "DRAGONBREATH": new skill_DragonBreath()
        }

        statusCatalogue = {
            "ST_IGNITE": () => {return new status_Ignite();},
            "ST_FORTIFY": () => {return new status_Fortify();},
            "ST_TAUNT": () => {return new status_Taunt();}
        }


        classSkillLookup = {
            "WIZARD": ["FIREBALL", "IGNITE"],
            "PRIEST": ["HEAL"],
            "WARRIOR": ["STRIKE", "FORTIFY", "TAUNT"],
            "DRAGON": ["DRAGONBREATH"],
        }

        lookupSkillForClass = (className: string, skillName: string) =>
        {
            return this.classSkillLookup[className] != null 
                && this.classSkillLookup[className].includes(skillName.toUpperCase());
        }

        lookupSkill = (name: string) =>
        {
            if (this.skillCatalogue[name.toUpperCase()] != null)
            {
                return <Skill>this.skillCatalogue[name.toUpperCase()];
            }

            console.log(`ERROR: Skill lookup failed: ${name.toUpperCase()}`);
            return null;
        }

        instantiateStatus = (name: string) =>
        {
            if (this.statusCatalogue[name.toUpperCase()] != null)
            {
                return <Status>this.statusCatalogue[name.toUpperCase()]();
            }

            console.log(`ERROR: Status lookup failed: ${name.toUpperCase()}`);
            return null;
        }
    }
}
