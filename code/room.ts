module RaidNight.Engine
{
    export class Room extends Character
    {
        width: integer;
        height: integer;

        constructor(width: integer, height: integer)
        {
            super("ROOM", 10000, 10000, 0, 0);
            this.width = width;
            this.height = height;
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