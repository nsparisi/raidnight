module RaidNight.Engine
{
    export class Skill 
    {
        health: integer = 0;
        cost: integer = 0;
        castTime: integer = 1;
        name: string;
        targetStatuses: string[] = [];
        selfStatuses: string[] = [];
    }

    export class skill_Fireball extends Skill
    {
        constructor()
        {
            super();
            this.health = -100;
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
            this.health = 0;
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
            this.health = -20;
            this.cost = 0;
            this.castTime = 1;
            this.name = "Dragon Breath";
        }
    }

    export class skill_Heal extends Skill
    {
        constructor()
        {
            super();
            this.health = 50;
            this.cost = 1;
            this.castTime = 2;
            this.name = "Heal";
        }
    }
}