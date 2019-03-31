module RaidNight.Engine
{
    export class Library 
    {
        skillCatalogue = {
            "FIREBALL": new skill_Fireball(),
            "IGNITE": new skill_Ignite(),
            
            "HEAL": new skill_Heal(),

            "DRAGONBREATH": new skill_DragonBreath()
        }

        statusCatalogue = {
            "IGNITE": () => {return new status_Ignite();}
        }


        classSkillLookup = {
            "WIZARD": ["FIREBALL", "IGNITE"],
            "PRIEST": ["HEAL"],
            "WARRIOR": [],
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
