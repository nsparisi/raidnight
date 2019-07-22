module RaidNight.Engine
{
    export class Room extends Character
    {
        width: integer;
        height: integer;
        floorplan: integer[];

        phase2: boolean;

        constructor(width: integer, height: integer)
        {
            super("Room", 10000, 10000, 0, 0);
            this.width = width;
            this.height = height;
            this.phase2 = false;

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

        public isWalkable(x: integer, y: integer)
        {
            Debug.log(`isWalkable ${x},${y} : ${x + y * this.width}`);
            return  x < this.width &&
                    x >= 0 &&
                    y < this.height && 
                    y >= 0 &&
                    this.floorplan[x + y * this.width] == 0;
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

                Debug.log("DRAGON has called down a FIRESTORM!");
                GLOBAL_GAME.startText("DRAGON has called down a FIRESTORM!");
            }
            
            super.grabNewAction();
        }
    }

    export class Room2 extends Room
    {
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
        
        grabNewAction ()
        {
            super.grabNewAction();
        }
    }
}