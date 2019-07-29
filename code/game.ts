
module RaidNight.Engine
{
    export enum FightType { Fight1, Fight2, Fight3 }

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
        fightType: FightType;

        newGame1 = (allyActions: PlayerActions) =>
        {
            this.setup1();

            let boss = this.arena.enemies[0];
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

            let room = new Room1(20, 15);
            room.actionList = [];
            room.actionList.push(new action_Wait());

            this.arena.room = room;
            this.arena.allies[0].actionList = allyActions.knight;
            this.arena.allies[1].actionList = allyActions.priest;
            this.arena.allies[2].actionList = allyActions.wizard;
        }

        newGame2 = (allyActions: PlayerActions) =>
        {
            this.setup2();

            let boss1 = this.arena.enemies[0];
            boss1.actionList = [];
            boss1.actionList.push(new action_Skill("TailSwipe", ["knight"]));
            boss1.actionList.push(new action_Skill("VenomousBite", ["knight"]));
            boss1.actionList.push(new action_Skill("TailSwipe", ["knight"]));
            boss1.actionList.push(new action_Skill("TailSwipe", ["knight"]));
            boss1.actionList.push(new action_Skill("TailSwipe", ["knight"]));
            boss1.actionList.push(new action_Skill("TailSwipe", ["knight"]));
            boss1.actionList.push(new action_Skill("TailSwipe", ["knight"]));
            boss1.actionList.push(new action_Skill("TailSwipe", ["knight"]));
            boss1.actionList.push(new action_Skill("TailSwipe", ["knight"]));
            boss1.actionList.push(new action_Skill("TailSwipe", ["knight"]));

            let boss2 = this.arena.enemies[1];
            boss2.actionList = [];
            boss2.actionList.push(new action_Skill("Whip", ["knight"]));
            boss2.actionList.push(new action_Wait());
            boss2.actionList.push(new action_Skill("Whip", ["knight"]));
            boss2.actionList.push(new action_Wait());
            boss2.actionList.push(new action_Skill("Whip", ["knight"]));
            boss2.actionList.push(new action_Wait());
            boss2.actionList.push(new action_Skill("Whip", ["knight"]));
            boss2.actionList.push(new action_Wait());
            boss2.actionList.push(new action_Skill("Whip", ["knight"]));
            boss2.actionList.push(new action_Wait());
            boss2.actionList.push(new action_Skill("Whip", ["knight"]));
            boss2.actionList.push(new action_Wait());
            boss2.actionList.push(new action_Skill("Whip", ["knight"]));
            boss2.actionList.push(new action_Wait());
            boss2.actionList.push(new action_Skill("Whip", ["knight"]));
            boss2.actionList.push(new action_Wait());
            boss2.actionList.push(new action_Skill("Whip", ["knight"]));
            boss2.actionList.push(new action_Wait());
            boss2.actionList.push(new action_Skill("Whip", ["knight"]));
            boss2.actionList.push(new action_Skill("Bind", ["knight"]));

            let boss3 = this.arena.enemies[2];
            boss3.actionList.push(new action_Skill("Miasma", ["knight", "priest", "wizard"]));
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Wait());

            let room = new Room2(20, 15);
            room.actionList = [];
            for(let i = 0; i < 24; i++){room.actionList.push(new action_Wait());}
            room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(1,  1, 9,  7)));
            for(let i = 0; i < 24; i++){room.actionList.push(new action_Wait());}
            room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(10, 1, 18, 7)));
            for(let i = 0; i < 24; i++){room.actionList.push(new action_Wait());}
            room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(10, 8, 18, 13)));
            for(let i = 0; i < 24; i++){room.actionList.push(new action_Wait());}
            room.actionList.push(new action_AreaSkill("SpikeTrap", new Area(1,  8, 9,  13)));


            this.arena.room = room;
            this.arena.allies[0].actionList = allyActions.knight;
            this.arena.allies[1].actionList = allyActions.priest;
            this.arena.allies[2].actionList = allyActions.wizard;
        }
        
        newGame3 = (allyActions: PlayerActions) =>
        {
            this.setup1();

            let boss = this.arena.enemies[0];
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

            let room = new Room1(20, 15);
            room.actionList = [];
            room.actionList.push(new action_Wait());

            this.arena.room = room;
            this.arena.allies[0].actionList = allyActions.knight;
            this.arena.allies[1].actionList = allyActions.priest;
            this.arena.allies[2].actionList = allyActions.wizard;
        }

        setup1 = () =>
        {
            this.library = new Library();
            this.arena = new Arena();
            this.arena.room = new Room1(20, 15);
            
            this.fightType = FightType.Fight1;
            
            let knight = new Character("Knight", 350, 100, 9, 7);
            knight.mana = 0;
            let priest = new Character("Priest", 150, 400, 12, 6);
            let wizard = new Character("Wizard", 150, 400, 14, 8);
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

        setup2 = () =>
        {
            this.library = new Library();
            this.arena = new Arena();
            this.arena.room = new Room2(20, 15);
            
            this.fightType = FightType.Fight2;
            
            let knight = new Character("Knight", 350, 100, 9, 7);
            knight.mana = 0;
            let priest = new Character("Priest", 150, 400, 12, 6);
            let wizard = new Character("Wizard", 150, 100, 14, 8);
            wizard.mana = 0;
            wizard.addStatus("ST_HEATINGUP", "Wizard");            
            let boss1 = new Boss("MossDragon", 5000, 100, 2, 7);
            let boss2 = new Boss("DevilVine", 1000, 100, 4, 4);
            let boss3 = new Boss("CorpseFlower", 1000, 100, 4, 10);

            boss1.actionList = [];
            boss2.actionList = [];
            boss3.actionList = [];
            knight.actionList = [];
            priest.actionList = [];
            wizard.actionList = [];

            this.arena.allies = [knight, priest, wizard];
            this.arena.enemies = [boss1, boss2, boss3];

            this.isShowingText = false;
            this.textToShow = [];
        }

        setup3 = () =>
        {
            this.library = new Library();
            this.arena = new Arena();
            this.arena.room = new Room2(20, 15);
            
            this.fightType = FightType.Fight3;
            
            let knight = new Character("Knight", 350, 100, 9, 7);
            knight.mana = 0;
            let priest = new Character("Priest", 150, 400, 12, 6);
            let wizard = new Character("Wizard", 150, 100, 14, 8);
            wizard.mana = 0;
            wizard.addStatus("ST_HEATINGUP", "Wizard");            
            let boss1 = new Boss("Dragon", 5000, 100, 2, 7);

            boss1.actionList = [];
            knight.actionList = [];
            priest.actionList = [];
            wizard.actionList = [];

            this.arena.allies = [knight, priest, wizard];
            this.arena.enemies = [boss1];

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