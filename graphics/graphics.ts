class Game_RaidNight extends Phaser.Game
{
    constructor()
    {
        super({
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: Scene_Arena
        });
    }
}

class Scene_Arena extends Phaser.Scene
{
    constructor()
    {
        super({});
    }

    char_priest: Character;
    char_warrior: Character;
    char_wizard: Character;
    char_dragon: Character;

    sprite_priest: Phaser.GameObjects.Sprite;
    sprite_warrior: Phaser.GameObjects.Sprite;
    sprite_wizard: Phaser.GameObjects.Sprite;
    sprite_dragon: Phaser.GameObjects.Sprite;

    preload ()
    {
        this.load.image('assets/bg_dungeon.png', 'assets/bg_dungeon.png');
        this.load.image('assets/warrior.png', 'assets/warrior.png');
        this.load.image('assets/wizard.png', 'assets/wizard.png');
        this.load.image('assets/priest.png', 'assets/priest.png');
        this.load.image('assets/dragon.png', 'assets/dragon.png');
    }

    create ()
    {
        this.add.image(0, 0, 'assets/bg_dungeon.png').setOrigin(0, 0);
        this.sprite_wizard = this.add.sprite(600, 100, 'assets/wizard.png');
        this.sprite_warrior = this.add.sprite(600, 300, 'assets/warrior.png');
        this.sprite_priest = this.add.sprite(600, 500, 'assets/priest.png');
        this.sprite_dragon = this.add.sprite(600, 500, 'assets/dragon.png');
        this.sprite_dragon.setFlipX(true);

        this.add.text(15,15, "Hello World", {fontSize: "20px", fill: "#FFF"});

        let i = 0;
        for(i = 0; i < GLOBAL_GAME.arena.allies.length; i++)
        {
            if (GLOBAL_GAME.arena.allies[i].name.toUpperCase() == "PRIEST")
            {
                this.char_priest = GLOBAL_GAME.arena.allies[i];
            }
            else if (GLOBAL_GAME.arena.allies[i].name.toUpperCase() == "WARRIOR")
            {
                this.char_warrior = GLOBAL_GAME.arena.allies[i];
            }
            else if (GLOBAL_GAME.arena.allies[i].name.toUpperCase() == "WIZARD")
            {
                this.char_wizard = GLOBAL_GAME.arena.allies[i];
            }
        }
        
        for(i = 0; i < GLOBAL_GAME.arena.enemies.length; i++)
        {
            if (GLOBAL_GAME.arena.enemies[i].name.toUpperCase() == "DRAGON")
            {
                this.char_dragon = GLOBAL_GAME.arena.enemies[i];
            }
        }
        

        console.log(this.time);
    }

    tileWidth: integer = 40;
    tileHeight: integer = 40;

    update ()
    {
        //console.log(this.time.now);
        this.sprite_wizard.setPosition(
            this.char_wizard.x * this.tileWidth + this.sprite_wizard.width / 2, 
            this.char_wizard.y * this.tileHeight + this.sprite_wizard.height / 2);
            
        this.sprite_warrior.setPosition(
            this.char_warrior.x * this.tileWidth + this.sprite_warrior.width / 2, 
            this.char_warrior.y * this.tileHeight + this.sprite_warrior.height / 2);
            
        this.sprite_priest.setPosition(
            this.char_priest.x * this.tileWidth + this.sprite_priest.width / 2, 
            this.char_priest.y * this.tileHeight + this.sprite_priest.height / 2);
            
        this.sprite_dragon.setPosition(
            this.char_dragon.x * this.tileWidth + this.sprite_dragon.width / 2, 
            this.char_dragon.y * this.tileHeight + this.sprite_dragon.height / 2);
    }
}