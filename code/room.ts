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
            console.log(`isWalkable ${x},${y} : ${x + y * this.width}`);
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
            if (!this.phase2 && GLOBAL_GAME.arena.enemies[0].health <= GLOBAL_GAME.arena.enemies[0].maxHealth / 2)
            {
                this.phase2 = true;
                this.actionIndex = 0;

                this.actionList = [];
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(6, 3, 7,  4)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(16, 6, 17,  7)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(10, 4, 11,  5)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(8, 7, 9,  8)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(12, 12, 13,  13)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(5, 11, 6,  12)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(7, 5, 8,  6)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(9, 8, 10,  9)));
                this.actionList.push(new action_Wait());
                this.actionList.push(new action_AreaSkill("FireStorm", new Area(12, 6, 13,  7)));
                this.actionList.push(new action_Wait());

                console.log("DRAGON has called down a FIRESTORM!");
            }

            super.grabNewAction();
        }
    }
}