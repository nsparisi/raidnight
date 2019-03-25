module RaidNight.Engine
{
    export class Skill 
    {
        power: integer;
        cost: integer;
        castTime: integer;
        name: string;
        targetStatuses: string[] = [];
        selfStatuses: string[] = [];
    }

    export class skill_Fireball extends Skill
    {
        constructor()
        {
            super();
            this.power = 100;
            this.cost = 5;
            this.castTime = 3;
            this.name = "Fireball";
        }
    }

    export class skill_Ignite extends Skill
    {
        constructor()
        {
            super();
            this.power = 0;
            this.cost = 1;
            this.castTime = 1;
            this.name = "Ignite";

            this.targetStatuses = ["Ignite"];
        }
    }

    export class skill_DragonBreath extends Skill
    {
        constructor()
        {
            super();
            this.power = 20;
            this.cost = 0;
            this.castTime = 1;
            this.name = "Dragon Breath";
        }
    }
}