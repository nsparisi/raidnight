module RaidNight.Engine
{
    export class Character 
    {
        name: string;

        maxHealth: integer;
        maxMana: integer;
        health: integer;
        mana: integer;
        defense: integer;

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
            this.x = x;
            this.y = y;
            this.actionList = [];
            this.resetState();
        }

        public resolveStatus()
        {
            if (this.isDead())
            {
                return;
            }

            this.resetDefense();

            let i = 0;
            for(i = 0; i < this.statuses.length; i++)
            {
                this.statuses[i].duration--;
                this.addHealth(this.statuses[i].healthPerTurn);
                this.addDefense(this.statuses[i].defense);

                console.log(`Status ${this.statuses[i].name} has been processed on ${this.name}`);
                if (this.statuses[i].duration <= 0)
                {
                    console.log(`Status ${this.statuses[i].name} on ${this.name} wore off.`);
                    this.statuses.splice(i, 1);
                    i--;
                }
            }
        }

        public runAI()
        {
            if (this.isDead())
            {
                this.resetState();
                return;
            }

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

        public isDead()
        {
            return this.health <= 0;
        }

        protected resetState()
        {
            this.castTimeRemaining = 0;
            this.isCasting = false;
            this.actionIndex = 0;
            this.statuses = [];
        }

        protected grabNewAction()
        {
            this.currentAction = this.actionList[this.actionIndex];
            this.actionIndex = (this.actionIndex + 1) % this.actionList.length;
        }
        
        protected doMove()
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

        protected startSkill()
        {
            let skill = GLOBAL_GAME.library.lookupSkill(this.currentAction.skill);
            if (skill.selfOnly)
            {
                this.currentAction.targets = [this.name];
            }

            if (this.mana + skill.mana < 0)
            {
                console.log(`${this.name} has not enough mana to cast ${skill.name}`);
                return;
            }

            this.castTimeRemaining = skill.castTime - 1;
            this.isCasting = true;

            console.log(`${this.name} started cast of ${skill.name} on ${this.currentAction.targets}`);
        }

        protected finishSkill()
        {
            // pre-skill validation
            let skill = GLOBAL_GAME.library.lookupSkill(this.currentAction.skill);
            if (this.mana + skill.mana < 0)
            {
                console.log(`${this.name} could not finalize cast of ${skill.name} because they ran out of mana.`);
                return;
            }

            // spend mana
            this.addMana(skill.mana);

            // cast on multiple targets
            for(let j = 0; j < this.currentAction.targets.length; j++)
            {
                let target = GLOBAL_GAME.arena.lookupTarget(this.currentAction.targets[j]);

                target.addHealth(skill.health);
                for (let i = 0; i < skill.targetStatuses.length; i++)
                {
                    console.log(`${this.name} applied status ${skill.targetStatuses[i]} to ${target.name}`);
                    target.addStatus(skill.targetStatuses[i]);
                }
            }

            // apply statues to self
            for (let i = 0; i < skill.selfStatuses.length; i++)
            {
                console.log(`${this.name} applied status ${skill.selfStatuses[i]} to self.`);
                this.addStatus(skill.selfStatuses[i]);
            }
            
            // post-skill wrap up
            this.castTimeRemaining = 0;
            this.isCasting = false;
            console.log(`${this.name} finished cast of ${skill.name} on ${this.currentAction.targets}`);
        }

        protected addHealth(healthToAdd: integer)
        {
            if (this.isDead())
            {
                return;
            }

            if (healthToAdd < 0)
            {
                healthToAdd += this.defense;
            }

            this.health = Math.max(0, this.health + healthToAdd);
            this.health = Math.min(this.maxHealth, this.health);
        }

        protected addMana(manaToAdd: integer)
        {
            if (this.isDead())
            {
                return;
            }

            this.mana = Math.max(0, this.mana + manaToAdd);
            this.mana = Math.min(this.maxMana, this.mana);
        }

        protected resetDefense()
        {
            this.defense = 0;
        }

        protected addDefense(defense: integer)
        {
            this.defense += defense
        }

        protected addStatus(statusToAdd: string)
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

    export class Boss extends Character
    {
        isTaunted: boolean = false;
        tauntOrder = ["Warrior", "Priest", "Wizard"];
        untauntOrder = ["Priest", "Wizard", "Warrior"];

        constructor(name: string, maxHealth: integer, maxMana: integer, x: integer, y: integer)
        { 
            super(name, maxHealth, maxMana, x, y); 

            this.addStatus("ST_TAUNT");
        }

        grabNewAction ()
        {
            super.grabNewAction();
            
            // for single-target actions, attack the taunted target.
            if (this.currentAction.targets.length == 1)
            {
                if (this.isTaunted)
                {
                    this.currentAction.targets = [this.getNextTarget(this.tauntOrder).name];
                } 
                else 
                {
                    this.currentAction.targets = [this.getNextTarget(this.untauntOrder).name];
                }
            }
        }

        getNextTarget(order: Array<string>)
        {
            for(let i = 0; i < order.length; i++)
            {
                let target = GLOBAL_GAME.arena.lookupTarget(order[i]);
                if (!target.isDead())
                {
                    return target;
                }
            }

            // default to warrior
            return GLOBAL_GAME.arena.lookupTarget("Warrior");
        }

        resolveStatus = () =>
        { 
            this.resetTauntStatus();

            for(let i = 0; i < this.statuses.length; i++)
            {
                if (this.statuses[i].taunt)
                {
                    this.addTauntStatus();
                }
            }

            // must come last, as effects are processed first then spliced out.
            super.resolveStatus();
        }
        
        addTauntStatus()
        {
            this.isTaunted = true;
        }

        resetTauntStatus()
        {
            this.isTaunted = false;
        }
    }
}