
module RaidNight.Engine
{
    export class Game
    {
        arena: Arena;
        library: Library;
        frameLengthMs: integer = 500;
        private elapsedTimeMs: number = 0;
        private isInitialized = false;
        private stepMode = false;
        private stepPending = false;

        newGame = (allies: Character[]) =>
        {
            let boss = new Boss("Dragon", 10000, 100, 3, 8);
            boss.actionList = [];
            boss.actionList.push(new action_Skill("DragonBreath", ["warrior"]));
            boss.actionList.push(new action_Skill("HeatWave", ["warrior", "priest", "wizard"]));
            boss.actionList.push(new action_Skill("DragonBreath", ["warrior"]));
            boss.actionList.push(new action_Skill("DragonBreath", ["warrior"]));
            boss.actionList.push(new action_Skill("DragonBreath", ["warrior"]));
            boss.actionList.push(new action_Skill("DragonBreath", ["warrior"]));
            boss.actionList.push(new action_Skill("DragonBreath", ["warrior"]));
            boss.actionList.push(new action_Skill("DragonBreath", ["warrior"]));
            boss.actionList.push(new action_Skill("DragonBreath", ["warrior"]));
            boss.actionList.push(new action_Skill("DragonBreath", ["warrior"]));

            let room = new Room(20, 15);
            room.actionList = [];
            room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(0,  0, 9,  7)));
            room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(10, 0, 19, 7)));
            room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(10, 8, 19, 14)));
            room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(0,  8, 9,  14)));

            this.arena.room = room;
            this.arena.enemies = [boss];
            this.arena.allies = allies;
        }

        setup = () =>
        {
            this.library = new Library();
            this.arena = new Arena();
            this.arena.room = new Room(20, 20);
            
            let boss = new Character("Dragon", 10000, 100, 3, 8);
            boss.actionList = [];

            let warrior = new Character("Warrior", 200, 100, 10, 8);
            warrior.actionList = [];
 
            let priest = new Character("Priest", 100, 200, 12, 6);
            priest.actionList = [];

            let wizard = new Character("Wizard", 100, 200, 12, 10);
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

        resume = () =>
        {
            this.stepMode = false;
            this.elapsedTimeMs = this.frameLengthMs;
        }

        step = () =>
        {
            this.stepMode = true;
            this.stepPending = true;
        }

        update = () =>
        {
            if (this.arena == null || this.arena.state != ArenaState.InProgress)
            {
                return;
            }

            if (this.stepMode)
            {
                if (!this.stepPending)
                {
                    return;
                }

                this.stepPending = false;
                this.arena.executeTurn();
            }
            else 
            {
                this.elapsedTimeMs += GLOBAL_deltaTimeMs;
                if(this.elapsedTimeMs >= this.frameLengthMs)
                {
                    this.elapsedTimeMs = 0;
                    this.calculateNewFrameLength();

                    this.arena.executeTurn();
                }
            }
        }

        calculateNewFrameLength = () =>
        {
            let element = <HTMLInputElement>document.getElementById("turn_length_ms");
            let valueMs = parseInt(element.value);

            console.log(`valueMs: ${valueMs}`);

            valueMs = valueMs ? valueMs : 500;
            valueMs = Math.max(100, valueMs);
            valueMs = Math.min(10000, valueMs);

            this.frameLengthMs = valueMs;
        }
    }
}