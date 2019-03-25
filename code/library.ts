module RaidNight.Engine
{
    export class Library 
    {
        skillCatalogue = {
            "FIREBALL": new skill_Fireball(),
            "IGNITE": new skill_Ignite(),

            "DRAGON BREATH": new skill_DragonBreath()
        }

        statusCatalogue = {
            "IGNITE": () => {return new status_Ignite();}
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
