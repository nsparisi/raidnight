
module RaidNight.Engine
{
    export enum FightType { Fight1, Fight2, Fight3 }

    export class Game
    {
        arena: Arena;
        library: Library;
        frameLengthMs: integer = 500;
        private elapsedTimeMs: number = 0;
        private stepMode = true;
        private stepPending = false;

        isShowingText: boolean;
        textToShow: string[];
        fightType: FightType;
        allyActions: PlayerActions;

        readInput = (allyActions: PlayerActions) =>
        {
            this.allyActions = allyActions;

            if(this.fightType == FightType.Fight1)
            {
                this.setup1();
            }
            else if(this.fightType == FightType.Fight2)
            {
                this.setup2();
            }
            else if(this.fightType == FightType.Fight3)
            {
                this.setup3();
            }
        }

        newGame = () =>
        {
            if(this.fightType == FightType.Fight1)
            {
                this.newGame1();
            }
            else if(this.fightType == FightType.Fight2)
            {
                this.newGame2();
            }
            else if(this.fightType == FightType.Fight3)
            {
                this.newGame3();
            }
        }

        newGame1 = () =>
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

            let room = new Room1("Dragon", "🐉",  20, 15);
            room.actionList = [];
            room.actionList.push(new action_Wait());

            this.arena.room = room;
            this.arena.allies[0].actionList = this.allyActions.knight;
            this.arena.allies[1].actionList = this.allyActions.priest;
            this.arena.allies[2].actionList = this.allyActions.wizard;
        }

