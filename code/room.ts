module RaidNight.Engine
{
    export class Room extends Character
    {
        width: integer;
        height: integer;
        floorplan: integer[];

        constructor(width: integer, height: integer)
        {
            super("ROOM", 10000, 10000, 0, 0);
            this.width = width;
            this.height = height;

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
    }
}