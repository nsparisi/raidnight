class Skill 
{
    power: integer;
    cost: integer;
    castTime: integer;
    name: string;
}

class skill_Fireball extends Skill
{
    constructor()
    {
        super();
        this.power = 25;
        this.cost = 1;
        this.castTime = 1;
        this.name = "Fireball";
    }
}