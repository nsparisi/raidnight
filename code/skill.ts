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
    }

    export class skill_Fireball extends Skill
    {
        constructor()
        {
            super();
            this.health = -100;
            this.mana = -5;
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
            this.mana = -1;
            this.castTime = 1;
            this.name = "Ignite";

            this.targetStatuses = ["ST_IGNITE"];
        }
    }

    export class skill_Meditate extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = 50;
            this.castTime = 2;
            this.name = "Meditate";
            this.selfOnly = true;

        }
    }

    export class skill_Strike extends Skill
    {
        constructor()
        {
            super();
            this.health = -20;
            this.mana = -50;
            this.castTime = 1;
            this.name = "Strike";
        }
    }
    
    export class skill_Fortify extends Skill
    {
        constructor()
        {
            super();
            this.health = 0;
            this.mana = 75;
            this.castTime = 1;
            this.name = "Fortify";
            this.selfOnly = true;
            this.selfStatuses = ["ST_FORTIFY"];
        }
    }

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

    export class skill_DragonBreath extends Skill
    {
        constructor()
        {
            super();
            this.health = -20;
            this.mana = 0;
            this.castTime = 1;
            this.name = "DragonBreath";
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

    export class skill_Heal extends Skill
    {
        constructor()
        {
            super();
            this.health = 50;
            this.mana = -1;
            this.castTime = 2;
            this.name = "Heal";
        }
    }
}