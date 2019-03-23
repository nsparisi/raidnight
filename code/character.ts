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

    actionList: Action[];
    actionIndex: integer;
    
    constructor(name: string, maxHealth: integer, maxMana: integer, x: integer, y: integer)
    {
        this.name = name;
        this.maxHealth = maxHealth;
        this.maxMana = maxMana;
        this.health = maxHealth;
        this.mana = maxMana;
        this.actionIndex = 0;
        this.x = x;
        this.y = y;
    }

    runAI = () =>
    {
        let action = this.actionList[this.actionIndex];
        this.actionIndex = (this.actionIndex + 1) % this.actionList.length;
        if (action.type == ActionType.Move)
        {
            this.doMove(action.x, action.y);
        }
        else if(action.type == ActionType.Skill)
        {
            this.doSkill(this.lookupSkill(action.skill), this.lookupTarget(action.target));
        }
        else 
        {
            console.log(`ERROR: action type not recognized.`);
        }
    }
    
    doMove = (x: integer, y: integer) =>
    {
        this.x = Math.min(GLOBAL_GAME.arena.board.width, this.x + x);
        this.y = Math.min(GLOBAL_GAME.arena.board.height, this.y + y);

        this.x = Math.max(0, this.x);
        this.y = Math.max(0, this.y);

        console.log(`${this.name} moved to ${this.x},${this.y}`);
    }

    doSkill = (skill: Skill, target: Character) =>
    {
        if(this.mana < skill.cost)
        {
            console.log(`${this.name} has not enough mana to cast ${skill.name}`);
            return;
        }

        target.health = Math.max(0, target.health - skill.power);
        this.mana = Math.max(0, this.mana - skill.cost);
        
        console.log(`${this.name} cast ${skill.name} on ${target.name}`);
    }
    
    lookupSkill = (skillName: string) =>
    {
        let i = 0;
        for(i = 0; i < this.skillset.length; i++)
        {
            if (this.skillset[i].name.toUpperCase() == skillName.toUpperCase())
            {
                return this.skillset[i];
            }
        }

        console.log(`ERROR: Lookup skill failed ${skillName}`);
        return null;
    }

    lookupTarget = (targetName: string) =>
    {
        let i = 0;
        for(i = 0; i < GLOBAL_GAME.arena.enemies.length; i++)
        {
            if (GLOBAL_GAME.arena.enemies[i].name.toUpperCase() == targetName.toUpperCase())
            {
                return GLOBAL_GAME.arena.enemies[i];
            }
        }

        for(i = 0; i < GLOBAL_GAME.arena.allies.length; i++)
        {
            if (GLOBAL_GAME.arena.allies[i].name.toUpperCase() == targetName.toUpperCase())
            {
                return GLOBAL_GAME.arena.allies[i];
            }
        }

        console.log(`ERROR: Lookup target failed ${targetName}`);
        return null;
    }
}