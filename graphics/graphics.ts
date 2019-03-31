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
                scene: Scene_Arena, 
                parent: "Game"
            });
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

        tileWidth: integer = 40;
        tileHeight: integer = 40;
        lastKnownTurn: integer = -1;

        allSkillEffects: SpellEffect_Fireball[];

        preload ()
        {
            this.load.image('assets/bg_dungeon.png', 'assets/bg_dungeon.png');

            this.load.image('assets/warrior.png', 'assets/warrior.png');
            this.load.image('assets/wizard.png', 'assets/wizard.png');
            this.load.image('assets/priest.png', 'assets/priest.png');
            this.load.image('assets/dragon.png', 'assets/dragon.png');
            
            this.load.spritesheet('assets/ss_fire.png', 'assets/ss_fire.png', {frameWidth:39, frameHeight: 40});

            this.allSkillEffects = [];
        }

        create ()
        {

            this.add.image(0, 0, 'assets/bg_dungeon.png').setOrigin(0, 0);

            this.newGame();

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

            this.lastKnownTurn = -1;
        }

        newGame = () =>
        {
            if(this.wizard){this.wizard.destroy();}
            if(this.warrior){this.warrior.destroy();}
            if(this.priest){this.priest.destroy();}
            if(this.dragon){this.dragon.destroy();}

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

            this.wizard = new Character(this, char_wizard, this.add.sprite(600, 100, 'assets/wizard.png'));
            this.warrior = new Character(this, char_warrior, this.add.sprite(600, 300, 'assets/warrior.png'));
            this.priest = new Character(this, char_priest, this.add.sprite(600, 500, 'assets/priest.png'));
            this.dragon = new Character(this, char_dragon, this.add.sprite(100, 500, 'assets/dragon.png'));
            this.dragon.sprite.setFlipX(true);
        }

        update ()
        {
            if(GLOBAL_GAME.arena.state == RaidNight.Engine.ArenaState.NotStarted)
            {
                return;
            }

            let isNewTurn = false;
            if (GLOBAL_GAME.arena.turn != this.lastKnownTurn)
            {
                this.lastKnownTurn = GLOBAL_GAME.arena.turn;
                isNewTurn = true;
            }

            if (this.lastKnownTurn == 0 && isNewTurn)
            {
                console.log("NewGame");
                this.newGame();
            }

            //console.log(this.time.now);
            this.wizard.draw(isNewTurn);
            this.warrior.draw(isNewTurn);
            this.priest.draw(isNewTurn);
            this.dragon.draw(isNewTurn);
            
            this.text_wizardHealth.setText(`${this.wizard.character.health} / ${this.wizard.character.maxHealth}`);
            this.text_warriorHealth.setText(`${this.warrior.character.health} / ${this.warrior.character.maxHealth}`);
            this.text_priestHealth.setText(`${this.priest.character.health} / ${this.priest.character.maxHealth}`);
            this.text_dragonHealth.setText(`${this.dragon.character.health} / ${this.dragon.character.maxHealth}`);

            // do new stuff
            let i = 0;
            for (i = 0; i < this.allSkillEffects.length; i++)
            {
                this.allSkillEffects[i].update();

                if (this.allSkillEffects[i].tween.totalProgress >= 1)
                {
                    this.allSkillEffects[i].destroy();
                    this.allSkillEffects.splice(i,1);
                    i--;
                }
            }
        }

        addSkillEffect = (effect: SpellEffect_Fireball) =>
        {
            this.allSkillEffects.push(effect);
        }
    }

    class SpellEffect_Fireball
    {
        scene: Scene_Arena;
        sprite: Phaser.GameObjects.Sprite;
        path: Phaser.Curves.Path;
        tween: Phaser.Tweens.Tween;

        gfx: Phaser.GameObjects.Graphics;

        create = (scene: Scene_Arena, start: Phaser.Math.Vector2, end: Phaser.Math.Vector2) =>
        {
            this.scene = scene;

            let spellStyle = {fontSize: "20px", fill: "#FFF", align: "center"};
            //this.scene.add.text(0, 0, "SPELL", spellStyle);

            let xNormal = end.x > start.x ? 1 : -1;
            let yNormal = Math.random() * 2 - 1;

            this.sprite = this.scene.add.sprite(start.x, start.y, "assets/ss_fire.png", 0);
            this.sprite.setBlendMode(Phaser.BlendModes.ADD);
            this.path = new Phaser.Curves.Path(start.x, start.y);
            this.path.cubicBezierTo(
                end.x, end.y,
                start.x + 100 * xNormal * -1, start.y + (yNormal * 150), 
                //end.subtract(start).divide(new Phaser.Math.Vector2(2,2).add(start)), 
                end.x, end.y);

            this.tween = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: GLOBAL_GAME.frameLengthMs * 0.6,
                ease: "Cubic.easeInOut"
            });

            this.gfx = this.scene.add.graphics();

            return this;
        }

        update = () =>
        {
            let position = this.path.getPoint(this.tween.getValue());
            this.sprite.setPosition(position.x, position.y);

            this.gfx.clear();
            this.gfx.lineStyle(2, 0xFF0000, 1);
            //this.path.draw(this.gfx);
        }

        destroy = () =>
        {
            this.sprite.destroy();
            this.path.destroy();
            this.tween.stop();
            this.gfx.destroy();
        }
    }

    class Character
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
            
            this.gfx_healthBlack = this.scene.add.graphics();
            this.gfx_healthRed = this.scene.add.graphics();
            this.gfx_healthGreen = this.scene.add.graphics();


            this.gfx_healthBlack.fillRoundedRect(35, 40, 254, 70);
        }

        destroy = () =>
        {
            this.gfx_healthBlack.destroy();
            this.gfx_healthRed.destroy();
            this.gfx_healthGreen.destroy();
            this.sprite.destroy();
        }

        draw = (newTurn: boolean) => 
        {
            let centerX = this.character.x * this.scene.tileWidth + this.sprite.width / 2;
            let centerY = this.character.y * this.scene.tileHeight + this.sprite.height / 2;

            this.sprite.setPosition(
                centerX, 
                centerY);

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

            if (newTurn)
            {
                if (this.character.currentAction != null && 
                    this.character.currentAction.type == RaidNight.Engine.ActionType.Skill &&
                    this.character.isCasting == false)
                {
                    let start = new Phaser.Math.Vector2(centerX, centerY);

                    let target = GLOBAL_GAME.arena.lookupTarget(this.character.currentAction.target);
                    let targetX = target.x * this.scene.tileWidth + this.sprite.width / 2;
                    let targetY = target.y * this.scene.tileHeight + this.sprite.height / 2;
                    let end = new Phaser.Math.Vector2(targetX, targetY);

                    let fb = new SpellEffect_Fireball().create(this.scene, start, end);
                    this.scene.addSkillEffect(fb);
                }
            }
        }
    }
}