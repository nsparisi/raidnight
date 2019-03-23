module RaidNight.Graphics
{
    export class Game_RaidNight extends Phaser.Game
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

    export class Character
    {
        sprite: Phaser.GameObjects.Sprite;
        scene: Scene_Arena;
        character: RaidNight.Engine.Character;

        gfx_healthBlack: Phaser.GameObjects.Graphics;
        gfx_healthRed: Phaser.GameObjects.Graphics;
        gfx_healthGreen: Phaser.GameObjects.Graphics;

        constructor (scene: Scene_Arena, char_reference: RaidNight.Engine.Character, sprite: Phaser.GameObjects.Sprite)
        {
            this.scene = scene;
            this.character = char_reference;
            this.sprite = sprite;

            this.scene.add.graphics();
            
            this.gfx_healthBlack = this.scene.add.graphics();
            this.gfx_healthRed = this.scene.add.graphics();
            this.gfx_healthGreen = this.scene.add.graphics();


            this.gfx_healthBlack.fillRoundedRect(35, 40, 254, 70);
        }

        draw = () => 
        {
            let centerX = this.character.x * this.scene.tileWidth + this.sprite.width / 2;
            let centerY = this.character.y * this.scene.tileHeight + this.sprite.height / 2;

            this.sprite.setPosition(
                this.character.x * this.scene.tileWidth + this.sprite.width / 2, 
                this.character.y * this.scene.tileHeight + this.sprite.height / 2);

            let blackPadding = 2;
            let redWidth = 40;
            let greenWidth = redWidth * (this.character.health / this.character.maxHealth);
            let colorHeight = 7;

            this.gfx_healthBlack.clear();
            this.gfx_healthBlack.fillStyle(0x000000, 0.4);
            this.gfx_healthBlack.fillRect(centerX - (redWidth / 2) - blackPadding, centerY + 25 - blackPadding, redWidth + (blackPadding*2), colorHeight + (blackPadding*2));

            this.gfx_healthRed.clear();
            this.gfx_healthRed.fillStyle(0xFF2255, 1.0);
            this.gfx_healthRed.fillRect(centerX - (redWidth / 2), centerY + 25, redWidth, colorHeight);

            this.gfx_healthGreen.clear();
            this.gfx_healthGreen.fillStyle(0x22CC88, 1.0);
            this.gfx_healthGreen.fillRect(centerX - (redWidth / 2), centerY + 25, greenWidth, colorHeight);
        }
    }

    export class Scene_Arena extends Phaser.Scene
    {
        constructor()
        {
            super({});
        }
                            
        priest: Character;
        warrior: Character;
        wizard: Character;
        dragon: Character;

        text_priestHealth: Phaser.GameObjects.Text;
        text_warriorHealth: Phaser.GameObjects.Text;
        text_wizardHealth: Phaser.GameObjects.Text;
        text_dragonHealth: Phaser.GameObjects.Text;

        gfx_upperHealthBox: Phaser.GameObjects.Graphics;
        gfx_lowerHealthBox: Phaser.GameObjects.Graphics;

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
            let char_priest: RaidNight.Engine.Character = null;
            let char_warrior: RaidNight.Engine.Character = null;
            let char_wizard: RaidNight.Engine.Character = null;
            let char_dragon: RaidNight.Engine.Character = null;

            let i = 0;
            for(i = 0; i < GLOBAL_GAME.arena.allies.length; i++)
            {
                if (GLOBAL_GAME.arena.allies[i].name.toUpperCase() == "PRIEST")
                {
                    char_priest = GLOBAL_GAME.arena.allies[i];
                }
                else if (GLOBAL_GAME.arena.allies[i].name.toUpperCase() == "WARRIOR")
                {
                    char_warrior = GLOBAL_GAME.arena.allies[i];
                }
                else if (GLOBAL_GAME.arena.allies[i].name.toUpperCase() == "WIZARD")
                {
                    char_wizard = GLOBAL_GAME.arena.allies[i];
                }
            }
            
            for(i = 0; i < GLOBAL_GAME.arena.enemies.length; i++)
            {
                if (GLOBAL_GAME.arena.enemies[i].name.toUpperCase() == "DRAGON")
                {
                    char_dragon = GLOBAL_GAME.arena.enemies[i];
                }
            }

            this.add.image(0, 0, 'assets/bg_dungeon.png').setOrigin(0, 0);
            this.wizard = new Character(this, char_wizard, this.add.sprite(600, 100, 'assets/wizard.png'));
            this.warrior = new Character(this, char_warrior, this.add.sprite(600, 300, 'assets/warrior.png'));
            this.priest = new Character(this, char_priest, this.add.sprite(600, 500, 'assets/priest.png'));
            this.dragon = new Character(this, char_dragon, this.add.sprite(100, 500, 'assets/dragon.png'));
            this.dragon.sprite.setFlipX(true);

            this.gfx_upperHealthBox = this.add.graphics();
            this.gfx_upperHealthBox.fillStyle(0x000000, 0.7);
            this.gfx_upperHealthBox.fillRoundedRect(35, 40, 254, 70);
            
            this.gfx_lowerHealthBox = this.add.graphics();
            this.gfx_lowerHealthBox.fillStyle(0x000000, 0.7);
            this.gfx_lowerHealthBox.fillRect(36, 527, 250, 25);


            let nameStyle = {fontSize: "20px", fill: "#FFF", align: "left"};
            let healthStyle = {fontSize: "20px", fill: "#FFF", align: "right"};
            this.add.text(45,45, "WIZARD:", nameStyle);
            this.add.text(45,65, "WARRIOR:", nameStyle);
            this.add.text(45,85, "PRIEST:", nameStyle);
            this.add.text(45,530, "DRAGON:", nameStyle);
            this.text_wizardHealth =  this.add.text(280,45, "", healthStyle).setOrigin(1, 0);
            this.text_warriorHealth = this.add.text(280,65, "", healthStyle).setOrigin(1, 0);
            this.text_priestHealth =  this.add.text(280,85, "", healthStyle).setOrigin(1, 0);
            this.text_dragonHealth =  this.add.text(280,530, "", healthStyle).setOrigin(1, 0);

            

            console.log(this.time);
        }

        tileWidth: integer = 40;
        tileHeight: integer = 40;

        update ()
        {
            //console.log(this.time.now);
            this.wizard.draw();
            this.warrior.draw();
            this.priest.draw();
            this.dragon.draw();
            
            this.text_wizardHealth.setText(`${this.wizard.character.health} / ${this.wizard.character.maxHealth}`);
            this.text_warriorHealth.setText(`${this.warrior.character.health} / ${this.warrior.character.maxHealth}`);
            this.text_priestHealth.setText(`${this.priest.character.health} / ${this.priest.character.maxHealth}`);
            this.text_dragonHealth.setText(`${this.dragon.character.health} / ${this.dragon.character.maxHealth}`);
        }
    }
}