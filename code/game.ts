
let arena = new Arena();

let boss = new Character("Dragon", 10000, 100);

let warrior = new Character("Warrior", 200, 100);
let priest = new Character("Priest", 100, 200);
let wizard = new Character("Wizard", 100, 200);
wizard.skillset = [new skill_Fireball()];

arena.allies = [warrior, priest, wizard];
arena.enemies = [boss];

arena.executeTurn();
arena.executeTurn();