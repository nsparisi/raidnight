module RaidNight.Engine
{
    export class Room extends Character
    {
        width: integer;
        height: integer;
        floorplan: integer[];
        floorEffects: integer[];

        phase2: boolean;

        constructor(width: integer, height: integer)
        {
            super("Room", 10000, 10000, 0, 0);
            this.width = width;
            this.height = height;
            this.phase2 = false;
            this.actionsLoop = true;

            this.floorplan = [
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            ];

            this.floorEffects = [
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            ];
        }

        public isWalkable(x: integer, y: integer)
        {
            return  x < this.width &&
                    x >= 0 &&
                    y < this.height && 
                    y >= 0 &&
                    this.floorplan[x + y * this.width] == 0;
        }

        public logMessageForFloorEffect(name: string)
        {
            Debug.log(`${name} is taking damage from the floor!`);
        }

        public damageFromFloorEffect(x: integer, y: integer): integer
        {
            return this.floorEffects[x + y * this.width];
        }

        public isDead()
        {
            return false;
        }

        public addHealth(healthToAdd: integer)
        {
            return;
        }
        
        public resolveStatus()
        {
            return;
        }
        
        protected addMana(manaToAdd: integer)
        {
            return;
        }
        
        grabNewAction ()
        {
            super.grabNewAction();
        }
    }
    
    export class Room1 extends Room
    {
        constructor(width: integer, height: integer)
        {
            super(width, height);

            this.floorplan = [
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            ];
        }
        
        grabNewAction ()
        {
            if (!this.phase2 && GLOBAL_GAME.arena.enemies[0].health <= GLOBAL_GAME.arena.enemies[0].maxHealth / 2)
            {
                this.phase2 = true;
                this.actionIndex = 0;

                this.actionList = [];
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(5, 1, 6,  2)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(6, 2, 7,  3)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(7, 3, 8,  4)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(8, 4, 9,  5)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(9, 5, 10,  6)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(10, 6, 11,  7)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(11, 7, 12,  8)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(12, 8, 13,  9)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(13, 9, 14,  10)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(14, 10, 15,  11)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(15, 11, 16,  12)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(16, 12, 17,  13)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(17, 13, 18,  14)));
                this.actionList.push(new action_Wait());

                
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(2, 0, 3,  1)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(2, 2, 3,  3)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(2, 4, 3,  5)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(2, 6, 3,  7)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(2, 8, 3,  9)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(2, 10, 3,  11)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(2, 12, 3,  13)));
                this.actionList.push(new action_Wait());

                Debug.log("🔥🔥 DRAGON has called down a FIRESTORM! 🔥🔥");
                GLOBAL_GAME.startText("DRAGON has called down a FIRESTORM!");
            }
            
            super.grabNewAction();
        }
    }

    export class Room2 extends Room
    {
        growthCounter: integer;
        growthTier: integer;
        growthDamage: integer = 20;
        growthRate: integer = 10;

        constructor(width: integer, height: integer)
        {
            super(width, height);

            this.floorplan = [
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            ];
        }
        
        public logMessageForFloorEffect(name: string)
        {
            Debug.log(`${name} is taking damage from the overgrowth!`);
        }

        grabNewAction ()
        {
            // when both devilvine + corpseflower die
            if (!this.phase2 && GLOBAL_GAME.arena.enemies[1].health <= 0 && GLOBAL_GAME.arena.enemies[2].health <= 0)
            //if (!this.phase2 && GLOBAL_GAME.arena.turn == 10)
            {
                this.phase2 = true;
            
                this.growthCounter = this.growthRate-1;
                this.growthTier = 0;

                Debug.log("🌿🌿 MOSSDRAGON is consuming the dungeon in overgrowth! 🌿🌿");
                GLOBAL_GAME.startText("MOSSDRAGON is consuming the dungeon in overgrowth!");
            }

            if (this.phase2)
            {
                this.growthCounter++;
                if (this.growthCounter % this.growthRate == 0)
                {
                    this.growthCounter = 0;
                    this.growthTier++;
                
                    // top and bottom rows will grow inward
                    for(let x = 0; x < this.width; x++)
                    {
                        for(let y = 0; y < this.growthTier; y++)
                        {
                            this.floorEffects[x + y * this.width] = this.growthDamage;
                        }
                        
                        for(let y = this.height - 1; y > this.height - 1 - this.growthTier; y--)
                        {
                            this.floorEffects[x + y * this.width] = this.growthDamage;
                        }
                    }
                }
            }

            super.grabNewAction();
        }
    }
    

    export class Room3 extends Room
    {
        constructor(width: integer, height: integer)
        {
            super(width, height);

            this.floorEffects = [
                10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,
                10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,
                10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,
                10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,
                10,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,
                10,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,
                10,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,
                10,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,
                10,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,
                10,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,
                10,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,
                10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,
                10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,
                10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,
                10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,
            ];
        }
        
        public logMessageForFloorEffect(name: string)
        {
            Debug.log(`${name} is taking damage from the quicksand!`);
        }
        
        grabNewAction ()
        {
            super.grabNewAction();
        }
    }
}