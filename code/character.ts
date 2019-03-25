module RaidNight.Engine
{
    export class Character 
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

        currentAction: Action;

        castTimeRemaining: integer;
        isCasting: boolean;

        
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
            this.castTimeRemaining--;

            // check current action
            if (this.isCasting && this.castTimeRemaining > 0)
            {
                return;
            }
            
            // prepare new action
            else if (!this.isCasting)
            {
                this.grabNewAction();

                if (this.currentAction.type == ActionType.Move)
                {
                    this.doMove();
                }
                else if (this.currentAction.type == ActionType.Skill)
                {
                    this.startSkill();
                }
            }

            // finalize action
            if (this.isCasting && this.castTimeRemaining == 0)
            {
                this.finishSkill();
            }
        }

        grabNewAction = () =>
        {
            this.currentAction = this.actionList[this.actionIndex];
            this.actionIndex = (this.actionIndex + 1) % this.actionList.length;
        }
        
        doMove = () =>
        {
            let x = this.currentAction.x
            let y = this.currentAction.y

            this.x = Math.min(GLOBAL_GAME.arena.board.width, this.x + x);
            this.y = Math.min(GLOBAL_GAME.arena.board.height, this.y + y);

            this.x = Math.max(0, this.x);
            this.y = Math.max(0, this.y);

            this.castTimeRemaining = 0;
            this.isCasting = false;

            console.log(`${this.name} moved to ${this.x},${this.y}`);
        }

        startSkill = () =>
        {
            let skill = this.lookupSkill(this.currentAction.skill);
            let target = GLOBAL_GAME.arena.lookupTarget(this.currentAction.target);

            if (this.mana < skill.cost)
            {
                console.log(`${this.name} has not enough mana to cast ${skill.name}`);
                return;
            }

            this.castTimeRemaining = skill.castTime - 1;
            this.isCasting = true;

            console.log(`${this.name} started cast of ${skill.name} on ${target.name}`);
        }

        finishSkill = () =>
        {
            let skill = this.lookupSkill(this.currentAction.skill);
            let target = GLOBAL_GAME.arena.lookupTarget(this.currentAction.target);

            if (this.mana < skill.cost)
            {
                console.log(`${this.name} could not finalize cast of ${skill.name} because they ran out of mana.`);
                return;
            }

            target.health = Math.max(0, target.health - skill.power);
            this.mana = Math.max(0, this.mana - skill.cost);
            
            this.castTimeRemaining = 0;
            this.isCasting = false;

            console.log(`${this.name} finished cast of ${skill.name} on ${target.name}`);
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
    }
}