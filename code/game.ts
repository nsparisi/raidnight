
module RaidNight.Engine
{
    export class Game
    {
        arena: Arena;
        library: Library;
        frameLengthMs: integer = 500;
        private elapsedTimeMs: number = 0;
        private isInitialized = false;

        newGame = (allies: Character[]) =>
        {
            let boss = new Character("Dragon", 10000, 100, 3, 8);
            boss.skillset = [new skill_DragonBreath()];
            boss.actionList = [];
            boss.actionList.push(new action_Skill("Dragon Breath", "warrior"));

            this.arena.enemies = [boss];
            this.arena.allies = allies;
        }

        setup = () =>
        {
            this.library = new Library();
            this.arena = new Arena();
            this.arena.board = new Board(20, 20);
            
            
            let boss = new Character("Dragon", 10000, 100, 3, 8);
            boss.skillset = [new skill_DragonBreath()];
            boss.actionList = [];

            let warrior = new Character("Warrior", 200, 100, 10, 8);
            warrior.actionList = [];

            let priest = new Character("Priest", 100, 200, 12, 6);
            priest.actionList = [];

            let wizard = new Character("Wizard", 100, 200, 12, 10);
            wizard.skillset = [new skill_Fireball()];
            wizard.actionList = [];

            this.arena.allies = [warrior, priest, wizard];
            this.arena.enemies = [boss];
        }

        start = () =>
        {
            this.arena.start();
        }

        stop = () =>
        {
            this.arena.stop();
        }

        update = () =>
        {
            if (this.arena == null || this.arena.state != ArenaState.InProgress)
            {
                return;
            }

            this.elapsedTimeMs += GLOBAL_deltaTimeMs;
            if(this.elapsedTimeMs >= this.frameLengthMs)
            {
                this.elapsedTimeMs -= this.frameLengthMs;

                this.arena.executeTurn();
            }
        }
    }
}