module RaidNight.Graphics
{
    export class Character
    {
        sprite: Phaser.GameObjects.Sprite;
        scene: Scene_Arena;
        character: RaidNight.Engine.Character;

        gfx_healthBlack: Phaser.GameObjects.Graphics;
        gfx_healthRed: Phaser.GameObjects.Graphics;
        gfx_healthGreen: Phaser.GameObjects.Graphics;
        
        gfx_manaBlack: Phaser.GameObjects.Graphics;
        gfx_manaBlue: Phaser.GameObjects.Graphics;

        buffPanel: BuffPanel;

        constructor (scene: Scene_Arena, char_reference: RaidNight.Engine.Character, sprite: Phaser.GameObjects.Sprite)
        {
            this.scene = scene;
            this.character = char_reference;
            this.sprite = sprite;
            
            this.gfx_healthBlack = this.scene.add.graphics().setDepth(DepthLayer.High_Priority);
            this.gfx_healthRed = this.scene.add.graphics().setDepth(DepthLayer.High_Priority);
            this.gfx_healthGreen = this.scene.add.graphics().setDepth(DepthLayer.High_Priority);
            
            this.gfx_manaBlack = this.scene.add.graphics().setDepth(DepthLayer.High_Priority);
            this.gfx_manaBlue = this.scene.add.graphics().setDepth(DepthLayer.High_Priority);

            this.buffPanel = new BuffPanel(this.scene, this.character);
        }

        destroy = () =>
        {
            this.gfx_healthBlack.destroy();
            this.gfx_healthRed.destroy();
            this.gfx_healthGreen.destroy();
            this.gfx_manaBlack.destroy();
            this.gfx_manaBlue.destroy();
            this.sprite.destroy();
            this.buffPanel.destroy();
        }

        update = (newTurn: boolean) => 
        {
            let centerX = this.character.x * this.scene.tileWidth + this.sprite.width / 2;
            let centerY = this.character.y * this.scene.tileHeight + this.sprite.height / 2;

            this.sprite.setPosition(
                centerX, 
                centerY);

            let blackPadding = 2;
            let redWidth = 40;
            let greenWidth = redWidth * (this.character.health / this.character.maxHealth);
            let blueWidth = redWidth * (this.character.mana / this.character.maxMana);
            let colorHeight = 7;
            let yOffset = 25;
            let manaYOffset = 37;

            this.gfx_healthBlack.clear();
            this.gfx_healthBlack.fillStyle(0x000000, 0.6);
            this.gfx_healthBlack.fillRect(
                centerX - (redWidth / 2) - blackPadding, 
                centerY + yOffset - blackPadding, 
                redWidth + (blackPadding*2), 
                colorHeight + (blackPadding*2));

            this.gfx_healthRed.clear();
            this.gfx_healthRed.fillStyle(0xFF2255, 1.0);
            this.gfx_healthRed.fillRect(
                centerX - (redWidth / 2), 
                centerY + yOffset, 
                redWidth, 
                colorHeight);

            this.gfx_healthGreen.clear();
            this.gfx_healthGreen.fillStyle(0x22CC88, 1.0);
            this.gfx_healthGreen.fillRect(
                centerX - (redWidth / 2), 
                centerY + yOffset, 
                greenWidth, 
                colorHeight);

            this.gfx_manaBlack.clear();
            this.gfx_manaBlack.fillStyle(0x000000, 0.6);
            this.gfx_manaBlack.fillRect(
                centerX - (redWidth / 2) - blackPadding, 
                centerY + manaYOffset - blackPadding, 
                redWidth + (blackPadding*2), 
                colorHeight + (blackPadding*2));

            this.gfx_manaBlue.clear();
            this.gfx_manaBlue.fillStyle(0x2255CC, 1.0);
            this.gfx_manaBlue.fillRect(
                centerX - (redWidth / 2), 
                centerY + manaYOffset, 
                blueWidth, 
                colorHeight);

            this.buffPanel.update(newTurn);

            if (this.character.isDead())
            {
                return;
            }

            if (newTurn)
            {
                if (this.character.currentAction != null && 
                    this.character.currentAction.type == RaidNight.Engine.ActionType.Skill &&
                    this.character.isCasting == false)
                {
                    let start = new Phaser.Math.Vector2(centerX, centerY);

                    for(let i = 0; i < this.character.currentAction.targets.length; i++)
                    {
                        let target = GLOBAL_GAME.arena.lookupTarget(this.character.currentAction.targets[i]);
                        let targetX = target.x * this.scene.tileWidth + this.sprite.width / 2;
                        let targetY = target.y * this.scene.tileHeight + this.sprite.height / 2;
                        let end = new Phaser.Math.Vector2(targetX, targetY);

                        if (this.character.currentAction.skill.toUpperCase() == "HEATWAVE")
                        {
                            let hw = new SpellEffect_HeatWave(this.scene, start);
                            this.scene.addSkillEffect(hw);
                        }
                        else 
                        {
                            let fb = new SpellEffect_Fireball(this.scene, start, end);
                            this.scene.addSkillEffect(fb);
                        }
                    }
                }
            }
        }
    }

    export class BuffPanel
    {
        buffs: Phaser.GameObjects.Sprite[];
        debuffs: Phaser.GameObjects.Sprite[];
        gfx_buff: Phaser.GameObjects.Graphics;
        gfx_debuff: Phaser.GameObjects.Graphics;
        scene: Scene_Arena;

