module RaidNight.Engine
{
    export class Character 
    {
        name: string;
        icon: string;

        maxHealth: integer;
        maxMana: integer;
        health: integer;
        mana: integer;
        defense: integer;
        power: integer;
        bindValue: integer;
        isHalted: boolean;

        x: integer;
        y: integer;

        actionList: Action[];
        actionIndex: integer;
        actionsLoop: boolean;

        currentAction: Action;

        castTimeRemaining: integer;
        isCasting: boolean;
        isCastSuccessful: boolean;

        statuses: Status[];

        cooldowns: Map<string, integer> = new Map();
        
        constructor(name: string, icon: string, maxHealth: integer, maxMana: integer, x: integer, y: integer)
        {
            this.name = name;
            this.icon = icon;
            this.maxHealth = maxHealth;
            this.maxMana = maxMana;
            this.health = maxHealth;
            this.mana = maxMana;
            this.x = x;
            this.y = y;
            this.actionList = [];
            this.cooldowns = new Map();
            this.actionsLoop = false;
            this.resetState();
            this.resetBonuses();
        }

        public focusedName()
        {
            return `${this.icon} ${this.name}`;
        }

        public resolveStatus()
        {
            if (this.isDead())
            {
                return;
            }

            this.resetBonuses();

            // process good effects first (like defense)
            this.resolveStatusesOfType(StatusType.Good, PriorityType.High);
            this.resolveStatusesOfType(StatusType.Good, PriorityType.Low);

            // process bad effects last, so they can be protected by defense.
            this.resolveStatusesOfType(StatusType.Bad, PriorityType.High);
            this.resolveStatusesOfType(StatusType.Bad, PriorityType.Low);

            // process damage taken from the floor/room
            this.resolveDamageFromFloorEffects();
        }

        protected resolveDamageFromFloorEffects()
        {
            let damage = GLOBAL_GAME.arena.room.damageFromFloorEffect(this.x, this.y);
            if (damage)
            {
                let source = GLOBAL_GAME.arena.room.logMessageForFloorEffect(this.name);
                this.addHealth(-damage, GLOBAL_GAME.arena.room, source);
            }
        }

