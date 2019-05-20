
module RaidNight.Engine
{
    export class Game
    {
        arena: Arena;
        library: Library;
        frameLengthMs: integer = 500;
        private elapsedTimeMs: number = 0;
        private stepMode = false;
        private stepPending = false;

        isShowingText: boolean;
        textToShow: string[];

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

            this.isShowingText = false;
            this.textToShow = [];
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
            this.nextText();
        }

        step = () =>
        {
            this.stepMode = true;
            this.stepPending = true;
            this.nextText();
        }

        startText = (...texts: string[]) =>
        {
            this.textToShow = texts;
            this.isShowingText = true;
        }

        nextText = () =>
        {
            this.textToShow.shift();
            this.isShowingText = this.textToShow.length > 0;
        }

        update = () =>
        {
            if (this.arena == null || this.arena.state != ArenaState.InProgress || this.isShowingText)
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
            let speed = (<HTMLInputElement>document.querySelector('input[name="speed"]:checked')).value;
            let valueMs = parseInt(speed);

            valueMs = valueMs ? valueMs : 500;
            valueMs = Math.max(100, valueMs);
            valueMs = Math.min(10000, valueMs);

            this.frameLengthMs = valueMs;
        }
    }
}