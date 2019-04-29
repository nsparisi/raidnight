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

        actionList: Action[];
        actionIndex: integer;

        currentAction: Action;

        castTimeRemaining: integer;
        isCasting: boolean;

        statuses: Status[];

        cooldowns: Map<string, integer> = new Map();
        
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
            this.cooldowns = new Map();
            this.resetState();
            this.resetDefense();
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
                this.addHealth(this.statuses[i].healthPerTurn * this.statuses[i].stacks);
                this.addDefense(this.statuses[i].defense * this.statuses[i].stacks);

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
            // cds should always update
            this.updateCooldowns();

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
                else if(this.currentAction.type == ActionType.Wait)
                {
                    this.doWait();
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

        public addHealth(healthToAdd: integer)
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

        public addStatus(statusToAdd: string)
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
                    status.stacks = Math.min(status.maxStacks, this.statuses[i].stacks + 1);
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

        public safeGetCooldown(key: string)
        {
            if (this.cooldowns.has(key))
            {
                return this.cooldowns.get(key);
            }

            return 0;
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

            this.x = Math.min(GLOBAL_GAME.arena.room.width - 1, this.x + x);
            this.y = Math.min(GLOBAL_GAME.arena.room.height - 1, this.y + y);

            this.x = Math.max(0, this.x);
            this.y = Math.max(0, this.y);

            this.castTimeRemaining = 0;
            this.isCasting = false;

            console.log(`${this.name} moved to ${this.x},${this.y}`);
        }

        protected doWait()
        {
            this.castTimeRemaining = 0;
            this.isCasting = false;
            console.log(`${this.name} chose to wait.`);
        }

        protected startSkill()
        {
            let skill = GLOBAL_GAME.library.lookupSkill(this.currentAction.skill);
            if (skill.selfOnly)
            {
                this.currentAction.targets = [this.name];
            }
            if (skill.allAllies)
            {
                this.currentAction.targets = GLOBAL_GAME.arena.allies.map(({name}) => name);
            }

            if (this.mana + skill.mana < 0)
            {
                console.log(`${this.name} has not enough mana to cast ${skill.name}`);
                return;
            }

            if (this.safeGetCooldown(skill.name) > 0)
            {
                console.log(`${this.name} failed to cast ${skill.name} because it is on cooldown.`);
                return;
            }

            this.castTimeRemaining = skill.castTime - 1;
            this.isCasting = true;
            this.cooldowns.set(skill.name, skill.cooldown);

            console.log(`${this.name} started cast of ${skill.name}.`);
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

            // calculate targets
            let targets = new Array<Character>();
            if (this.currentAction.targetType == TargetType.Area)
            {
                // caution:: only allies can get hit by AOE at this time
                targets = GLOBAL_GAME.arena.findAlliesInArea(this.currentAction.area);
            }
            else if (this.currentAction.targetType == TargetType.Character)
            {
                for (let i = 0; i < this.currentAction.targets.length; i++)
                {
                    targets.push(GLOBAL_GAME.arena.lookupTarget(this.currentAction.targets[i]));
                }
            }

            // special attack of ice wizard
            this.countIceShardStacksAndConsumeStatus(skill);

            // cast on multiple targets
            for(let i = 0; i < targets.length; i++)
            {
                let target = targets[i];

                console.log(`${this.name} used ${skill.name} on ${target.name}`);
                target.addHealth(skill.health);

                for (let j = 0; j < skill.targetStatuses.length; j++)
                {
                    console.log(`${this.name} applied status ${skill.targetStatuses[j]} to ${target.name}`);
                    target.addStatus(skill.targetStatuses[j]);
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
            console.log(`${this.name} finished cast of ${skill.name}.`);
        }

        protected countIceShardStacksAndConsumeStatus(skill: Skill)
        {
            if (skill.healthPerIceShard == 0)
            {
                return;
            }

            let stacks = 0;
            for(let i = 0; i < this.statuses.length; i++)
            {
                if (this.statuses[i].name.toUpperCase() == "ST_ICESHARD")
                {
                    stacks = this.statuses[i].stacks;
                    this.statuses.splice(i, 1);
                    i--;
                }
            }

            skill.health = skill.healthPerIceShard * stacks;
            console.log(`${this.name} is consuming ${stacks} stacks of ICE SHARD for ${skill.health} total damage.`);
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

        protected updateCooldowns()
        {
            for (let key of this.cooldowns.keys())
            {
                let newVal = Math.max(0, this.cooldowns.get(key)-1);
                this.cooldowns.set(key, newVal);
            }
        }
    }

    export class Boss extends Character
    {
        isTaunted: boolean = false;
        tauntOrder = ["Knight", "Priest", "Wizard"];
        untauntOrder = ["Priest", "Wizard", "Knight"];

        constructor(name: string, maxHealth: integer, maxMana: integer, x: integer, y: integer)
        { 
            super(name, maxHealth, maxMana, x, y); 
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

            // default to Knight
            return GLOBAL_GAME.arena.lookupTarget("Knight");
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