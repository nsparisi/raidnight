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
        
        img_background: Phaser.GameObjects.Image;
        overgrowths: Overgrowth_Sprite[];
        
        priest: Character;
        knight: Character;
        wizard: Character;
        dragon: Character;
        mossDragon: Character;
        devilVine: Character;
        corpseFlower: Character;
        timeDragon: Character;
        room: Room;
        prisms: Character[] = [];

        text_TurnCount: Phaser.GameObjects.Text;
        gfx_TurnBox: Phaser.GameObjects.Graphics;

        text_priestHealth: Phaser.GameObjects.Text;
        text_knightHealth: Phaser.GameObjects.Text;
        text_wizardHealth: Phaser.GameObjects.Text;
        text_priestMana: Phaser.GameObjects.Text;
        text_knightMana: Phaser.GameObjects.Text;
        text_wizardMana: Phaser.GameObjects.Text;
        text_dragonHealth: Phaser.GameObjects.Text;

        gfx_upperHealthBox: Phaser.GameObjects.Graphics;
        gfx_lowerHealthBox: Phaser.GameObjects.Graphics;

        tileWidth: integer = 40;
        tileHeight: integer = 40;
        lastKnownTurn: integer = -1;

        allSkillEffects: SpellEffect[];

        textManager: TextManager;

        preload ()
        {
            this.load.image('assets/map1.png', 'assets/map1.png');
            this.load.image('assets/map2.png', 'assets/map2.png');
            this.load.image('assets/map3.png', 'assets/map3.png');
            this.load.image('assets/scroll.png', 'assets/scroll.png');

            this.load.image('assets/knight.png', 'assets/knight.png');
            this.load.image('assets/wizard.png', 'assets/wizard.png');
            this.load.image('assets/priest.png', 'assets/priest.png');
            this.load.image('assets/dragon.png', 'assets/dragon.png');
            this.load.image('assets/devil_vine.png', 'assets/devil_vine.png');
            this.load.image('assets/corpse_flower.png', 'assets/corpse_flower.png');
            this.load.image('assets/prism.png', 'assets/prism.png');

            // status
            this.load.image('assets/status/st_claw.png', 'assets/status/st_claw.png');
            this.load.image('assets/status/st_divineintervention.png', 'assets/status/st_divineintervention.png');
            this.load.image('assets/status/st_frostbite.png', 'assets/status/st_frostbite.png');
            this.load.image('assets/status/st_heatwave.png', 'assets/status/st_heatwave.png');
            this.load.image('assets/status/st_iceshard.png', 'assets/status/st_iceshard.png');
            this.load.image('assets/status/st_ignite.png', 'assets/status/st_ignite.png');
            this.load.image('assets/status/st_phalanx.png', 'assets/status/st_phalanx.png');
            this.load.image('assets/status/st_pierce.png', 'assets/status/st_pierce.png');
            this.load.image('assets/status/st_regen.png', 'assets/status/st_regen.png');
            this.load.image('assets/status/st_shieldbash.png', 'assets/status/st_shieldbash.png');
            this.load.image('assets/status/st_shieldwall.png', 'assets/status/st_shieldwall.png');
            this.load.image('assets/status/st_taunt.png', 'assets/status/st_taunt.png');
            this.load.image('assets/status/st_waterbarrier.png', 'assets/status/st_waterbarrier.png');
            
            // status round 2
            this.load.image('assets/status/st_scorch.png', 'assets/status/st_scorch.png');
            this.load.image('assets/status/st_cauterize.png', 'assets/status/st_cauterize.png');
            this.load.image('assets/status/st_firebarrier.png', 'assets/status/st_firebarrier.png');
            this.load.image('assets/status/st_heatingup.png', 'assets/status/st_heatingup.png');
            this.load.image('assets/status/st_bind.png', 'assets/status/st_bind.png');
            this.load.image('assets/status/st_enhancedbind.png', 'assets/status/st_enhancedbind.png');
            this.load.image('assets/status/st_venomousbite.png', 'assets/status/st_venomousbite.png');
            this.load.image('assets/status/st_miasma.png', 'assets/status/st_miasma.png');
            this.load.image('assets/status/st_miasmata.png', 'assets/status/st_miasmata.png');

            // status round 3
            this.load.image('assets/status/st_iceshardultra.png', 'assets/status/st_iceshardultra.png');
            this.load.image('assets/status/st_frostbiteultra.png', 'assets/status/st_frostbiteultra.png');
            this.load.image('assets/status/st_overheating.png', 'assets/status/st_overheating.png');
            this.load.image('assets/status/st_halt.png', 'assets/status/st_halt.png');

            // skill round 2
            this.load.image('assets/skill/wizard/sk_firebarrier.png', 'assets/skill/wizard/sk_firebarrier.png');
            this.load.image('assets/skill/wizard/sk_kindle.png', 'assets/skill/wizard/sk_kindle.png');
            this.load.image('assets/skill/wizard/sk_scorch.png', 'assets/skill/wizard/sk_scorch.png');
            this.load.image('assets/skill/wizard/sk_cauterize.png', 'assets/skill/wizard/sk_cauterize.png');
            this.load.image('assets/skill/wizard/sk_cauterize_particle.png', 'assets/skill/wizard/sk_cauterize_particle.png');
            this.load.image('assets/skill/particle.png', 'assets/skill/particle.png');
            this.load.image('assets/skill/dragon/sk_tailswipe.png', 'assets/skill/dragon/sk_tailswipe.png');
            this.load.image('assets/skill/dragon/st_venomousbite.png', 'assets/skill/dragon/st_venomousbite.png');
            this.load.image('assets/skill/dragon/st_venomousbite2.png', 'assets/skill/dragon/st_venomousbite2.png');
            this.load.image('assets/skill/dragon/sk_whip.png', 'assets/skill/dragon/sk_whip.png');
            this.load.image('assets/skill/dragon/sk_bind.png', 'assets/skill/dragon/sk_bind.png');
            this.load.image('assets/skill/dragon/sk_miasma.png', 'assets/skill/dragon/sk_miasma.png');
            this.load.image('assets/overgrowth.png', 'assets/overgrowth.png');
            
            // skill round 3
            this.load.image('assets/skill/wizard/sk_coolingwinds.png', 'assets/skill/wizard/sk_coolingwinds.png');
            this.load.image('assets/skill/dragon/sk_time_bg.png', 'assets/skill/dragon/sk_time_bg.png');
            this.load.image('assets/skill/dragon/sk_time_hour.png', 'assets/skill/dragon/sk_time_hour.png');
            this.load.image('assets/skill/dragon/sk_time_min.png', 'assets/skill/dragon/sk_time_min.png');

            // skill
            this.load.image('assets/skill/knight/sk_phalanx.png', 'assets/skill/knight/sk_phalanx.png');
            this.load.image('assets/skill/knight/sk_pierce.png', 'assets/skill/knight/sk_pierce.png');
            this.load.image('assets/skill/knight/sk_shieldbash.png', 'assets/skill/knight/sk_shieldbash.png');
            this.load.image('assets/skill/knight/sk_shieldwall.png', 'assets/skill/knight/sk_shieldwall.png');
            this.load.image('assets/skill/knight/sk_strike.png', 'assets/skill/knight/sk_strike.png');
            this.load.image('assets/skill/knight/sk_taunt.png', 'assets/skill/knight/sk_taunt.png');
            
            this.load.image('assets/skill/priest/sk_divineintervention.png', 'assets/skill/priest/sk_divineintervention.png');
            this.load.image('assets/skill/priest/sk_flashheal.png', 'assets/skill/priest/sk_flashheal.png');
            this.load.image('assets/skill/priest/sk_greaterheal.png', 'assets/skill/priest/sk_greaterheal.png');
            this.load.image('assets/skill/priest/sk_hymn.png', 'assets/skill/priest/sk_hymn.png');
            this.load.image('assets/skill/priest/sk_regen.png', 'assets/skill/priest/sk_regen.png');
            this.load.image('assets/skill/priest/sparkle.png', 'assets/skill/priest/sparkle.png');
            
            this.load.image('assets/skill/wizard/sk_deluge.png', 'assets/skill/wizard/sk_deluge.png');
            this.load.image('assets/skill/wizard/sk_frostbite.png', 'assets/skill/wizard/sk_frostbite.png');
            this.load.image('assets/skill/wizard/sk_iceshard.png', 'assets/skill/wizard/sk_iceshard.png');
            this.load.image('assets/skill/wizard/sk_icespear.png', 'assets/skill/wizard/sk_icespear.png');
            this.load.image('assets/skill/wizard/sk_waterbarrier.png', 'assets/skill/wizard/sk_waterbarrier.png');

            this.load.image('assets/skill/dragon/sk_firestorm.png', 'assets/skill/dragon/sk_firestorm.png');
            this.load.image('assets/skill/dragon/sk_firestorm_floor.png', 'assets/skill/dragon/sk_firestorm_floor.png');
            this.load.image('assets/skill/dragon/sk_claw.png', 'assets/skill/dragon/sk_claw.png');

            this.load.image('assets/heatwave.jpg', 'assets/heatwave.jpg');
            this.load.image('assets/spike.png', 'assets/spike.png');
            this.load.spritesheet('assets/ss_fire.png', 'assets/ss_fire.png', {frameWidth:39, frameHeight: 40});

            this.allSkillEffects = [];
            this.overgrowths = [];
        }

        create ()
        {
            this.textManager = new TextManager(this);

            this.newGame();

            this.gfx_upperHealthBox = this.add.graphics().setDepth(DepthLayer.HUD);
            this.gfx_upperHealthBox.fillStyle(0x000000, 0.7);
            this.gfx_upperHealthBox.fillRoundedRect(35, 40, 490, 70);
            
            this.gfx_lowerHealthBox = this.add.graphics().setDepth(DepthLayer.HUD);
            this.gfx_lowerHealthBox.fillStyle(0x000000, 0.7);
            this.gfx_lowerHealthBox.fillRect(36, 527, 250, 25);

            let nameStyle = {fontSize: "20px", fill: "#FFF", align: "left"};
            let healthStyle = {fontSize: "20px", fill: "#FFF", align: "right"};
            this.add.text(45,45, "KNIGHT:", nameStyle).setDepth(DepthLayer.HUD);
            this.add.text(45,65, "PRIEST:", nameStyle).setDepth(DepthLayer.HUD);
            this.add.text(45,85, "WIZARD:", nameStyle).setDepth(DepthLayer.HUD);
            this.add.text(45,530, "DRAGON:", nameStyle).setDepth(DepthLayer.HUD);
            this.text_knightHealth = this.add.text(285,45, "", healthStyle).setOrigin(1, 0).setDepth(DepthLayer.HUD);
            this.text_priestHealth =  this.add.text(285,65, "", healthStyle).setOrigin(1, 0).setDepth(DepthLayer.HUD);
            this.text_wizardHealth =  this.add.text(285,85, "", healthStyle).setOrigin(1, 0).setDepth(DepthLayer.HUD);
            this.text_dragonHealth =  this.add.text(280,530, "", healthStyle).setOrigin(1, 0).setDepth(DepthLayer.HUD);
            this.text_knightMana = this.add.text(500,45, "", healthStyle).setOrigin(1, 0).setDepth(DepthLayer.HUD);
            this.text_priestMana =  this.add.text(500,65, "", healthStyle).setOrigin(1, 0).setDepth(DepthLayer.HUD);
            this.text_wizardMana =  this.add.text(500,85, "", healthStyle).setOrigin(1, 0).setDepth(DepthLayer.HUD);

            // upper-right turn box
            this.gfx_TurnBox = this.add.graphics().setDepth(DepthLayer.HUD);
            this.gfx_TurnBox.fillStyle(0x000000, 0.7);
            this.gfx_TurnBox.fillRect(645, 7, 140, 25);

            this.add.text(650, 10, "TURN:", nameStyle).setDepth(DepthLayer.HUD);
            this.text_TurnCount = this.add.text(780, 10, "123", healthStyle).setOrigin(1, 0).setDepth(DepthLayer.HUD);

            this.lastKnownTurn = -1;

            /* // playing with particles
            let startrect = new Phaser.Geom.Rectangle(0, 0, 50, 200);
            let endrect = new Phaser.Geom.Rectangle(200, 0, 50, 200);
            this.particles = this.add.particles("assets/skill/particle.png");
            this.particles.createEmitter({
                x: 200,
                y: 200,
                blendMode: 'ADD',
                frequency: 20,
                lifespan: 2000,
                //speedY: -50,
                speedX: 200,
                //accelerationX: 1000,
                tint: 0xFF0000,
                scale: {start: 0.5, end: 0.5},
                
                //emitZone: this.rect
            }).setEmitZone({source: startrect}).setDeathZone({source: endrect});
            */
        }

        //particles: Phaser.GameObjects.Particles.ParticleEmitterManager;

        winGame = () =>
        {
            let text = "NICE WORK!\r\n\r\nTHE ANSWER \r\nIS..."
        }

        newGame = () =>
        {
            if(this.img_background){this.img_background.destroy();}
            if(this.wizard){this.wizard.destroy();}
            if(this.knight){this.knight.destroy();}
            if(this.priest){this.priest.destroy();}
            if(this.dragon){this.dragon.destroy();}
            if(this.mossDragon){this.mossDragon.destroy();}
            if(this.devilVine){this.devilVine.destroy();}
            if(this.corpseFlower){this.corpseFlower.destroy();}
            if(this.timeDragon){this.timeDragon.destroy();}
            if(this.room){this.room.destroy();}
            this.prisms.forEach((prism) => { if(prism){ prism.destroy(); } });
            this.prisms = [];
            this.overgrowths.forEach((growth) => { if(growth){ growth.destroy(); } });
            this.overgrowths = [];
            this.clearSkillEffects();

            let char_priest: RaidNight.Engine.Character = null;
            let char_knight: RaidNight.Engine.Character = null;
            let char_wizard: RaidNight.Engine.Character = null;
            let char_dragon: RaidNight.Engine.Character = null;
            let char_mossdragon: RaidNight.Engine.Character = null;
            let char_devilVine: RaidNight.Engine.Character = null;
            let char_corpseFlower: RaidNight.Engine.Character = null;
            let char_timeDragon: RaidNight.Engine.Character = null;
            let char_prisms: RaidNight.Engine.SandPrism[] = [];
            let char_room = GLOBAL_GAME.arena.room;

            let i = 0;
            for(i = 0; i < GLOBAL_GAME.arena.allies.length; i++)
            {
                if (GLOBAL_GAME.arena.allies[i].name.toUpperCase() == "PRIEST")
                {
                    char_priest = GLOBAL_GAME.arena.allies[i];
                }
                else if (GLOBAL_GAME.arena.allies[i].name.toUpperCase() == "KNIGHT")
                {
                    char_knight = GLOBAL_GAME.arena.allies[i];
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
                else if (GLOBAL_GAME.arena.enemies[i].name.toUpperCase() == "MOSSDRAGON")
                {
                    char_mossdragon = GLOBAL_GAME.arena.enemies[i];
                }
                else if (GLOBAL_GAME.arena.enemies[i].name.toUpperCase() == "DEVILVINE")
                {
                    char_devilVine = GLOBAL_GAME.arena.enemies[i];
                }
                else if (GLOBAL_GAME.arena.enemies[i].name.toUpperCase() == "CORPSEFLOWER")
                {
                    char_corpseFlower = GLOBAL_GAME.arena.enemies[i];
                }
                else if (GLOBAL_GAME.arena.enemies[i].name.toUpperCase() == "TIMEDRAGON")
                {
                    char_timeDragon = GLOBAL_GAME.arena.enemies[i];
                }
                else if(GLOBAL_GAME.arena.enemies[i].name.toUpperCase().indexOf("SANDPRISM") >= 0)
                {
                    char_prisms.push(GLOBAL_GAME.arena.enemies[i] as RaidNight.Engine.SandPrism);
                }
            }

            this.wizard = new Character(this, char_wizard, this.add.sprite(600, 100, 'assets/wizard.png'), false);
            this.knight = new Character(this, char_knight, this.add.sprite(600, 300, 'assets/knight.png'), false);
            this.priest = new Character(this, char_priest, this.add.sprite(600, 500, 'assets/priest.png'), false);

            if (GLOBAL_GAME.fightType == Engine.FightType.Fight1)
            {
                this.dragon = new Character(this, char_dragon, this.add.sprite(100, 500, 'assets/dragon.png'), true);
                this.dragon.sprite.setFlipX(true);
                this.img_background = this.add.image(0, 0, 'assets/map1.png').setOrigin(0, 0).setDepth(DepthLayer.Background);
            }
            else if (GLOBAL_GAME.fightType == Engine.FightType.Fight2)
            {
                this.mossDragon = new Character(this, char_mossdragon, this.add.sprite(100, 500, 'assets/dragon.png'), true);
                this.mossDragon.sprite.setFlipX(true);
                this.devilVine = new Character(this, char_devilVine, this.add.sprite(100, 500, 'assets/devil_vine.png'), true);
                this.devilVine.sprite.setFlipX(true);
                this.corpseFlower = new Character(this, char_corpseFlower, this.add.sprite(100, 500, 'assets/corpse_flower.png'), true);
                this.corpseFlower.sprite.setFlipX(true);
                this.img_background = this.add.image(0, 0, 'assets/map2.png').setOrigin(0, 0).setDepth(DepthLayer.Background);

                for(let x = 0; x < GLOBAL_GAME.arena.room.width; x++)
                {
                    for(let y = 0; y < GLOBAL_GAME.arena.room.height; y++)
                    {
                        let overgrowthsprite = this.add.sprite(
                            x * this.tileWidth + this.tileWidth / 2, 
                            y * this.tileHeight + this.tileHeight / 2, 
                            'assets/overgrowth.png');
                        this.overgrowths.push(new Overgrowth_Sprite(overgrowthsprite, x, y));
                    }
                }
            }
            else if (GLOBAL_GAME.fightType == Engine.FightType.Fight3)
            {
                this.timeDragon = new Character(this, char_timeDragon, this.add.sprite(100, 500, 'assets/dragon.png'), true);
                this.timeDragon.sprite.setFlipX(true);
                char_prisms.forEach((char_prism) =>
                {
                    this.prisms.push(new Prism(this, char_prism, this.add.sprite(100, 500, 'assets/prism.png'), true));
                })

                this.img_background = this.add.image(0, 0, 'assets/map3.png').setOrigin(0, 0).setDepth(DepthLayer.Background);
            }

            this.room = new Room(this, char_room);
        }

        update ()
        {
            this.textManager.update();

            let isNewTurn = false;
            if (GLOBAL_GAME.arena.turn != this.lastKnownTurn)
            {
                this.lastKnownTurn = GLOBAL_GAME.arena.turn;
                isNewTurn = true;

                if (GLOBAL_GAME.arena.turn == 0 || GLOBAL_GAME.arena.turn == 1)
                {
                    this.newGame();
                }

                if (GLOBAL_GAME.arena.state == RaidNight.Engine.ArenaState.Win)
                {
                    this.winGame();
                }
            }

            this.wizard.update(isNewTurn);
            this.knight.update(isNewTurn);
            this.priest.update(isNewTurn);

            if(this.devilVine){this.devilVine.update(isNewTurn);}
            if(this.corpseFlower){this.corpseFlower.update(isNewTurn);}
            this.prisms.forEach((prism)=>{prism.update(isNewTurn)});
            this.overgrowths.forEach((growth)=>{growth.update(isNewTurn)});
            
            if (this.dragon)
            {
                this.dragon.update(isNewTurn);
                this.text_dragonHealth.setText(`${this.dragon.character.health.toFixed(0)}/${this.dragon.character.maxHealth}`);
            }
            else if (this.mossDragon)
            {
                this.mossDragon.update(isNewTurn);
                this.text_dragonHealth.setText(`${this.mossDragon.character.health.toFixed(0)}/${this.mossDragon.character.maxHealth}`);
            }
            else if (this.timeDragon)
            {
                this.timeDragon.update(isNewTurn);
                this.text_dragonHealth.setText(`${this.timeDragon.character.health.toFixed(0)}/${this.timeDragon.character.maxHealth}`);
            }

            this.room.update(isNewTurn);
            
            this.text_wizardHealth.setText(`${this.wizard.character.health.toFixed(0)} / ${this.wizard.character.maxHealth} HP`);
            this.text_knightHealth.setText(`${this.knight.character.health.toFixed(0)} / ${this.knight.character.maxHealth} HP`);
            this.text_priestHealth.setText(`${this.priest.character.health.toFixed(0)} / ${this.priest.character.maxHealth} HP`);
            this.text_wizardMana.setText(`${this.wizard.character.mana.toFixed(0)} / ${this.wizard.character.maxMana} MANA`);
            this.text_knightMana.setText(`${this.knight.character.mana.toFixed(0)} / ${this.knight.character.maxMana} MANA`);
            this.text_priestMana.setText(`${this.priest.character.mana.toFixed(0)} / ${this.priest.character.maxMana} MANA`);

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

        clearSkillEffects()
        {
            while (this.allSkillEffects.length != 0)
            {
                this.allSkillEffects[0].destroy();
                this.allSkillEffects.splice(0,1);
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

    class Overgrowth_Sprite
    {
        sprite: Phaser.GameObjects.Sprite;
        tileX: integer;
        tileY: integer;

        constructor(sprite: Phaser.GameObjects.Sprite, tileX: integer, tileY: integer)
        {
            this.sprite = sprite;
            this.tileX = tileX;
            this.tileY = tileY;
            
            this.sprite.setDepth(DepthLayer.Low_Priority);
            this.sprite.setVisible(false);
        }

        update(newTurn: boolean)
        {
            if(newTurn)
            {
                this.sprite.setVisible(
                    GLOBAL_GAME.arena.room.damageFromFloorEffect(this.tileX, this.tileY) != 0);
            }
        }

        destroy()
        {
            this.sprite.destroy();
        }
    }
}