module RaidNight.Graphics
{
    export class SpellEffect 
    {
        scene: Scene_Arena;
        tween: Phaser.Tweens.Tween;

        constructor(scene: Scene_Arena)
        {
            this.scene = scene;
            
            this.tween = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: GLOBAL_GAME.frameLengthMs * 0.6,
                ease: "Cubic.easeInOut"
            });
        }

        update()
        {

        }

        totalProgress()
        {
            return this.tween.totalProgress;
        }

        destroy()
        {
            this.tween.stop();
        }
    }

    export class SpellEffect_Fireball extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        path: Phaser.Curves.Path;
        gfx: Phaser.GameObjects.Graphics;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2, end: Phaser.Math.Vector2)
        {
            super(scene);

            let spellStyle = {fontSize: "20px", fill: "#FFF", align: "center"};

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

            this.gfx = this.scene.add.graphics();
        }

        update()
        {
            super.update();
            
            let position = this.path.getPoint(this.tween.getValue());
            this.sprite.setPosition(position.x, position.y);

            this.gfx.clear();
            this.gfx.lineStyle(2, 0xFF0000, 1);
            //this.path.draw(this.gfx);
        }

        destroy()
        {
            super.destroy();

            this.sprite.destroy();
            this.path.destroy();
            this.gfx.destroy();
        }
    }

    export class SpellEffect_SpikeTrap extends SpellEffect
    {
        sprite: Phaser.GameObjects.TileSprite;
        gfx: Phaser.GameObjects.Graphics;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2, end: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.tileSprite(start.x, start.y, end.x - start.x, end.y - start.y, "assets/spike.png", 0);
            this.sprite.setOrigin(0,0);
            this.sprite.setTileScale(this.scene.tileWidth / 40);
            
            this.tween.stop();
            this.tween = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: GLOBAL_GAME.frameLengthMs,
                ease: "Quint.easeOut"
            });
            //console.log(`GFX: swidth ${this.sprite.texture.source[0].width} `);

            this.gfx = this.scene.add.graphics();
        }

        update()
        {
            this.sprite.setAlpha(this.tween.getValue());
            this.sprite.setTilePosition(this.tween.getValue() * 20, this.tween.getValue() * 100);
            
            //this.gfx.clear();
            //this.gfx.fillStyle(0xFF0000, 1);
            //this.gfx.fillCircle(this.sprite.x, this.sprite.y, 10);
            //this.gfx.fillStyle(0x00FF00, 1);
            //this.gfx.fillCircle(this.sprite.x + this.sprite.width, this.sprite.y + this.sprite.height, 10);
        }

        destroy()
        {
            this.sprite.destroy();
            this.gfx.destroy();
        }
    }
}