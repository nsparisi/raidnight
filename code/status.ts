module RaidNight.Engine
{
    export enum StatusType {Good, Bad}

    export class Status
    {
        type: StatusType;
        duration: integer;
        name: string;
        stacks: integer = 1;
        maxStacks: integer = 1;

        healthPerTurn: integer = 0;
        manaPerTurn: integer = 0;
        defense: integer = 0;
        power: integer = 0;
        taunt: boolean = false;
        source: string = null;

        st_bindEffect: integer = 0;
        st_heatingUpEffect: boolean = false;
        st_overheatingEffect: boolean = false;
        st_haltEffect: boolean = false;
    }

    // ********** 
    // KNIGHT
    // ********** 
    export class status_Taunt extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "ST_Taunt";
            this.duration = 5;
            this.taunt = true;
        }
    }

    export class status_ShieldWall extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Good;
            this.name = "ST_ShieldWall";
            this.duration = 5;
            this.defense = 50;
        }
    }

    export class status_Pierce extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "ST_Pierce";
            this.duration = 5;
            this.healthPerTurn = -10;
        }
    }

    export class status_ShieldBash extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "ST_ShieldBash";
            this.duration = 5;
            this.defense = -50;
        }
    }

    export class status_Phalanx extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Good;
            this.name = "ST_Phalanx";
            this.duration = 5;
            this.defense = 100;
        }
    }

    // ********** 
    // PRIEST
    // ********** 
    export class status_Regen extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Good;
            this.name = "ST_Regen";
            this.duration = 10;
            this.healthPerTurn = 5;
        }
    }

    export class status_DivineIntervention extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Good;
            this.name = "ST_DivineIntervention";
            this.duration = 5;
            this.healthPerTurn = 100;
        }
    }

    // ********** 
    // ICE WIZARD
    // ********** 
    export class status_IceShard extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Good;
            this.name = "ST_IceShard";
            this.duration = 10;
            this.maxStacks = 3;
        }
    }

    export class status_Frostbite extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Good;
            this.name = "ST_Frostbite";
            this.duration = 10;
            this.power = 20;
        }
    }

    export class status_WaterBarrier extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Good;
            this.name = "ST_WaterBarrier";
            this.duration = 5;
            this.defense = 20;
        }
    }
    
    // ********** 
    // FWIZARD
    // ********** 
    export class status_Scorch extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "ST_Scorch";
            this.duration = 10;
            this.healthPerTurn = -2;
            this.maxStacks = 20;
        }
    }
    
    export class status_Cauterize extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Good;
            this.name = "ST_Cauterize";
            this.duration = 2;
            this.healthPerTurn = 50;
        }
    }

    export class status_FireBarrier extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Good;
            this.name = "ST_FireBarrier";
            this.duration = 1;
            this.defense = 50;
        }
    }
    
    export class status_HeatingUp extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Good;
            this.name = "ST_HeatingUp";
            this.duration = 1000;
            this.st_heatingUpEffect = true;
        }
    }
    
    // ********** 
    // ELEMENTAL WIZARD
    // ********** 
    export class status_IceShardUltra extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Good;
            this.name = "ST_IceShardUltra";
            this.duration = 10;
            this.maxStacks = 3;
        }
    }

    export class status_FrostbiteUltra extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Good;
            this.name = "ST_FrostbiteUltra";
            this.duration = 5;
            this.power = 20;
            this.manaPerTurn = -10;
        }
    }
    export class status_Overheating extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "ST_Overheating";
            this.duration = 1000;
            this.st_overheatingEffect = true;
        }
    }


    // ********** 
    // FIRE DRAGON
    // ********** 
    export class status_Claw extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "ST_Claw";
            this.duration = 3;
            this.healthPerTurn = -5;
            this.maxStacks = 5;
        }
    }

    export class status_HeatWave extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "ST_HeatWave";
            this.duration = 3;
            this.healthPerTurn = -20;
        }
    }

    export class status_Ignite extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "ST_IGNITE";
            this.duration = 5;

            this.healthPerTurn = -10;
        }
    }


    // ********** 
    // MDRAGON
    // ********** 
    export class status_VenomousBite extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "ST_VenomousBite";
            this.duration = 10;
            this.healthPerTurn = -20;
        }
    }

    export class status_Bind extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "ST_Bind";
            this.duration = 5;
            this.st_bindEffect = 100;
        }
    }

    export class status_EnhancedBind extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "ST_EnhancedBind";
            this.duration = 5;
            this.st_bindEffect = 200;
        }
    }

    export class status_Miasma extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "ST_Miasma";
            this.duration = 100;
            this.healthPerTurn = -1;
            this.maxStacks = 100;
        }
    }

    export class status_Miasmata extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "ST_Miasma";
            this.duration = 100;
            this.healthPerTurn = -1;
            this.maxStacks = 100;
            this.stacks = 2;
        }
    }

    
    // ********** 
    // TDRAGON
    // ********** 
    export class status_Halt extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "ST_Halt";
            this.duration = 5;
            this.st_haltEffect = true;
        }
    }
}