        newGame2 = () =>
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
            boss2.actionList.push(new action_Move(0, 1));
            boss2.actionList.push(new action_Skill("Whip", ["knight"]));
            boss2.actionList.push(new action_Wait());
            boss2.actionList.push(new action_Skill("Whip", ["knight"]));
            boss2.actionList.push(new action_Wait());
            boss2.actionList.push(new action_Skill("Whip", ["knight"]));
            boss2.actionList.push(new action_Wait());
            boss2.actionList.push(new action_Skill("Whip", ["knight"]));
            boss2.actionList.push(new action_Wait());
            boss2.actionList.push(new action_Skill("Whip", ["knight"]));
            boss2.actionList.push(new action_Move(0, -1));
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
            boss3.actionList.push(new action_Move(0, -1));
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Skill("Miasma", ["knight", "priest", "wizard"]));
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Wait());
            boss3.actionList.push(new action_Move(0, 1));
            boss3.actionList.push(new action_Wait());

            let room = new Room2("Dungeon", "💣",  20, 15);
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
            this.arena.allies[0].actionList = this.allyActions.knight;
            this.arena.allies[1].actionList = this.allyActions.priest;
            this.arena.allies[2].actionList = this.allyActions.wizard;
        }
        
        newGame3 = () =>
        {
            this.setup3();

            let boss = this.arena.enemies[0];
            boss.actionList = [];
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("SandPrism",["SandPrism_1", "SandPrism_3", "SandPrism_5", "SandPrism_7", "SandPrism_9", "SandPrism_11", "SandPrism_13"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("SandPrism",["SandPrism_14", "SandPrism_16", "SandPrism_18", "SandPrism_20"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("FastForward", ["knight", "priest", "wizard"]));
            
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("SandPrism",["SandPrism_2", "SandPrism_4", "SandPrism_6", "SandPrism_8", "SandPrism_10", "SandPrism_12"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("SandPrism",["SandPrism_15", "SandPrism_17", "SandPrism_19", "SandPrism_21"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("Rewind", ["knight", "priest", "wizard"]));

            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("SandPrism",["SandPrism_1", "SandPrism_3", "SandPrism_5", "SandPrism_7", "SandPrism_9", "SandPrism_11", "SandPrism_13"]));
            boss.actionList.push(new action_Skill("SandPrism",["SandPrism_2", "SandPrism_4", "SandPrism_6", "SandPrism_8", "SandPrism_10", "SandPrism_12"]));
            boss.actionList.push(new action_Skill("SandPrism",["SandPrism_14", "SandPrism_16", "SandPrism_18", "SandPrism_20"]));
            boss.actionList.push(new action_Skill("SandPrism",["SandPrism_15", "SandPrism_17", "SandPrism_19", "SandPrism_21"]));
            boss.actionList.push(new action_Skill("Halt", ["knight", "priest", "wizard"]));

            
            boss.actionList.push(new action_Wait());
            boss.actionList.push(new action_Skill("SandPrism",["SandPrism_1", "SandPrism_2", "SandPrism_3",  "SandPrism_4", "SandPrism_5", "SandPrism_6", "SandPrism_7", "SandPrism_8", "SandPrism_9", "SandPrism_10", "SandPrism_11",  "SandPrism_12", "SandPrism_13" ]));
            boss.actionList.push(new action_Wait());
            boss.actionList.push(new action_Skill("SandPrism",["SandPrism_14", "SandPrism_15", "SandPrism_16", "SandPrism_17", "SandPrism_18", "SandPrism_19", "SandPrism_20", "SandPrism_21"]));
            boss.actionList.push(new action_Wait());
            boss.actionList.push(new action_Wait());
            boss.actionList.push(new action_Wait());
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));
            boss.actionList.push(new action_Skill("Bite", ["knight"]));            

            let room = new Room3("TimeDragon", "", 20, 15);
            room.actionList = [];
            room.actionList.push(new action_Wait());

            this.arena.room = room;
            this.arena.allies[0].actionList = this.allyActions.knight;
            this.arena.allies[1].actionList = this.allyActions.priest;
            this.arena.allies[2].actionList = this.allyActions.wizard;
        }

        setup1 = () =>
        {
            this.library = new Library();
            this.arena = new Arena();
            this.arena.room = new Room1("Dragon", "🐉", 20, 15);
            this.arena.winTexts = [];
            this.arena.winTexts.push("In its dying breath the dragon bellows: BOING");
            this.arena.winTexts.push("The dragon has been slain.");

            this.fightType = FightType.Fight1;
            
            let knight = new Character("Knight", "🛡️", 400, 100, 9, 7);
            knight.mana = 0;
            let priest = new Character("Priest", "🙏", 200, 300, 11, 6);
            let wizard = new Character("Wizard", "❄️", 200, 200, 13, 8);
            let boss = new Boss("Dragon", "🐉", 4000, 100, 3, 8);
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
            this.arena.room = new Room2("Dungeon", "💣",  20, 15);
            this.arena.winTexts = [];
            this.arena.winTexts.push("The vegetation combusts into flames forming smoke in the shape of a: DEER");
            this.arena.winTexts.push("The dragon has been slain.");
            
            this.fightType = FightType.Fight2;
            
            let knight = new Character("Knight", "🛡️", 400, 100, 9, 7);
            knight.mana = 0;
            let priest = new Character("Priest","🙏", 200, 300, 12, 6);
            let wizard = new Character("Wizard", "🔥", 200, 100, 14, 8);
            wizard.mana = 0;
            wizard.addStatus("ST_HEATINGUP", "Wizard");            
            let boss1 = new Boss("MossDragon", "🐉", 5000, 100, 2, 7);
            let boss2 = new DevilVine("DevilVine", "🟩", 1200, 100, 4, 4);
            let boss3 = new CorpseFlower("CorpseFlower", "🟢", 1200, 100, 4, 10);

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
            this.arena.room = new Room3("TimeDragon", "", 20, 15);
            this.arena.winTexts = [];
            this.arena.winTexts.push("The dragon vanishes leaving behind a glass shard with the inscription: THE IMPURE");
            this.arena.winTexts.push("The dragon has been slain. The riches are yours.");
            this.arena.winTexts.push("You return to the safari and sneak into a passing tour group.");
            this.arena.winTexts.push("\"And over there is our very own dragon's lair...\"");
            
            this.fightType = FightType.Fight3;
            
            let knight = new Character("Knight", "🛡️", 400, 100, 9, 7);
            knight.mana = 0;
            let priest = new Character("Priest", "🙏",200, 300, 12, 6);
            let wizard = new Character("Wizard", "🧊",200, 100, 14, 8);
            wizard.mana = 0;
            wizard.addStatus("ST_OVERHEATING", "Wizard");            
            let boss1 = new TimeDragon("TimeDragon", "🐉", 5000, 100, 2, 7);

            let prisms = [];
            let nameIndex = 0;
            for(let i = 4; i <= 16; i++)
            {
                let prism = new SandPrism("SandPrism_" + (++nameIndex), "💎", 1, 1, i, 3);
                prism.actionList = [];
                prism.actionList.push(new action_Wait());
                prism.actionList.push(new action_AreaSkill("TimeLaser", new Area(i,  4, i,  14)));
                prisms.push(prism);
            }
            
            for(let i = 4; i <= 11; i++)
            {
                let prism = new SandPrism("SandPrism_" + (++nameIndex), "💎", 1, 1, 19, i);
                prism.actionList = [];
                prism.actionList.push(new action_Wait());
                prism.actionList.push(new action_AreaSkill("TimeLaser", new Area(0,  i, 18,  i)));
                prisms.push(prism);
            }

            boss1.actionList = [];
            knight.actionList = [];
            priest.actionList = [];
            wizard.actionList = [];

            this.arena.allies = [knight, priest, wizard];
            this.arena.enemies = [boss1];
            this.arena.enemies = this.arena.enemies.concat(prisms);

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