module RaidNight.Engine
{
    export class Skill 
    {
        health: integer = 0;
        mana: integer = 0;
        castTime: integer = 1;
        name: string;
        targetStatuses: string[] = [];
        selfStatuses: string[] = [];
        selfOnly: boolean = false;
        cremate: boolean = false;
        cooldown: integer = 0;
        allAllies: boolean = false;

        healthPerIceShard: integer = 0;
        selfHealth: integer = 0;
        useAllMana: boolean = false;

        fastforwardValue: integer = 0;
        
    }

    // ********** 
    // KNIGHT
    // ********** 
    export class skill_Taunt extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = 0;
            this.castTime = 1;
            this.name = "Taunt";
            this.targetStatuses = ["ST_TAUNT"];
        }
    }

    export class skill_Strike extends Skill
    {
        constructor()
        {
            super();
            this.health = -10;
            this.mana = 20;
            this.castTime = 1;
            this.name = "Strike";
        }
    }
    
    export class skill_ShieldWall extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = -50;
            this.castTime = 1;
            this.name = "ShieldWall";
            this.selfOnly = true;
            this.selfStatuses = ["ST_SHIELDWALL"];
        }
    }

    export class skill_Pierce extends Skill
    {
        constructor()
        {
            super();
            this.health = -10;
            this.mana = -20;
            this.castTime = 1;
            this.cooldown = 5;
            this.name = "Pierce";
            this.targetStatuses = ["ST_PIERCE"];
        }
    }

    export class skill_ShieldBash extends Skill
    {
        constructor()
        {
            super();
            this.health = -10;
            this.mana = -50;
            this.castTime = 1;
            this.name = "ShieldBash";
            this.targetStatuses = ["ST_SHIELDBASH"];
        }
    }

    export class skill_Phalanx extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = 0;
            this.castTime = 1;
            this.cooldown = 100;
            this.name = "Phalanx";
            this.selfOnly = true;
            this.selfStatuses = ["ST_PHALANX"];
        }
    }

    // ********** 
    // Priest
    // ********** 
    export class skill_GreaterHeal extends Skill
    {
        constructor()
        {
            super();
            this.health = 100;
            this.mana = -5;
            this.castTime = 3;
            this.name = "GreaterHeal";
        }
    }

    export class skill_FlashHeal extends Skill
    {
        constructor()
        {
            super();
            this.health = 35;
            this.mana = -5;
            this.castTime = 1;
            this.name = "FlashHeal";
        }
    }

    export class skill_Regen extends Skill
    {
        constructor()
        {
            super();
            this.health = 5;
            this.mana = -2;
            this.castTime = 1;
            this.name = "Regen";
            this.targetStatuses = ["ST_REGEN"];
        }
    }

    export class skill_Hymn extends Skill
    {
        constructor()
        {
            super();
            this.health = 15;
            this.mana = 10;
            this.castTime = 2;
            this.allAllies = true;
            this.name = "Hymn";
        }
    }

    export class skill_DivineIntervention extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = -10;
            this.castTime = 1;
            this.cooldown = 100;
            this.allAllies = true;
            this.name = "DivineIntervention";
            this.targetStatuses = ["ST_DIVINEINTERVENTION"];
        }
    }

    // ********** 
    // ICE WIZARD
    // ********** 
    export class skill_IceShard extends Skill
    {
        constructor()
        {
            super();
            this.health = -20;
            this.castTime = 2;
            this.mana = -4;
            this.name = "IceShard";
            this.selfStatuses = ["ST_ICESHARD"];
        }
    }

    export class skill_IceSpear extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.healthPerIceShard = -50; 
            this.castTime = 1;
            this.mana = -5;
            this.name = "IceSpear";
        }
    }

    export class skill_Frostbite extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = -5;
            this.castTime = 1;
            this.cooldown = 20;
            this.name = "Frostbite";
            this.selfOnly = true;
            this.selfStatuses = ["ST_FROSTBITE"];
        }
    }

    export class skill_WaterBarrier extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = 5;
            this.castTime = 1;
            this.cooldown = 20;
            this.name = "WaterBarrier";
            this.targetStatuses = ["ST_WATERBARRIER"];
        }
    }

    export class skill_Deluge extends Skill
    {
        constructor()
        {
            super();
            this.health = -200;
            this.mana = 20;
            this.castTime = 1;
            this.cooldown = 100;
            this.name = "Deluge";
        }
    }

    // ********** 
    // FWIZARD
    // ********** 
    export class skill_Kindle extends Skill
    {
        constructor()
        {
            super();
            this.health = -10;
            this.castTime = 2;
            this.mana = 20;
            this.name = "Kindle";
        }
    }

    export class skill_Fireball extends Skill
    {
        constructor()
        {
            super();
            this.health = -100;
            this.castTime = 3;
            this.mana = -30;
            this.name = "Fireball";
        }
    }

    export class skill_Scorch extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = -10;
            this.castTime = 1;
            this.cooldown = 5;
            this.name = "Scorch";
            this.targetStatuses = ["ST_SCORCH"];
        }
    }
    

    export class skill_Cauterize extends Skill
    {
        constructor()
        {
            super();
            this.health = -50;
            this.mana = -20;
            this.castTime = 1;
            this.cooldown = 20;
            this.name = "Cauterize";
            this.targetStatuses = ["ST_CAUTERIZE"];
        }
    }

    export class skill_FireBarrier extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = -20;
            this.castTime = 1;
            this.cooldown = 20;
            this.allAllies = true;
            this.name = "FireBarrier";
            this.targetStatuses = ["ST_FIREBARRIER"];
        }
    }

    export class skill_Cremate extends Skill
    {
        constructor()
        {
            super();
            this.health = -100;
            this.mana = -50;
            this.castTime = 1;
            this.cooldown = 100;
            this.cremate = true;
            this.name = "Cremate";
        }
    }
    
    // ********** 
    // ELEMENTAL WIZARD
    // ********** 
    export class skill_FireballUltra extends Skill
    {
        constructor()
        {
            super();
            this.health = -50;
            this.castTime = 1;
            this.mana = 25;
            this.name = "FireballUltra";
        }
    }

    export class skill_CremateUltra extends Skill
    {
        constructor()
        {
            super();
            this.health = -200;
            this.selfHealth = -50;
            this.mana = 50;
            this.castTime = 1;
            this.cremate = true;
            this.name = "CremateUltra";
        }
    }
    
    export class skill_IceShardUltra extends Skill
    {
        constructor()
        {
            super();
            this.health = -20;
            this.mana = -10;
            this.castTime = 1;
            this.name = "IceShardUltra";
            this.selfStatuses = ["ST_ICESHARD"];
        }
    }

    export class skill_IceSpearUltra extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.healthPerIceShard = -50; 
            this.castTime = 1;
            this.mana = -20;
            this.name = "IceSpearUltra";
        }
    }

    export class skill_FrostbiteUltra extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = 0;
            this.castTime = 1;
            this.cooldown = 20;
            this.name = "FrostbiteUltra";
            this.selfOnly = true;
            this.selfStatuses = ["ST_FROSTBITEULTRA"];
        }
    }
    
    export class skill_CoolingWinds extends Skill
    {
        constructor()
        {
            super();
            this.health = 100;
            this.useAllMana = true;
            this.allAllies = true;
            this.castTime = 1;
            this.cooldown = 100;
            this.name = "CoolingWinds";
        }
    }


    // ********** 
    // FIRE DRAGON
    // ********** 
    export class skill_Claw extends Skill
    {
        constructor()
        {
            super();
            this.health = -20;
            this.mana = 0;
            this.castTime = 1;
            this.name = "Claw";
            this.targetStatuses = ["ST_CLAW"];
        }
    }

    export class skill_HeatWave extends Skill
    {
        constructor()
        {
            super();
            this.health = -5;
            this.mana = 0;
            this.castTime = 1;
            this.name = "HeatWave";
            this.targetStatuses = ["ST_HEATWAVE"];
        }
    }

    export class skill_Flamethrower extends Skill
    {
        constructor()
        {
            super();
            this.health = -100;
            this.mana = 0;
            this.castTime = 3;
            this.name = "Flamethrower";
        }
    }

    export class skill_FireStorm extends Skill
    {
        constructor()
        {
            super();
            this.health = -100;
            this.mana = 0;
            this.castTime = 1;
            this.name = "FireStorm";
        }
    }
    
    // ********** 
    // MDRAGON
    // ********** 
    export class skill_TailSwipe extends Skill
    {
        constructor()
        {
            super();
            this.health = -15;
            this.mana = 0;
            this.castTime = 1;
            this.name = "TailSwipe";
        }
    }

    export class skill_VenomousBite extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = 0;
            this.castTime = 1;
            this.name = "VenomousBite";
            this.targetStatuses = ["ST_VENOMOUSBITE"];
        }
    }

    export class skill_SpikeTrap extends Skill
    {
        constructor()
        {
            super();
            this.health = -100;
            this.mana = 0;
            this.castTime = 1;
            this.name = "SpikeTrap";
        }
    }

    export class skill_Whip extends Skill
    {
        constructor()
        {
            super();
            this.health = -10;
            this.mana = 0;
            this.castTime = 1;
            this.name = "Whip";
        }
    }

    export class skill_EnhancedWhip extends Skill
    {
        constructor()
        {
            super();
            this.health = -15;
            this.mana = 0;
            this.castTime = 1;
            this.name = "EnhancedWhip";
        }
    }

    export class skill_Bind extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = 0;
            this.castTime = 1;
            this.name = "Bind";
            this.targetStatuses = ["ST_BIND"];
        }
    }

    export class skill_EnhancedBind extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = 0;
            this.castTime = 1;
            this.name = "EnhancedBind";
            this.targetStatuses = ["ST_ENHANCEDBIND"];
        }
    }

    export class skill_Miasma extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = 0;
            this.castTime = 1;
            this.name = "Miasma";
            this.targetStatuses = ["ST_MIASMA"];
        }
    }

    export class skill_Miasmata extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = 0;
            this.castTime = 1;
            this.name = "Miasmata";
            this.targetStatuses = ["ST_MIASMATA"];
        }
    }
    
    // ********** 
    // TIMEDRAGON
    // ********** 
    export class skill_Rewind extends Skill
    {
        constructor()
        {
            super();
            this.health = -20;
            this.mana = 0;
            this.castTime = 1;
            this.fastforwardValue = -5;
            this.name = "Rewind";
        }
    }
    
    export class skill_FastForward extends Skill
    {
        constructor()
        {
            super();
            this.health = -20;
            this.mana = 0;
            this.castTime = 1;
            this.fastforwardValue = 5;
            this.name = "FastForward";
        }
    }
    
    export class skill_Halt extends Skill
    {
        constructor()
        {
            super();
            this.health = -20;
            this.mana = 0;
            this.castTime = 1;
            this.name = "Halt";
            this.targetStatuses = ["ST_HALT"];
        }
    }
    
    export class skill_Bite extends Skill
    {
        constructor()
        {
            super();
            this.health = -20;
            this.mana = 0;
            this.castTime = 1;
            this.name = "Bite";
        }
    }
    
    export class skill_SandPrism extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = 0;
            this.castTime = 1;
            this.name = "SandPrism";
        }
    }
    
    export class skill_TimeLaser extends Skill
    {
        constructor()
        {
            super();
            this.health = -50;
            this.mana = 0;
            this.castTime = 1;
            this.name = "TimeLaser";
        }
    }
}