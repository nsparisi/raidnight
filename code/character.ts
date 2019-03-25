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

        statuses: Status[];
        
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
            this.statuses = [];
        }

        resolveStatus = () =>
        {
            let i = 0;
            for(i = 0; i < this.statuses.length; i++)
            {
                this.statuses[i].duration--;
                this.addHealth(this.statuses[i].healthPerTurn);

                console.log(`Status ${this.statuses[i].name} has been processed on ${this.name}`);
                if (this.statuses[i].duration <= 0)
                {
                    console.log(`Status ${this.statuses[i].name} on ${this.name} wore off.`);
                    this.statuses.splice(i, 1);
                    i--;
                }
            }
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
            let skill = GLOBAL_GAME.library.lookupSkill(this.currentAction.skill);
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
            // pre-skill validation
            let i = 0;
            let skill = GLOBAL_GAME.library.lookupSkill(this.currentAction.skill);
            let target = GLOBAL_GAME.arena.lookupTarget(this.currentAction.target);
            if (this.mana < skill.cost)
            {
                console.log(`${this.name} could not finalize cast of ${skill.name} because they ran out of mana.`);
                return;
            }

            // core skill logic
            target.addHealth(skill.health);
            this.addMana(-1 * skill.cost);

            for (i = 0; i < skill.targetStatuses.length; i++)
            {
                console.log(`${this.name} applied status ${skill.targetStatuses[i]} to ${target.name}`);
                target.addStatus(skill.targetStatuses[i]);
            }

            for (i = 0; i < skill.selfStatuses.length; i++)
            {
                console.log(`${this.name} applied status ${skill.selfStatuses[i]} to self.`);
                this.addStatus(skill.selfStatuses[i]);
            }
            
            // post-skill wrap up
            this.castTimeRemaining = 0;
            this.isCasting = false;
            console.log(`${this.name} finished cast of ${skill.name} on ${target.name}`);
        }

        addHealth = (healthToAdd: integer) =>
        {
            this.health = Math.max(0, this.health + healthToAdd);
            this.health = Math.min(this.maxHealth, this.health);
        }

        addMana = (manaToAdd: integer) =>
        {
            this.mana = Math.max(0, this.mana + manaToAdd);
            this.mana = Math.min(this.maxMana, this.mana);
        }

        addStatus = (statusToAdd: string) =>
        {
            let status = GLOBAL_GAME.library.instantiateStatus(statusToAdd);
            if(status == null)
            {
                return;
            }

            // refresh existing status
            let i = 0;
            let alreadyApplied = false;
            for(i = 0; i < this.statuses.length; i++)
            {
                if (this.statuses[i].name.toUpperCase() == status.name.toUpperCase())
                {
                    this.statuses[i] = status;
                    alreadyApplied = true;
                    console.log(`Refreshing status ${status.name} on ${this.name}`);
                }
            }

            // apply as a new status
            if(!alreadyApplied)
            {
                this.statuses.push(status);
            }
        }
    }
}