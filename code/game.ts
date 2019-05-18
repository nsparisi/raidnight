
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

        newGame = (allyActions: PlayerActions) =>
        {
            this.setup();

            let boss = new Boss("Dragon", 10000, 100, 3, 8);
            boss.actionList = [];
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("HeatWave", ["knight", "priest", "wizard"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Move(0, -1));
            
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("HeatWave", ["knight", "priest", "wizard"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Move(0, -1));
            boss.actionList.push(new action_AreaSkill("Flamethrower", new Area(4, 5, 19,  7)));
            
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("HeatWave", ["knight", "priest", "wizard"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Move(0, 1));
            
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("HeatWave", ["knight", "priest", "wizard"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Skill("Claw", ["knight"]));
            boss.actionList.push(new action_Move(0, 1));
            boss.actionList.push(new action_AreaSkill("Flamethrower", new Area(4, 7, 19,  9)));

            let room = new Room(20, 15);
            room.actionList = [];
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            //room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(0,  0, 9,  7)));

            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            //room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(10, 0, 19, 7)));
            
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            //room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(10, 8, 19, 14)));
            
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            room.actionList.push(new action_Wait());
            //room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(0,  8, 9,  14)));

            // room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(0,  0, 1,  14)));
            // room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(2,  0, 3,  14)));
            // room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(4,  0, 5,  14)));
            // room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(6,  0, 7,  14)));
            // room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(8,  0, 9,  14)));
            // room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(10,  0, 11,  14)));
            // room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(12,  0, 13,  14)));
            // room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(14,  0, 15,  14)));
            // room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(16,  0, 17,  14)));
            // room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(18,  0, 19,  14)));

            this.arena.room = room;
            this.arena.enemies = [boss];
            this.arena.allies[0].actionList = allyActions.knight;
            this.arena.allies[1].actionList = allyActions.priest;
            this.arena.allies[2].actionList = allyActions.wizard;
        }

        setup = () =>
        {
            this.library = new Library();
            this.arena = new Arena();
            this.arena.room = new Room(20, 15);
            
            let knight = new Character("Knight", 350, 100, 9, 7);
            knight.mana = 0;
            let priest = new Character("Priest", 150, 400, 11, 6);
            let wizard = new Character("Wizard", 150, 400, 13, 8);
            let boss = new Character("Dragon", 10000, 100, 3, 8);
            boss.actionList = [];
            knight.actionList = [];
            priest.actionList = [];
            wizard.actionList = [];

            this.arena.allies = [knight, priest, wizard];
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

            valueMs = valueMs ? valueMs : 500;
            valueMs = Math.max(100, valueMs);
            valueMs = Math.min(10000, valueMs);

            this.frameLengthMs = valueMs;
        }
    }
}