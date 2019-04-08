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

    export enum DepthLayer 
    {
        Background = -10,
        Low_Priority = -1,
        Med_Priority = 0,
        High_Priority = 1,
        HUD = 10
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
        room: Room;

        text_TurnCount: Phaser.GameObjects.Text;
        gfx_TurnBox: Phaser.GameObjects.Graphics;

        text_priestHealth: Phaser.GameObjects.Text;
        text_warriorHealth: Phaser.GameObjects.Text;
        text_wizardHealth: Phaser.GameObjects.Text;
        text_dragonHealth: Phaser.GameObjects.Text;

        gfx_upperHealthBox: Phaser.GameObjects.Graphics;
        gfx_lowerHealthBox: Phaser.GameObjects.Graphics;

        tileWidth: integer = 40;
        tileHeight: integer = 40;
        lastKnownTurn: integer = -1;

        allSkillEffects: SpellEffect[];

        preload ()
        {
            this.load.image('assets/bg_dungeon.png', 'assets/bg_dungeon.png');

            this.load.image('assets/warrior.png', 'assets/warrior.png');
            this.load.image('assets/wizard.png', 'assets/wizard.png');
            this.load.image('assets/priest.png', 'assets/priest.png');
            this.load.image('assets/dragon.png', 'assets/dragon.png');

            this.load.image('assets/status/st_fortify.png', 'assets/status/st_fortify.png');
            this.load.image('assets/status/st_heatwave.png', 'assets/status/st_heatwave.png');
            this.load.image('assets/status/st_ignite.png', 'assets/status/st_ignite.png');
            this.load.image('assets/status/st_regen.png', 'assets/status/st_regen.png');
            this.load.image('assets/status/st_taunt.png', 'assets/status/st_taunt.png');
            
            this.load.image('assets/spike.png', 'assets/spike.png');
            this.load.spritesheet('assets/ss_fire.png', 'assets/ss_fire.png', {frameWidth:39, frameHeight: 40});

            this.allSkillEffects = [];
        }

        create ()
        {

            this.add.image(0, 0, 'assets/bg_dungeon.png').setOrigin(0, 0);

            this.newGame();

            this.gfx_upperHealthBox = this.add.graphics().setDepth(DepthLayer.HUD);
            this.gfx_upperHealthBox.fillStyle(0x000000, 0.7);
            this.gfx_upperHealthBox.fillRoundedRect(35, 40, 254, 70);
            
            this.gfx_lowerHealthBox = this.add.graphics().setDepth(DepthLayer.HUD);
            this.gfx_lowerHealthBox.fillStyle(0x000000, 0.7);
            this.gfx_lowerHealthBox.fillRect(36, 527, 250, 25);

            let nameStyle = {fontSize: "20px", fill: "#FFF", align: "left"};
            let healthStyle = {fontSize: "20px", fill: "#FFF", align: "right"};
            this.add.text(45,45, "WIZARD:", nameStyle).setDepth(DepthLayer.HUD);
            this.add.text(45,65, "WARRIOR:", nameStyle).setDepth(DepthLayer.HUD);
            this.add.text(45,85, "PRIEST:", nameStyle).setDepth(DepthLayer.HUD);
            this.add.text(45,530, "DRAGON:", nameStyle).setDepth(DepthLayer.HUD);
            this.text_wizardHealth =  this.add.text(280,45, "", healthStyle).setOrigin(1, 0).setDepth(DepthLayer.HUD);
            this.text_warriorHealth = this.add.text(280,65, "", healthStyle).setOrigin(1, 0).setDepth(DepthLayer.HUD);
            this.text_priestHealth =  this.add.text(280,85, "", healthStyle).setOrigin(1, 0).setDepth(DepthLayer.HUD);
            this.text_dragonHealth =  this.add.text(280,530, "", healthStyle).setOrigin(1, 0).setDepth(DepthLayer.HUD);

            // upper-right turn box
            this.gfx_TurnBox = this.add.graphics().setDepth(DepthLayer.HUD);
            this.gfx_TurnBox.fillStyle(0x000000, 0.7);
            this.gfx_TurnBox.fillRect(645, 7, 140, 25);

            this.add.text(650, 10, "TURN:", nameStyle).setDepth(DepthLayer.HUD);
            this.text_TurnCount = this.add.text(780, 10, "123", healthStyle).setOrigin(1, 0).setDepth(DepthLayer.HUD);

            this.lastKnownTurn = -1;
        }

        newGame = () =>
        {
            if(this.wizard){this.wizard.destroy();}
            if(this.warrior){this.warrior.destroy();}
            if(this.priest){this.priest.destroy();}
            if(this.dragon){this.dragon.destroy();}
            if(this.room){this.room.destroy();}

            let char_priest: RaidNight.Engine.Character = null;
            let char_warrior: RaidNight.Engine.Character = null;
            let char_wizard: RaidNight.Engine.Character = null;
            let char_dragon: RaidNight.Engine.Character = null;
            let char_room = GLOBAL_GAME.arena.room;

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
            this.room = new Room(this, char_room);
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

            if (isNewTurn && this.lastKnownTurn == 1)
            {
                this.newGame();
            } 

            //console.log(this.time.now);
            this.wizard.update(isNewTurn);
            this.warrior.update(isNewTurn);
            this.priest.update(isNewTurn);
            this.dragon.update(isNewTurn);
            this.room.update(isNewTurn);
            
            this.text_wizardHealth.setText(`${this.wizard.character.health} / ${this.wizard.character.maxHealth}`);
            this.text_warriorHealth.setText(`${this.warrior.character.health} / ${this.warrior.character.maxHealth}`);
            this.text_priestHealth.setText(`${this.priest.character.health} / ${this.priest.character.maxHealth}`);
            this.text_dragonHealth.setText(`${this.dragon.character.health} / ${this.dragon.character.maxHealth}`);

            this.text_TurnCount.setText(`${GLOBAL_GAME.arena.turn}`);

            // do new stuff
            for (let i = 0; i < this.allSkillEffects.length; i++)
            {
                this.allSkillEffects[i].update();

                if (this.allSkillEffects[i].isFinished())
                {
                    this.allSkillEffects[i].destroy();
                    this.allSkillEffects.splice(i,1);
                    i--;
                }
            }

            if (Debug.DebugEnabled)
            {
                this.debug();
            }
        }

        addSkillEffect = (effect: SpellEffect) =>
        {
            this.allSkillEffects.push(effect);
        }

        debug()
        {
            for (let i = 0; i < this.allSkillEffects.length; i++)
            {
                this.allSkillEffects[i].debug();
            }
        }
    }
}