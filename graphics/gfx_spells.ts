module RaidNight.Graphics
{
    export class SpellEffect 
    {
        scene: Scene_Arena;

        constructor(scene: Scene_Arena)
        {
            this.scene = scene;
        }

        update()
        {

        }

        isFinished()
        {
            return true;
        }

        destroy()
        {

        }

        debug()
        {
            
        }
    }

    export class SpellEffect_Fireball extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        path: Phaser.Curves.Path;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2, end: Phaser.Math.Vector2)
        {
            super(scene);

            let spellStyle = {fontSize: "20px", fill: "#FFF", align: "center"};

            let xNormal = end.x > start.x ? 1 : -1;
            let yNormal = Math.random() * 2 - 1;

            this.sprite = this.scene.add.sprite(start.x, start.y, "assets/ss_fire.png", 0).setDepth(DepthLayer.Med_Priority);
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

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }

        isFinished()
        {
            return this.tween.totalProgress >= 1;
        }

        update()
        {
            super.update();
            
            let position = this.path.getPoint(this.tween.getValue());
            this.sprite.setPosition(position.x, position.y);
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.lineStyle(2, 0xFF0000, 1);
            this.path.draw(this.gfx);
        }

        destroy()
        {
            super.destroy();

            this.tween.stop();
            this.sprite.destroy();
            this.path.destroy();
            this.gfx.destroy();
        }
    }

    export class SpellEffect_SpikeTrap extends SpellEffect
    {
        sprites: Phaser.GameObjects.Sprite[];
        gfx: Phaser.GameObjects.Graphics;
        startTurn: integer;
        tween1: Phaser.Tweens.Tween;
        tween2: Phaser.Tweens.Tween;
        tween3: Phaser.Tweens.Tween;
        tilesTall: integer;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2, end: Phaser.Math.Vector2)
        {
            super(scene);

            this.startTurn = GLOBAL_GAME.arena.turn;
            this.tilesTall = (end.y - start.y) / scene.tileHeight;
            this.sprites = [];

            for(let i = start.x; i < end.x; i += scene.tileWidth)
            {
                for(let j = start.y; j < end.y; j += scene.tileHeight)
                {
                    this.sprites.push(
                        this.scene.add.sprite(
                            i + scene.tileWidth * 0.5, 
                            j + scene.tileHeight * 0.5, 
                            "assets/spike.png", 
                            0).setDepth(DepthLayer.Med_Priority));

                    this.sprites[this.sprites.length-1].setScale(1.5,1.5);
                }
            }
                
            
            this.tween1 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: GLOBAL_GAME.frameLengthMs * 0.2,
                ease: "Quint.easeIn"
            });
            
            this.tween2 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: GLOBAL_GAME.frameLengthMs * 0.6,
                ease: "Quint.easeIn"
            });
            
            this.tween3 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: GLOBAL_GAME.frameLengthMs * 1.0,
                ease: "Linear"
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }

        update()
        {
            this.gfx.clear();
            for(let i = 0; i < this.sprites.length; i++)
            {
                if ((i % 2 == 0 && Math.floor(i / this.tilesTall) % 2 == 0) ||
                    (i % 2 == 1 && Math.floor(i / this.tilesTall) % 2 == 1))
                {
                    this.sprites[i].setAlpha(this.tween1.getValue());
                }
                else 
                {
                    this.sprites[i].setAlpha(this.tween2.getValue());
                }
            }
        }

        debug()
        {
            this.gfx.clear();
            for(let i = 0; i < this.sprites.length; i++)
            {
                if ((i % 2 == 0 && Math.floor(i / this.tilesTall) % 2 == 0) ||
                    (i % 2 == 1 && Math.floor(i / this.tilesTall) % 2 == 1))
                {
                    this.gfx.fillStyle(0xFF0000, 1);
                    this.gfx.fillCircle(this.sprites[i].x, this.sprites[i].y, 5);
                }
                else 
                {
                    this.gfx.fillStyle(0x00FF00, 1);
                    this.gfx.fillCircle(this.sprites[i].x, this.sprites[i].y, 5);
                }
            }
            
            this.gfx.fillStyle(0xFF0000, 1);
            this.gfx.fillCircle(this.sprites[0].x, this.sprites[0].y, 10);
            this.gfx.fillStyle(0x00FF00, 1);
            this.gfx.fillCircle(
                this.sprites[this.sprites.length-1].x + this.sprites[this.sprites.length-1].width, 
                this.sprites[this.sprites.length-1].y + this.sprites[this.sprites.length-1].height, 10);
        }

        destroy()
        {
            super.destroy();

            for(let i = 0; i < this.sprites.length; i++)
            {
                this.sprites[i].destroy();
            }

            this.tween1.stop();
            this.tween2.stop();
            this.tween3.stop();
            this.gfx.destroy();
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tween3.totalProgress >= 1;
        }
    }
}