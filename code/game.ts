
class Game
{
    arena: Arena;

    setup = () =>
    {
        this.arena = new Arena();

        let board = new Board(20, 20);

        let boss = new Character("Dragon", 10000, 100);
        boss.skillset = [new skill_Fireball()];
        boss.actionList = [];
        boss.actionList.push(new action_Skill("fireball", "warrior"));
        boss.actionList.push(new action_Skill("fireball", "priest"));
        boss.actionList.push(new action_Skill("fireball", "wizard"));

        // cast fireball, move right, cast fireball, move left
        let warrior = new Character("Warrior", 200, 100);
        warrior.actionList = [];
        warrior.actionList.push(new action_Move(1, 0));
        warrior.actionList.push(new action_Move(-1, 0));

        let priest = new Character("Priest", 100, 200);
        priest.actionList = [];
        priest.actionList.push(new action_Move(1, 0));
        priest.actionList.push(new action_Move(-1, 0));

        let wizard = new Character("Wizard", 100, 200);
        wizard.skillset = [new skill_Fireball()];
        wizard.actionList = [];
        wizard.actionList.push(new action_Skill("fireball", "dragon"));
        wizard.actionList.push(new action_Move(1, 0));
        wizard.actionList.push(new action_Skill("fireball", "dragon"));
        wizard.actionList.push(new action_Move(-1, 0));


        this.arena.board = board;
        this.arena.allies = [warrior, priest, wizard];
        this.arena.enemies = [boss];
    }

    run = () =>
    {
        this.arena.setup();
        while(this.arena.state == ArenaState.InProgress)
        {
            this.arena.executeTurn();
        }
    }
}

var GLOBAL_GAME = new Game();
GLOBAL_GAME.setup();
GLOBAL_GAME.run();