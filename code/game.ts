
module RaidNight.Engine
{
    export class Game
    {
        arena: Arena;
        library: Library;

        setup = () =>
        {
            this.library = new Library();
            this.arena = new Arena();
            let board = new Board(20, 20);
            this.arena.board = board;

            this.ai1();
        }

        ai1 = () =>
        {
            let boss = new Character("Dragon", 10000, 100, 3, 8);
            boss.skillset = [new skill_DragonBreath()];
            boss.actionList = [];
            boss.actionList.push(new action_Skill("Dragon Breath", "warrior"));

            let warrior = new Character("Warrior", 200, 100, 10, 8);
            warrior.actionList = [];
            warrior.actionList.push(new action_Move(1, 0));
            warrior.actionList.push(new action_Move(-1, 0));

            let priest = new Character("Priest", 100, 200, 12, 6);
            priest.actionList = [];
            priest.actionList.push(new action_Move(1, 0));
            priest.actionList.push(new action_Move(-1, 0));

            let wizard = new Character("Wizard", 100, 200, 12, 10);
            wizard.skillset = [new skill_Fireball()];
            wizard.actionList = [];
            wizard.actionList.push(new action_Skill("ignite", "dragon"));
            wizard.actionList.push(new action_Skill("fireball", "dragon"));
            wizard.actionList.push(new action_Skill("fireball", "dragon"));

            this.arena.allies = [warrior, priest, wizard];
            this.arena.enemies = [boss];
        }

        ai2 = () =>
        {
            let boss = new Character("Dragon", 10000, 100, 3, 8);
            boss.skillset = [new skill_DragonBreath()];
            boss.actionList = [];
            boss.actionList.push(new action_Move(1, 0));
            boss.actionList.push(new action_Move(-1, 0));

            let warrior = new Character("Warrior", 200, 100, 10, 8);
            warrior.actionList = [];
            warrior.actionList.push(new action_Move(1, 0));
            warrior.actionList.push(new action_Move(-1, 0));

            let priest = new Character("Priest", 100, 200, 12, 6);
            priest.actionList = [];
            priest.actionList.push(new action_Move(1, 0));
            priest.actionList.push(new action_Move(-1, 0));

            let wizard = new Character("Wizard", 100, 200, 12, 10);
            wizard.skillset = [new skill_Fireball()];
            wizard.actionList = [];
            wizard.actionList.push(new action_Skill("ignite", "dragon"));
            wizard.actionList.push(new action_Move(1, 0));
            wizard.actionList.push(new action_Skill("ignite", "dragon"));
            wizard.actionList.push(new action_Move(-1, 0));
            wizard.actionList.push(new action_Move(1, 0));
            wizard.actionList.push(new action_Move(-1, 0));
            wizard.actionList.push(new action_Move(1, 0));
            wizard.actionList.push(new action_Move(-1, 0));
            wizard.actionList.push(new action_Move(1, 0));
            wizard.actionList.push(new action_Move(-1, 0));

            this.arena.allies = [warrior, priest, wizard];
            this.arena.enemies = [boss];
        }

        elapsedTimeMs: number = 0;
        frameLengthMs: integer = 1000;
        update = () =>
        {
            if (this.arena.state != ArenaState.InProgress)
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

        run = () =>
        {
            this.arena.setup();
        }
    }
}