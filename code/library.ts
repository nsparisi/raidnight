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

            // FWIZARD
            "KINDLE": new skill_Kindle(),
            "FIREBALL": new skill_Fireball(),
            "SCORCH": new skill_Scorch(),
            "CAUTERIZE": new skill_Cauterize(),
            "FIREBARRIER": new skill_FireBarrier(),
            "CREMATE": new skill_Cremate(),
            
            // EWIZARD
            "FIREBALLULTRA": new skill_FireballUltra(),
            "CREMATEULTRA": new skill_CremateUltra(),
            "ICESHARDULTRA": new skill_IceShardUltra(),
            "ICESPEARULTRA": new skill_IceSpearUltra(),
            "FROSTBITEULTRA": new skill_FrostbiteUltra(),
            "COOLINGWINDS": new skill_CoolingWinds(),

            // FDRAGON
            "CLAW": new skill_Claw(),
            "HEATWAVE": new skill_HeatWave(),
            "FLAMETHROWER": new skill_Flamethrower(),
            
            // MDRAGON
            "TAILSWIPE": new skill_TailSwipe(),
            "VENOMOUSBITE": new skill_VenomousBite(),
            "WHIP": new skill_Whip(),
            "ENHANCEDWHIP": new skill_EnhancedWhip(),
            "BIND": new skill_Bind(),
            "ENHANCEDBIND": new skill_EnhancedBind(),
            "MIASMA": new skill_Miasma(),
            "MIASMATA": new skill_Miasmata(),

            // TDRAGON
            "REWIND": new skill_Rewind(),
            "FASTFORWARD": new skill_FastForward(),
            "HALT": new skill_Halt(),
            "BITE": new skill_Bite(),
            "SANDPRISM": new skill_SandPrism(),
            "TIMELASER": new skill_TimeLaser(),

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

            // FWIZARD
            "ST_SCORCH": () => {return new status_Scorch();},
            "ST_CAUTERIZE": () => {return new status_Cauterize();},
            "ST_FIREBARRIER": () => {return new status_FireBarrier();},
            "ST_HEATINGUP": () => {return new status_HeatingUp();},
            
            // EWIZARD
            "ST_ICESHARDULTRA": () => {return new status_IceShardUltra();},
            "ST_FROSTBITEULTRA": () => {return new status_FrostbiteUltra();},
            "ST_OVERHEATING": () => {return new status_Overheating();},

            // DRAGON
            "ST_CLAW": () => {return new status_Claw();},
            "ST_HEATWAVE": () => {return new status_HeatWave();},
            
            // MDRAGON
            "ST_VENOMOUSBITE": () => {return new status_VenomousBite();},
            "ST_BIND": () => {return new status_Bind();},
            "ST_ENHANCEDBIND": () => {return new status_EnhancedBind();},
            "ST_MIASMA": () => {return new status_Miasma();},
            "ST_MIASMATA": () => {return new status_Miasmata();},
            
            // TDRAGON
            "ST_HALT": () => {return new status_Halt();},
        }

        classSkillLookup = {
            "KNIGHT": ["TAUNT", "STRIKE", "SHIELDWALL", "PIERCE", "SHIELDBASH", "PHALANX"],
            "PRIEST": ["GREATERHEAL", "FLASHHEAL", "REGEN", "HYMN", "DIVINEINTERVENTION"],
            "IWIZARD": ["ICESHARD", "ICESPEAR", "FROSTBITE", "WATERBARRIER", "DELUGE"],
            "FWIZARD": ["KINDLE", "FIREBALL", "SCORCH", "CAUTERIZE", "FIREBARRIER", "CREMATE"],
            "EWIZARD": ["FIREBALLULTRA", "CREMATEULTRA", "ICESHARDULTRA", "ICESPEARULTRA", "FROSTBITEULTRA", "COOLINGWINDS"],
            "DRAGON": ["CLAW", "HEATWAVE", "FLAMETHROWER"],     
            "MOSSDRAGON": ["TAILSWIPE", "VENOMOUSBITE"],  
            "TIMEDRAGON": ["REWIND", "FASTFORWARD", "HALT", "BITE", "TIMELASER", "SANDPRISM"],
            "SANDPRISM": ["TIMELASER"],
            "DEVILVINE": ["WHIP", "ENHANCEDWHIP", "BIND", "ENHANCEDBIND"],
            "CORPSEFLOWER": ["MIASMA", "MIASMATA"],
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

            Debug.log(`ERROR: Skill lookup failed: ${name.toUpperCase()}`);
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

            Debug.log(`ERROR: Status lookup failed: ${name.toUpperCase()}`);
            return null;
        }
    }
}