        protected resolveStatusesOfType(type: StatusType, priority: PriorityType)
        {
            for(let i = 0; i < this.statuses.length; i++)
            {
                if (this.statuses[i].type != type || this.statuses[i].priority != priority)
                {
                    continue;
                }

                if (this.statuses[i].st_bindEffect > 0)
                {
                    continue;
                }

                this.statuses[i].duration--;

                if (this.statuses[i].duration < 0)
                {
                    Debug.logVerbose(`Status ${this.statuses[i].name} on ${this.name} wore off.`);
                    this.statuses.splice(i, 1);
                    i--;
                    continue;
                }
                
                Debug.logVerbose(`Status ${this.statuses[i].name} is being processed on ${this.name}`);
                let source = GLOBAL_GAME.arena.lookupTarget(this.statuses[i].source);
                this.addHealth(this.statuses[i].healthPerTurn * this.statuses[i].stacks, source, this.statuses[i].name);
                this.addMana(this.statuses[i].manaPerTurn * this.statuses[i].stacks);
                this.addDefense(this.statuses[i].defense * this.statuses[i].stacks);
                this.addPower(this.statuses[i].power * this.statuses[i].stacks);

                // special status HeatingUp
                if (this.statuses[i].st_heatingUpEffect)
                {
                    this.addPower(this.mana);
                    Debug.logCondensed(`${this.name} has ${this.mana} power gained from fervor.`);
                }
                
                // special status Overheating
                if (this.statuses[i].st_overheatingEffect)
                {
                    this.addPower(this.mana);
                    this.addDefense(-this.mana);
                    Debug.logCondensed(`${this.name} has ${this.mana} power gained and ${this.mana} defense reduced by overheating.`);
                }

                if (this.statuses[i].st_haltEffect)
                {
                    this.isHalted = true;
                }
            }
            
            // process bind last, so it's not affected by DoT damage
            for(let i = 0; i < this.statuses.length; i++)
            {
                if (this.statuses[i].type != type || this.statuses[i].priority != priority)
                {
                    continue;
                }

                if (this.statuses[i].st_bindEffect > 0)
                {
                    Debug.logVerbose(`Status ${this.statuses[i].name} is being processed on ${this.name}`);

                    this.statuses[i].duration--;
                    this.addBindValue(this.statuses[i].st_bindEffect)
                    
                    if (this.statuses[i].duration <= 0)
                    {
                        Debug.logVerbose(`Status ${this.statuses[i].name} on ${this.name} wore off.`);
                        this.statuses.splice(i, 1);
                        i--;
                    }
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

            if (this.isHalted)
            {
                Debug.logCondensed(`⌛⌛ ${this.name} is frozen in time! ⌛⌛`);
                return;
            }

            this.castTimeRemaining--;

            // check current action
            if (this.isCasting && this.castTimeRemaining > 0)
            {
                Debug.logCondensed(`${this.focusedName()} continues to cast ${this.currentAction.skill}.`);
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

        public addHealth(health: integer, source: Character, sourceSkillName: string)
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

                health = Math.min(0, original + blocked + empowered);

                // Priest took -100 total damage from Dragon. 100 (20) [20] (20 def) [20 pow]
                Debug.logCondensed(`${this.name} took ${health} damage from ${source.name}'s ${sourceSkillName}. ${original} (${blocked}) [${empowered}] (${this.defense} def) [${source.power} pow]`);

                // Damage the vines - ignore defense
                this.addBindValue(original + empowered);
            }
            else if(health > 0)
            {
                let original = health;
                let empowered = health * source.power / 100;
                
                health = Math.max(0, original + empowered);

                // Knight healed for 100 total health from Priest. 100 [20] [20 pow]
                let log = `${this.name} healed ${health} damage from ${source.name}'s ${sourceSkillName}.`;
                if(source.power != 0){log += ` ${original} [${empowered}] [${source.power} pow]`;}
                Debug.logCondensed(log);
            }

            this.health = Math.max(0, this.health + health);
            this.health = Math.min(this.maxHealth, this.health);

            if(this.health <= 0)
            {
                Debug.logDeath(this.name);
            }
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
                    status.stacks = Math.min(status.maxStacks, this.statuses[i].stacks + status.stacks);
                    this.statuses[i] = status;
                    alreadyApplied = true;
                    Debug.logVerbose(`Refreshing status ${status.name} on ${this.name}`);
                }
            }

            // apply as a new status
            if(!alreadyApplied)
            {
                this.statuses.push(status);
                
                if(status.defense != 0)
                {
                    Debug.logCondensed(`${this.name} has ${status.defense > 0 ? "gained" : "lost"} ${status.defense} defense.`);
                    this.defense += status.defense;
                }
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
            if (this.actionIndex >= this.actionList.length)
            {
                this.currentAction = new action_Wait();
                return;
            }

            this.currentAction = this.actionList[this.actionIndex];
            this.actionIndex++;

            if (this.actionsLoop)
            {
                this.actionIndex = this.actionIndex % this.actionList.length;
            }
        }
        
        reverseActions()
        {
            // Reverse expects that the last action taken will happen again
            // A->B reverse B->A
            //
            // 0 1 2 3 4 5 6 7 8 9
            // ^ ^
            // Last action taken was '0', but actionIndex is set to 1.
            //
            // 9 8 7 6 5 4 3 2 1 0
            //                   ^
            // So, place actionIndex at 0.
            let clone = this.actionList.slice(0);
            this.actionList = clone.reverse(); // this is to prevent a new game from retaining the reversed values
            this.actionIndex = this.actionList.length - this.actionIndex;
        }

        protected doMove()
        {
            let x = this.currentAction.x
            let y = this.currentAction.y

            if (GLOBAL_GAME.arena.room.isWalkable(this.x + x, this.y + y))
            {
                this.x += x;
                this.y += y;
                Debug.logCondensed(`${this.focusedName()} moved to ${this.x},${this.y}`);
            }
            else 
            {
                Debug.logCondensed(`${this.focusedName()} was unable to move to ${this.x + x},${this.y + y}`);
            }

            this.castTimeRemaining = 0;
            this.isCasting = false;
        }

        protected doWait()
        {
            this.castTimeRemaining = 0;
            this.isCasting = false;

            if (this.name.toUpperCase().indexOf("SANDPRISM") < 0)
            {
                Debug.logCondensed(`${this.focusedName()} chose to wait.`);
            }
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
            if (skill.cremate)
            {
                this.currentAction.targetType = TargetType.Area;
                this.currentAction.area = new Area(0, this.y - 1, this.x - 1, this.y + 1);
            }

            if (this.mana + skill.mana < 0)
            {
                Debug.logCondensed(`${this.focusedName()} has not enough mana to cast ${skill.name}`);
                this.isCastSuccessful = false;
                return;
            }
            
            if (this.bindValue > 0)
            {
                Debug.logCondensed(`${this.focusedName()} is bound by vines and cannot use ${skill.name}!`);
                this.isCastSuccessful = false;
                return;
            }

            if (this.safeGetCooldown(skill.name) > 0)
            {
                Debug.logCondensed(`${this.focusedName()} failed to cast ${skill.name} because it is on cooldown.`);
                this.isCastSuccessful = false;
                return;
            }

            this.castTimeRemaining = skill.castTime - 1;
            this.isCasting = true;
            this.cooldowns.set(skill.name, skill.cooldown);

            if (skill.castTime > 1)
            {
                Debug.logCondensed(`${this.focusedName()} started cast of ${skill.name}.`);
            }
        }

        protected finishSkill()
        {
            // pre-skill validation
            let skill = GLOBAL_GAME.library.lookupSkill(this.currentAction.skill);
            if (this.mana + skill.mana < 0)
            {
                Debug.logCondensed(`${this.focusedName()} could not finalize cast of ${skill.name} because they ran out of mana.`);
                this.isCastSuccessful = false;
                return;
            }
            
            if (this.bindValue > 0)
            {
                Debug.logCondensed(`${this.focusedName()} could not finalize cast of ${skill.name} because they are bound by vines!`);
                this.isCastSuccessful = false;
                return;
            }

            // spend mana
            this.addMana(skill.mana);

            if (skill.useAllMana)
            {
                this.addMana(-this.mana);
            }

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

            // log handling for "Source -> Target(s)"
            let targetNames = [];
            targets.forEach((t)=>{if(t.name.toUpperCase().indexOf("SANDPRISM") < 0){targetNames.push(t.name)}});
            if(targetNames.length > 0)
            {
                Debug.logCondensed(`${this.focusedName()} used ${skill.name} on ${targetNames.join(", ")}`);
            }
            else 
            {
                Debug.logCondensed(`${this.focusedName()} used ${skill.name}.`);
            }

            // cast on multiple targets
            for (let i = 0; i < targets.length; i++)
            {
                let target = targets[i];

                target.addHealth(skill.health, this, skill.name);

                for (let j = 0; j < skill.targetStatuses.length; j++)
                {
                    Debug.logVerbose(`${this.name} applied status ${skill.targetStatuses[j]} to ${target.name}`);
                    target.addStatus(skill.targetStatuses[j], this.name);
                }

                // special effect for time abilities
                if (skill.fastforwardValue != 0)
                {
                    target.fastforwardByTime(skill.fastforwardValue);
                }
            }

            // apply statues to self
            for (let i = 0; i < skill.selfStatuses.length; i++)
            {
                Debug.logVerbose(`${this.name} applied status ${skill.selfStatuses[i]} to self.`);
                this.addStatus(skill.selfStatuses[i], this.name);
            }
            
            // hurt self if applicable
            if (skill.selfHealth != 0)
            {
                this.addHealth(skill.selfHealth, this, skill.name);
            }
            
            // post-skill wrap up
            this.castTimeRemaining = 0;
            this.isCasting = false;
            this.isCastSuccessful = true;
            // Debug.log(`${this.name} finished cast of ${skill.name}.`);
        }

        protected fastforwardByTime(time: integer)
        {
            this.actionIndex = Math.min(Math.max(this.actionIndex + time, 0), this.actionList.length);
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
            Debug.logVerbose(`${this.name} is consuming ${stacks} stacks of ICE SHARD for ${skill.health} total damage.`);
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
            this.bindValue = 0;
            this.isHalted = false;
        }

        protected addDefense(defense: integer)
        {
            this.defense += defense;
        }

        protected addPower(power: integer)
        {
            this.power += power;
        }

        protected addBindValue(bind: integer)
        {
            if (bind > 0)
            {
                this.bindValue += bind;
            }
            else if (this.bindValue > 0)
            {
                this.bindValue += bind;
                this.bindValue = Math.max(0, this.bindValue);
                Debug.logCondensed(`${this.name}'s bind effect was reduced by ${bind}. Total bind left: ${this.bindValue}.`);

                for (let i = 0; i < this.statuses.length; i++)
                {
                    if (this.statuses[i].st_bindEffect > 0)
                    {
                        this.statuses[i].st_bindEffect = this.bindValue;
                        if (this.bindValue == 0)
                        {
                            Debug.logCondensed(`${this.name}'s bind effect wore off!`);
                            this.statuses.splice(i, 1);
                            i--;
                        }
                    }
                }
                
            }
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

        constructor(name: string, icon: string, maxHealth: integer, maxMana: integer, x: integer, y: integer)
        { 
            super(name, icon, maxHealth, maxMana, x, y); 
            this.actionsLoop = true;
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

    export class TimeDragon extends Boss
    {
        phase2: boolean = false;

        grabNewAction ()
        {
            super.grabNewAction();
        }

        finishSkill()
        {
            let skill = GLOBAL_GAME.library.lookupSkill(this.currentAction.skill);
            if (skill.name.toUpperCase() == "SANDPRISM")
            {
                this.currentAction.targets.forEach((target) => {
                    let prism = GLOBAL_GAME.arena.lookupTarget(target) as SandPrism;
                    prism.makeVisibile();
                })
            }

            super.finishSkill();
            
            if (!this.phase2 && GLOBAL_GAME.arena.enemies[0].health <= GLOBAL_GAME.arena.enemies[0].maxHealth / 3)
            //if (!this.phase2 && GLOBAL_GAME.arena.turn == 2)
            {
                this.phase2 = true;
                GLOBAL_GAME.arena.allies.forEach((ally)=>ally.reverseActions());

                Debug.logCondensed("⌛⌛ TIMEDRAGON is reversing time! ⌛⌛");
                GLOBAL_GAME.startText("TIMEDRAGON is reversing time!");
            }
        }
    }

    export class CorpseFlower extends Boss
    {
        phase2: boolean = false;

        grabNewAction ()
        {
            // when devilvine dies
            if (!this.phase2 && GLOBAL_GAME.arena.enemies[1].health <= 0)
            //if (!this.phase2 && GLOBAL_GAME.arena.turn == 100)
            {
                this.phase2 = true;
                this.actionList = [];
                this.actionList.push(new action_Skill("Miasmata", ["knight", "priest", "wizard"]));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Wait());

                Debug.logCondensed("🌿🌿 CORPSEFLOWER grows stronger! 🌿🌿");
                GLOBAL_GAME.startText("CORPSEFLOWER grows stronger!");
            }

            super.grabNewAction();
        }
    }

    export class DevilVine extends Boss
    {
        phase2: boolean = false;

        grabNewAction ()
        {
            // when corpseflower dies
            if (!this.phase2 && GLOBAL_GAME.arena.enemies[2].health <= 0)
            //if (!this.phase2 && GLOBAL_GAME.arena.turn == 5)
            {
                this.phase2 = true;
                this.actionList = [];                
                this.actionList.push(new action_Skill("EnhancedWhip", ["knight"]));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Skill("EnhancedWhip", ["knight"]));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Skill("EnhancedWhip", ["knight"]));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Skill("EnhancedWhip", ["knight"]));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Skill("EnhancedWhip", ["knight"]));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Skill("EnhancedWhip", ["knight"]));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Skill("EnhancedWhip", ["knight"]));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Skill("EnhancedWhip", ["knight"]));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Skill("EnhancedWhip", ["knight"]));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_Skill("EnhancedWhip", ["knight"]));
                this.actionList.push(new action_Skill("EnhancedBind", ["knight"]));

                Debug.logCondensed("🌿🌿 DEVILVINE grows stronger! 🌿🌿");
                GLOBAL_GAME.startText("DEVILVINE grows stronger!");
            }

            super.grabNewAction();
        }
    }

    export class SandPrism extends Character
    {
        visible: boolean = false;
        totalLifespan: integer = 3;
        currentLifespan: integer = 0;

        constructor(name: string, icon: string, maxHealth: integer, maxMana: integer, x: integer, y: integer)
        { 
            super(name, icon, maxHealth, maxMana, x, y); 
            this.actionsLoop = true;
        }

        grabNewAction()
        {
            if (this.currentLifespan == 0)
            {
                this.visible = false;
            }
            this.currentLifespan --;

            if (!this.visible)
            {
                this.actionIndex = 0;
            }

            super.grabNewAction();
            
            if (!this.visible)
            {
                this.actionIndex = 0;
            }
        }

        makeVisibile()
        {
            this.visible = true;
            this.currentLifespan = this.totalLifespan;
        }

        addHealth(health: integer, source: Character, sourceSkillName: string)
        {
            // do nothing
        }
    }
}