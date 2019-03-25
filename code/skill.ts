module RaidNight.Engine
{
    export class Skill 
    {
        power: integer;
        cost: integer;
        castTime: integer;
        name: string;
    }

    export class skill_Fireball extends Skill
    {
        constructor()
        {
            super();
            this.power = 25;
            this.cost = 1;
            this.castTime = 3;
            this.name = "Fireball";
        }
    }
}