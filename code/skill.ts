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
        cooldown: integer = 0;
        allAllies: boolean = false;

        healthPerIceShard: integer = 0;
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
            this.mana = 10;
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
            this.mana = -20;
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
            this.health = -5;
            this.mana = 20;
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
            this.health = -5;
            this.mana = -30;
            this.castTime = 1;
            this.cooldown = 20;
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
            this.mana = -100;
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
            this.health = 75;
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
            this.health = 20;
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
            this.mana = -20;
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
            this.mana = -5;
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
            this.mana = 5;
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
            this.mana = 5;
            this.castTime = 1;
            this.cooldown = 100;
            this.name = "Deluge";
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
            this.castTime = 2;
            this.name = "Flamethrower";
        }
    }

    export class skill_SpikeTrap extends Skill
    {
        constructor()
        {
            super();
            this.health = -50;
            this.mana = 0;
            this.castTime = 1;
            this.name = "SpikeTrap";
        }
    }

    export class skill_FireStorm extends Skill
    {
        constructor()
        {
            super();
            this.health = -50;
            this.mana = 0;
            this.castTime = 1;
            this.name = "FireStorm";
        }
    }
}