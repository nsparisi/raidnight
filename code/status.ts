module RaidNight.Engine
{
    export enum StatusType {Good, Bad}

    export class Status
    {
        type: StatusType;
        duration: integer;
        name: string;

        healthPerTurn: integer = 0;
        defense: integer = 0;
        taunt: boolean = false;
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

    export class status_Fortify extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Good;
            this.name = "ST_Fortify";
            this.duration = 5;
            this.defense = 5;
        }
    }

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

    export class status_HeatWave extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "ST_HEATWAVE";
            this.duration = 3;
            this.healthPerTurn = -15;
        }
    }
}