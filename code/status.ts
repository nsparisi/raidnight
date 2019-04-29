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
        defense: integer = 0; // TODO
        power: integer = 0; // TODO
        taunt: boolean = false;
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
            this.duration = 10;
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
            this.defense = 20;
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
            this.healthPerTurn = -5;
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
            this.defense = -20;
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
            this.duration = 3;
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
}