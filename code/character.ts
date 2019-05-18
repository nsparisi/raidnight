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
        power: integer;

        x: integer;
        y: integer;

        actionList: Action[];
        actionIndex: integer;

        currentAction: Action;

        castTimeRemaining: integer;
        isCasting: boolean;
        isCastSuccessful: boolean;

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
            this.resetBonuses();
        }

        public resolveStatus()
        {
            if (this.isDead())
            {
                return;
            }

            this.resetBonuses();

            // process good effects first (like defense)
            this.resolveStatusesOfType(StatusType.Good);

            // process bad effects last, so they can be protected by defense.
            this.resolveStatusesOfType(StatusType.Bad);
        }

        protected resolveStatusesOfType(type: StatusType)
        {
            for(let i = 0; i < this.statuses.length; i++)
            {
                if (this.statuses[i].type != type)
                {
                    continue;
                }

                console.log(`Status ${this.statuses[i].name} is being processed on ${this.name}`);
                this.statuses[i].duration--;
                
                let source = GLOBAL_GAME.arena.lookupTarget(this.statuses[i].source);
                this.addHealth(this.statuses[i].healthPerTurn * this.statuses[i].stacks, source);
                this.addDefense(this.statuses[i].defense * this.statuses[i].stacks);
                this.addPower(this.statuses[i].power * this.statuses[i].stacks);

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

        public addHealth(health: integer, source: Character)
        {
            if (this.isDead())
            {
                return;
            }

            if (health < 0)
            {
                let original = health;
                let blocked = health * -this.defense / 100;
                let empowered = health * source.power / 100;

                health = Math.min(0, health + blocked + empowered);

                // Priest took -100 total damage. 100 (0) [0] (20 def) [20 pow]
                console.log(`${this.name} took ${health} total damage from ${source.name}. ${original} (${blocked}) [${empowered}] (${this.defense} def) (${source.power} pow)`);
            }

            this.health = Math.max(0, this.health + health);
            this.health = Math.min(this.maxHealth, this.health);
        }

        public addStatus(statusToAdd: string, source: string)
        {
            let status = GLOBAL_GAME.library.instantiateStatus(statusToAdd, source);
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
            this.isCastSuccessful = false;
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

            if (GLOBAL_GAME.arena.room.isWalkable(this.x + x, this.y + y))
            {
                this.x += x;
                this.y += y;
                console.log(`${this.name} moved to ${this.x},${this.y}`);
            }
            else 
            {
                console.log(`${this.name} was unable to move to ${this.x + x},${this.y + y}`);
            }

            this.castTimeRemaining = 0;
            this.isCasting = false;
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
                this.isCastSuccessful = false;
                return;
            }

            if (this.safeGetCooldown(skill.name) > 0)
            {
                console.log(`${this.name} failed to cast ${skill.name} because it is on cooldown.`);
                this.isCastSuccessful = false;
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
                this.isCastSuccessful = false;
                return;
            }

            // spend mana
            this.addMana(skill.mana);

            // calculate targets
            let targets = new Array<Character>();
            if (this.currentAction.targetType == TargetType.Area)
            {
                targets = GLOBAL_GAME.arena.findAllTargetsInArea(this.currentAction.area);
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
                target.addHealth(skill.health, this);

                for (let j = 0; j < skill.targetStatuses.length; j++)
                {
                    console.log(`${this.name} applied status ${skill.targetStatuses[j]} to ${target.name}`);
                    target.addStatus(skill.targetStatuses[j], this.name);
                }
            }

            // apply statues to self
            for (let i = 0; i < skill.selfStatuses.length; i++)
            {
                console.log(`${this.name} applied status ${skill.selfStatuses[i]} to self.`);
                this.addStatus(skill.selfStatuses[i], this.name);
            }
            
            // post-skill wrap up
            this.castTimeRemaining = 0;
            this.isCasting = false;
            this.isCastSuccessful = true;
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

        protected resetBonuses()
        {
            this.defense = 0;
            this.power = 0;
        }

        protected addDefense(defense: integer)
        {
            this.defense += defense;
        }

        protected addPower(power: integer)
        {
            this.power += power;
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
        untauntOrder = ["Wizard", "Priest", "Knight"];

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