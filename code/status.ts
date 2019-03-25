module RaidNight.Engine
{
    export enum StatusType {Good, Bad}

    export class Status
    {
        type: StatusType;
        duration: integer;
        name: string;

        healthPerTurn: integer = 0;
    }

    export class status_Ignite extends Status
    {
        constructor()
        {
            super();
            
            this.type = StatusType.Bad;
            this.name = "Ignite";
            this.duration = 5;

            this.healthPerTurn = -10;
        }
    }
}