        buffCount: integer;
        debuffCount: integer;
        iconWidth: integer = 20;
        borderWidth: integer = 2;
        
        character: RaidNight.Engine.Character;

        constructor (scene: Scene_Arena, char_reference: RaidNight.Engine.Character)
        {   
            this.scene = scene;
            this.character = char_reference;

            let totalBuffs = 3;
            this.buffCount = 0;
            this.debuffCount = 0;

            this.gfx_buff = this.scene.add.graphics().setDepth(DepthLayer.High_Priority);
            this.gfx_debuff = this.scene.add.graphics().setDepth(DepthLayer.High_Priority);

            this.buffs = [];
            this.debuffs = [];
            for (let i = 0; i < totalBuffs; i++)
            {
                this.buffs.push(
                    scene.add.sprite(
                        -100, 
                        -100, 
                        "assets/status/st_fortify.png", 
                        0)
                        .setDepth(DepthLayer.High_Priority)
                        .setDisplaySize(this.iconWidth - this.borderWidth*2, this.iconWidth - this.borderWidth*2));
                        
                this.debuffs.push(
                    scene.add.sprite(
                        -100, 
                        -100, 
                        "assets/status/st_heatwave.png", 
                        0)
                        .setDepth(DepthLayer.High_Priority)
                        .setDisplaySize(this.iconWidth - this.borderWidth*2, this.iconWidth - this.borderWidth*2));
            }

        }

        update(newTurn: boolean)
        {
            let centerX = this.character.x * this.scene.tileWidth + this.scene.tileWidth + 12;
            let centerY = this.character.y * this.scene.tileHeight + this.scene.tileHeight;
            for(let i = 0; i < this.buffs.length; i++)
            {
                this.buffs[i].setPosition(
                    centerX, 
                    centerY - i * this.iconWidth);
            }
            
            for(let i = 0; i < this.debuffs.length; i++)
            {
                this.debuffs[i].setPosition(
                    centerX + this.iconWidth, 
                    centerY - i * this.iconWidth);
            }

            this.gfx_buff.clear();            
            this.gfx_buff.fillStyle(0x2255CC, 1);
            this.gfx_buff.fillRect(
                centerX - (this.iconWidth / 2), 
                centerY + (this.iconWidth / 2), 
                this.iconWidth, -1 * this.iconWidth * this.buffCount);
                
            this.gfx_debuff.clear();            
            this.gfx_debuff.fillStyle(0xAA0000, 1);
            this.gfx_debuff.fillRect(
                centerX + this.iconWidth - (this.iconWidth / 2), 
                centerY + (this.iconWidth / 2), 
                this.iconWidth, -1 * this.iconWidth * this.debuffCount);

            if (!newTurn)
            {
                return;
            }

            let goods = [];
            let bads = [];
            for(let i = 0; i < this.character.statuses.length; i++)
            {
                if(this.character.statuses[i].type == Engine.StatusType.Good)
                {
                    goods.push(this.character.statuses[i].name.toLowerCase());
                }
                else
                {
                    bads.push(this.character.statuses[i].name.toLowerCase());
                }
            }

            this.buffCount = goods.length;
            this.debuffCount = bads.length;

            for(let i = 0; i < this.buffs.length; i++)
            {
                if (i < goods.length)
                {
                    this.buffs[i].setTexture(`assets/status/${goods[i]}.png`);
                    this.buffs[i].setVisible(true);
                }
                else 
                {
                    this.buffs[i].setVisible(false);
                }
            }
            
            for(let i = 0; i < this.debuffs.length; i++)
            {
                if (i < bads.length)
                {
                    this.debuffs[i].setTexture(`assets/status/${bads[i]}.png`);
                    this.debuffs[i].setVisible(true);
                }
                else 
                {
                    this.debuffs[i].setVisible(false);
                }
            }
        }

        destroy()
        {
            for(let i = 0; i < this.buffs.length; i++)
            {
                this.buffs[i].destroy();
            }
            
            for(let i = 0; i < this.debuffs.length; i++)
            {
                this.debuffs[i].destroy();
            }

            this.gfx_buff.destroy();
            this.gfx_debuff.destroy();
        }
    }

    export class Room
    {
        scene: Scene_Arena;
        room: RaidNight.Engine.Room;

        constructor (scene: Scene_Arena, room_reference: RaidNight.Engine.Room)
        {
            this.scene = scene;
            this.room = room_reference;
        }

        destroy()
        {
        }
        
        update = (newTurn: boolean) => 
        {
            if (newTurn)
            {
                if (this.room.currentAction != null && 
                    this.room.currentAction.type == RaidNight.Engine.ActionType.Skill &&
                    this.room.isCasting == false)
                {
                    if (this.room.currentAction.targetType == RaidNight.Engine.TargetType.Area)
                    {
                        let start = new Phaser.Math.Vector2(
                            this.room.currentAction.area.ul_x * this.scene.tileWidth, // upper-left anchor
                            this.room.currentAction.area.ul_y * this.scene.tileHeight);
                        let end = new Phaser.Math.Vector2(
                            this.room.currentAction.area.br_x * this.scene.tileWidth + this.scene.tileWidth, // bottom-right anchor
                            this.room.currentAction.area.br_y * this.scene.tileHeight + this.scene.tileHeight);

                        let spike = new SpellEffect_SpikeTrap(this.scene, start, end);
                        this.scene.addSkillEffect(spike);
                    }
                }
            }
        }
    }
}