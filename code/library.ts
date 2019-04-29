module RaidNight.Engine
{
    export class Library 
    {
        skillCatalogue = {
            // KNIGHT
            "TAUNT": new skill_Taunt(),
            "STRIKE": new skill_Strike(),
            "SHIELDWALL": new skill_ShieldWall(),
            "PIERCE": new skill_Pierce(),
            "SHIELDBASH": new skill_ShieldBash(),
            "PHALANX": new skill_Phalanx(),

            // PRIEST
            "GREATERHEAL": new skill_GreaterHeal(),
            "FLASHHEAL": new skill_FlashHeal(),
            "REGEN": new skill_Regen(),
            "HYMN": new skill_Hymn(),
            "DIVINEINTERVENTION": new skill_DivineIntervention(),

            // ICE WIZARD
            "ICESHARD": new skill_IceShard(),
            "ICESPEAR": new skill_IceSpear(),
            "FROSTBITE": new skill_Frostbite(),
            "WATERBARRIER": new skill_WaterBarrier(),
            "DELUGE": new skill_Deluge(),

            // DRAGON
            "CLAW": new skill_Claw(),
            "HEATWAVE": new skill_HeatWave(),
            "FLAMETHROWER": new skill_Flamethrower(),

            // ARENA
            "SPIKETRAP": new skill_SpikeTrap(),
            "FIRESTORM": new skill_FireStorm(),
        }

        statusCatalogue = {
            // KNIGHT
            "ST_TAUNT": () => {return new status_Taunt();},
            "ST_SHIELDWALL": () => {return new status_ShieldWall();},
            "ST_PIERCE": () => {return new status_Pierce();},
            "ST_SHIELDBASH": () => {return new status_ShieldBash();},
            "ST_PHALANX": () => {return new status_Phalanx();},
            
            // PRIEST
            "ST_REGEN": () => {return new status_Regen();},
            "ST_DIVINEINTERVENTION": () => {return new status_DivineIntervention();},

            // ICE WIZARD
            "ST_ICESHARD": () => {return new status_IceShard();},
            "ST_FROSTBITE": () => {return new status_Frostbite();},
            "ST_WATERBARRIER": () => {return new status_WaterBarrier();},

            // DRAGON
            "ST_CLAW": () => {return new status_Claw();},
            "ST_HEATWAVE": () => {return new status_HeatWave();},
        }


        classSkillLookup = {
            "KNIGHT": ["TAUNT", "STRIKE", "SHIELDWALL", "PIERCE", "SHIELDBASH", "PHALANX"],
            "PRIEST": ["GREATERHEAL", "FLASHHEAL", "REGEN", "HYMN", "DIVINEINTERVENTION"],
            "WIZARD": ["ICESHARD", "ICESPEAR", "FROSTBITE", "WATERBARRIER", "DELUGE"],            
            "DRAGON": ["CLAW", "HEATWAVE", "FLAMETHROWER"],
            "ROOM": ["SPIKETRAP", "FIRESTORM"]
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

        instantiateStatus = (name: string, source: string) =>
        {
            if (this.statusCatalogue[name.toUpperCase()] != null)
            {
                let status = <Status>this.statusCatalogue[name.toUpperCase()]();
                status.source = source;
                return status;
            }

            console.log(`ERROR: Status lookup failed: ${name.toUpperCase()}`);
            return null;
        }
    }
}
