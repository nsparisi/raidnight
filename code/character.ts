class Character 
{
    name: string;

    maxHealth: integer;
    maxMana: integer;
    health: integer;
    mana: integer;

    x: integer;
    y: integer;

    skillset: Array<Skill>;
    
    constructor(name: string, maxHealth: integer, maxMana: integer)
    {
        this.name = name;
        this.maxHealth = maxHealth;
        this.maxMana = maxMana;
    }

    runAI = () =>
    {
        console.log(`My Name is ${this.name}`);
    }
}