module RaidNight.Graphics
{
    export class SpellEffect 
    {
        scene: Scene_Arena;
        startTurn: integer;

        constructor(scene: Scene_Arena)
        {
            this.scene = scene;
            this.startTurn = GLOBAL_GAME.arena.turn;
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
        

        calculateDuration(targetDuration: number)
        {
            return targetDuration * Phaser.Math.Clamp(GLOBAL_GAME.frameLengthMs / 1000, 300/1000, 1);
        }
    }
    
    
    export class SpellEffect_Taunt extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(
                start.x + 25, 
                start.y - 8, 
                "assets/skill/knight/sk_taunt.png", 0).setDepth(DepthLayer.Med_Priority).setRotation(Phaser.Math.DegToRad(5));

            this.tween = this.scene.tweens.addCounter({
                from: 3,
                to: 1.2,
                duration: this.calculateDuration(1200),
                ease: "Quart.easeOut"
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tween.totalProgress >= 1;
        }

        update()
        {
            super.update();

            this.sprite.setScale(this.tween.getValue(),this.tween.getValue());
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.fillStyle(0xFF0000, 1);
            this.gfx.fillCircle(this.sprite.x, this.sprite.y, 5);
        }

        destroy()
        {
            super.destroy();

            this.tween.stop();
            this.sprite.destroy();
            this.gfx.destroy();
        }
    }

    export class SpellEffect_ShieldBash extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;
        path: Phaser.Curves.Path;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(
                start.x, 
                start.y, 
                "assets/skill/knight/sk_shieldbash.png", 0).setDepth(DepthLayer.Med_Priority).setScale(1.5, 1.5);

            this.tween = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(600),
                ease: "Quart.easeIn"
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);

            this.path = new Phaser.Curves.Path(start.x - 20, start.y);
            this.path.lineTo(start.x - 50, start.y);
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tween.totalProgress >= 1;
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
            this.gfx.destroy();
            this.path.destroy();
        }
    }

    export class SpellEffect_Pierce extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;
        path: Phaser.Curves.Path;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(
                start.x, 
                start.y, 
                "assets/skill/knight/sk_pierce.png", 0).setDepth(DepthLayer.Med_Priority).setScale(1.5, 1.5);

            this.tween = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(600),
                ease: "Quart.easeInOut"
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);

            this.path = new Phaser.Curves.Path(start.x - 10, start.y + 5);
            this.path.lineTo(start.x - 30, start.y + 5);
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tween.totalProgress >= 1;
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
            this.gfx.destroy();
            this.path.destroy();
        }
    }
    

    export class SpellEffect_Strike extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;
        path: Phaser.Curves.Path;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(
                start.x, 
                start.y, 
                "assets/skill/knight/sk_strike.png", 0).setDepth(DepthLayer.Med_Priority).setScale(1.5, 1.5);

            this.tween = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(500),
                ease: "Quart.easeInOut"
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);

            this.path = new Phaser.Curves.Path(start.x - 35, start.y - 25);
            this.path.cubicBezierTo(
                start.x - 35, start.y + 25,
                start.x - 70,  start.y - 25,
                start.x - 70,  start.y + 25
            );
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tween.totalProgress >= 1;
        }

        update()
        {
            super.update();
            
            let position = this.path.getPoint(this.tween.getValue());
            this.sprite.setPosition(position.x, position.y);
            //this.sprite.setRotation(Phaser.Math.DegToRad( 65 + this.tween.getValue() * 40));
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
            this.gfx.destroy();
            this.path.destroy();
        }
    }

    export class SpellEffect_ShieldWall extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(
                start.x - 2, 
                start.y - 0, 
                "assets/skill/knight/sk_shieldwall.png", 0).setDepth(DepthLayer.Med_Priority).setScale(1.5, 1.5);

            this.tween = this.scene.tweens.addCounter({
                from: 1,
                to: 0,
                duration: this.calculateDuration(200),
                ease: "Quart.easeIn",
                yoyo: true,
                repeat: 1
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tween.totalProgress >= 1;
        }

        update()
        {
            super.update();

            this.sprite.setAlpha(this.tween.getValue());
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.fillStyle(0xFF0000, 1);
            this.gfx.fillCircle(this.sprite.x, this.sprite.y, 5);
        }

        destroy()
        {
            super.destroy();

            this.tween.stop();
            this.sprite.destroy();
            this.gfx.destroy();
        }
    }

    export class SpellEffect_Phalanx extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(
                start.x - 2, 
                start.y - 0, 
                "assets/skill/knight/sk_phalanx.png", 0).setDepth(DepthLayer.Med_Priority).setScale(1.5, 1.5);

            this.tween = this.scene.tweens.addCounter({
                from: 1,
                to: 0,
                duration: this.calculateDuration(200),
                ease: "Quart.easeIn",
                yoyo: true,
                repeat: 1
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tween.totalProgress >= 1;
        }

        update()
        {
            super.update();

            this.sprite.setAlpha(this.tween.getValue());
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.fillStyle(0xFF0000, 1);
            this.gfx.fillCircle(this.sprite.x, this.sprite.y, 5);
        }

        destroy()
        {
            super.destroy();

            this.tween.stop();
            this.sprite.destroy();
            this.gfx.destroy();
        }
    }

    export class SpellEffect_Regen extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;
        tweenTimer: Phaser.Tweens.Tween;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(
                start.x - 0, 
                start.y - 0, 
                "assets/skill/priest/sk_regen.png", 0).setDepth(DepthLayer.Med_Priority).setScale(1, 1);

            this.tween = this.scene.tweens.addCounter({
                from: 1,
                to: 0,
                duration: this.calculateDuration(800),
                ease: "Quart.easeIn",
                yoyo: true,
                repeat: -1
            });
                
            this.tweenTimer = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(800),
                ease: "Quart.easeIn"
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tweenTimer.totalProgress >= 1;
        }

        update()
        {
            super.update();

            this.sprite.setAlpha(this.tween.getValue());
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.fillStyle(0xFF0000, 1);
            this.gfx.fillCircle(this.sprite.x, this.sprite.y, 5);
        }

        destroy()
        {
            super.destroy();

            this.tween.stop();
            this.tweenTimer.stop();
            this.sprite.destroy();
            this.gfx.destroy();
        }
    }
    
    export class SpellEffect_FlashHeal extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;
        tweenTimer: Phaser.Tweens.Tween;
        
        starSprite1: Phaser.GameObjects.Sprite;
        starTween1: Phaser.Tweens.Tween;
        starPath1: Phaser.Curves.Path;

        starSprite2: Phaser.GameObjects.Sprite;
        starTween2: Phaser.Tweens.Tween;
        starPath2: Phaser.Curves.Path;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2, end: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(
                end.x - 0, 
                end.y - 0, 
                "assets/skill/priest/sk_flashheal.png", 0).setDepth(DepthLayer.Low_Priority).setScale(1, 1);

            this.tween = this.scene.tweens.addCounter({
                from: 1,
                to: 0,
                duration: this.calculateDuration(800),
                ease: "Quart.easeIn",
                yoyo: true,
                repeat: -1
            });
                
            this.tweenTimer = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(800),
                ease: "Quart.easeIn"
            });
            
            this.starSprite1 = this.scene.add.sprite(
                start.x - 0, 
                start.y - 0, 
                "assets/skill/priest/sparkle.png", 0).setDepth(DepthLayer.Med_Priority).setScale(0.25, 0.25);
            
            this.starTween1 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: 400,
                ease: "Linear",
                repeat: -1
            });
            
            this.starSprite2 = this.scene.add.sprite(
                start.x - 0, 
                start.y - 0, 
                "assets/skill/priest/sparkle.png", 0).setDepth(DepthLayer.Med_Priority).setScale(0.25, 0.25);
            
            this.starTween2 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: 400,
                ease: "Linear",
                repeat: -1,
                delay: 200
            });
            
            this.starPath1 = new Phaser.Curves.Path(start.x, start.y);
            this.starPath1.lineTo(end.x, end.y);

            this.starPath2 = new Phaser.Curves.Path(start.x, start.y);
            this.starPath2.lineTo(end.x, end.y);

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tweenTimer.totalProgress >= 1;
        }

        update()
        {
            super.update();

            this.sprite.setAlpha(this.tween.getValue());
            
            let position = this.starPath1.getPoint(this.starTween1.getValue());
            this.starSprite1.setPosition(position.x, position.y);

            position = this.starPath2.getPoint(this.starTween2.getValue());
            this.starSprite2.setPosition(position.x, position.y);
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.fillStyle(0xFF0000, 1);
            this.gfx.fillCircle(this.sprite.x, this.sprite.y, 5);
        }

        destroy()
        {
            super.destroy();

            this.tween.stop();
            this.tweenTimer.stop();
            this.sprite.destroy();
            this.gfx.destroy();
            this.starSprite1.destroy();
            this.starPath1.destroy();
            this.starTween1.stop();
            this.starSprite2.destroy();
            this.starPath2.destroy();
            this.starTween2.stop();
        }
    }

    export class SpellEffect_GreaterHeal extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;
        tweenTimer: Phaser.Tweens.Tween;

        starSprite1: Phaser.GameObjects.Sprite;
        starTween1: Phaser.Tweens.Tween;
        starPath1: Phaser.Curves.Path;

        starSprite2: Phaser.GameObjects.Sprite;
        starTween2: Phaser.Tweens.Tween;
        starPath2: Phaser.Curves.Path;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2, end: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(
                end.x - 0, 
                end.y - 0, 
                "assets/skill/priest/sk_greaterheal.png", 0).setDepth(DepthLayer.Low_Priority).setScale(1, 1);

            this.tween = this.scene.tweens.addCounter({
                from: 1,
                to: 0,
                duration: this.calculateDuration(800),
                ease: "Quart.easeIn",
                yoyo: true,
                repeat: -1
            });
                
            this.tweenTimer = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(800),
                ease: "Quart.easeIn"
            });

            this.starSprite1 = this.scene.add.sprite(
                start.x - 0, 
                start.y - 0, 
                "assets/skill/priest/sparkle.png", 0).setDepth(DepthLayer.Med_Priority).setScale(0.25, 0.25);
            
            this.starTween1 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: 1000,
                ease: "Cubic.easeInOut",
                repeat: -1
            });
            
            this.starSprite2 = this.scene.add.sprite(
                start.x - 0, 
                start.y - 0, 
                "assets/skill/priest/sparkle.png", 0).setDepth(DepthLayer.Med_Priority).setScale(0.25, 0.25);
            
            this.starTween2 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: 1000,
                ease: "Cubic.easeInOut",
                repeat: -1,
                delay: 400
            });
            
            let xNormal = end.x > start.x ? 1 : -1;
            let yNormal = Math.random() * 2 - 1;
            this.starPath1 = new Phaser.Curves.Path(start.x, start.y);
            this.starPath1.cubicBezierTo(
                end.x, end.y,
                start.x + 100 * xNormal * -1, start.y + (yNormal * 150), 
                end.x, end.y);

            yNormal = Math.random() * 2 - 1;
            this.starPath2 = new Phaser.Curves.Path(start.x, start.y);
            this.starPath2.cubicBezierTo(
                end.x, end.y,
                start.x + 100 * xNormal * -1, start.y + (yNormal * 150), 
                end.x, end.y);

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tweenTimer.totalProgress >= 1;
        }

        update()
        {
            super.update();

            //this.sprite.setAlpha(this.tween.getValue());

            let position = this.starPath1.getPoint(this.starTween1.getValue());
            this.starSprite1.setPosition(position.x, position.y);

            position = this.starPath2.getPoint(this.starTween2.getValue());
            this.starSprite2.setPosition(position.x, position.y);
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.fillStyle(0xFF0000, 1);
            this.gfx.fillCircle(this.sprite.x, this.sprite.y, 5);
        }

        destroy()
        {
            super.destroy();

            this.tween.stop();
            this.tweenTimer.stop();
            this.sprite.destroy();
            this.gfx.destroy();
            this.starSprite1.destroy();
            this.starPath1.destroy();
            this.starTween1.stop();
            this.starSprite2.destroy();
            this.starPath2.destroy();
            this.starTween2.stop();
        }
    }

    export class SpellEffect_DivineIntervention extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;
        tweenTimer: Phaser.Tweens.Tween;
        path: Phaser.Curves.Path;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(
                start.x - 0, 
                start.y - 15, 
                "assets/skill/priest/sk_divineintervention.png", 0).setDepth(DepthLayer.Med_Priority).setScale(1, 1);

            this.tween = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(800),
                ease: "Quart.easeIn",
                yoyo: true,
                repeat: -1
            });
                
            this.tweenTimer = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(800),
                ease: "Quart.easeIn"
            });

            
            this.path = new Phaser.Curves.Path(start.x - 0, start.y - 15);
            this.path.lineTo(start.x - 0, start.y - 10);

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tweenTimer.totalProgress >= 1;
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
            this.tweenTimer.stop();
            this.sprite.destroy();
            this.gfx.destroy();
            this.path.destroy();
        }
    }

    export class SpellEffect_Hymn extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;
        tweenTimer: Phaser.Tweens.Tween;
        path: Phaser.Curves.Path;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(
                start.x - 0, 
                start.y - 15, 
                "assets/skill/priest/sk_hymn.png", 0).setDepth(DepthLayer.Med_Priority).setScale(1, 1);

            this.tween = this.scene.tweens.addCounter({
                from: 1,
                to: 0.5,
                duration: this.calculateDuration(800),
                ease: "Quart.easeIn",
                yoyo: true,
                repeat: -1
            });
                
            this.tweenTimer = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(800),
                ease: "Quart.easeIn"
            });

            
            this.path = new Phaser.Curves.Path(start.x - 0, start.y - 15);
            this.path.lineTo(start.x - 0, start.y - 10);

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tweenTimer.totalProgress >= 1;
        }
        
        update()
        {
            super.update();
            
            this.sprite.setAlpha(this.tween.getValue());
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
            this.tweenTimer.stop();
            this.sprite.destroy();
            this.gfx.destroy();
            this.path.destroy();
        }
    }

    export class SpellEffect_IceShard extends SpellEffect
    {
        sprite1: Phaser.GameObjects.Sprite;
        sprite2: Phaser.GameObjects.Sprite;
        path1: Phaser.Curves.Path;
        path2: Phaser.Curves.Path;
        gfx: Phaser.GameObjects.Graphics;
        tween1: Phaser.Tweens.Tween;
        tween2: Phaser.Tweens.Tween;
        tween3: Phaser.Tweens.Tween;
        tween4: Phaser.Tweens.Tween;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2, end: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite1 = this.scene.add.sprite(start.x, start.y, "assets/skill/wizard/sk_iceshard.png", 0).setDepth(DepthLayer.Med_Priority);
            this.sprite2 = this.scene.add.sprite(start.x, start.y, "assets/skill/wizard/sk_iceshard.png", 0).setDepth(DepthLayer.Med_Priority);

            this.path1 = new Phaser.Curves.Path(start.x - 30, start.y - 6);
            this.path1.lineTo(end.x - 50, end.y);

            this.tween1 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(300),
                ease: "Cubic.easeOut"
            });

            this.tween2 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(500),
                ease: "Linear",
                delay: this.calculateDuration(500)
            });
            
            this.path2 = new Phaser.Curves.Path(start.x - 27, start.y + 6);
            this.path2.lineTo(end.x - 50, end.y);

            this.tween3 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(300),
                ease: "Cubic.easeOut",
                delay: this.calculateDuration(100)
            });

            this.tween4 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(500),
                ease: "Linear",
                delay: this.calculateDuration(700)
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }

        isFinished()
        {
            return this.tween4.totalProgress >= 1;
        }

        update()
        {
            super.update();
            
            let position = this.path1.getPoint(this.tween2.getValue());
            this.sprite1.setPosition(position.x, position.y);
            this.sprite1.setAlpha(this.tween1.getValue());
            
            position = this.path2.getPoint(this.tween4.getValue());
            this.sprite2.setPosition(position.x, position.y);
            this.sprite2.setAlpha(this.tween3.getValue());
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.lineStyle(2, 0xFF0000, 1);
            this.path1.draw(this.gfx);
            this.path2.draw(this.gfx);
        }

        destroy()
        {
            super.destroy();

            this.tween1.stop();
            this.tween2.stop();
            this.tween3.stop();
            this.tween4.stop();
            this.sprite1.destroy();
            this.sprite2.destroy();
            this.path1.destroy();
            this.path2.destroy();
            this.gfx.destroy();
        }
    }
    
    export class SpellEffect_Deluge extends SpellEffect
    {
        sprite1: Phaser.GameObjects.Sprite;
        sprite2: Phaser.GameObjects.Sprite;
        sprite3: Phaser.GameObjects.Sprite;
        path1: Phaser.Curves.Path;
        path2: Phaser.Curves.Path;
        path3: Phaser.Curves.Path;
        gfx: Phaser.GameObjects.Graphics;
        tween1: Phaser.Tweens.Tween;
        tween2: Phaser.Tweens.Tween;
        tween3: Phaser.Tweens.Tween;
        tweenTimer: Phaser.Tweens.Tween;

        constructor(scene: Scene_Arena, end: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite1 = this.scene.add.sprite(end.x, end.y, "assets/skill/wizard/sk_deluge.png", 0).setDepth(DepthLayer.Med_Priority);
            this.sprite2 = this.scene.add.sprite(end.x, end.y, "assets/skill/wizard/sk_deluge.png", 0).setDepth(DepthLayer.Med_Priority);
            this.sprite3 = this.scene.add.sprite(end.x, end.y, "assets/skill/wizard/sk_deluge.png", 0).setDepth(DepthLayer.Med_Priority);

            this.path1 = new Phaser.Curves.Path(end.x - 30, -100);
            this.path1.lineTo(end.x - 40, end.y + 10);

            this.path2 = new Phaser.Curves.Path(end.x + 40, -100);
            this.path2.lineTo(end.x + 40, end.y + 10);
            
            this.path3 = new Phaser.Curves.Path(end.x , -100);
            this.path3.lineTo(end.x , end.y + 10);

            this.tween1 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(800),
                ease: "Cubic.easeOut"
            });

            this.tween2 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(800),
                ease: "Cubic.easeOut",
                delay: this.calculateDuration(300)
            });

            this.tween3 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(800),
                ease: "Cubic.easeOut",
                delay: this.calculateDuration(600)
            });

            this.tweenTimer = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(2500),
                ease: "Cubic.easeOut",
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }

        isFinished()
        {
            return this.tweenTimer.totalProgress >= 1;
        }

        update()
        {
            super.update();
            
            let position = this.path1.getPoint(this.tween1.getValue());
            this.sprite1.setPosition(position.x, position.y);
            
            position = this.path2.getPoint(this.tween2.getValue());
            this.sprite2.setPosition(position.x, position.y);

            position = this.path3.getPoint(this.tween3.getValue());
            this.sprite3.setPosition(position.x, position.y);
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.lineStyle(2, 0xFF0000, 1);
            this.path1.draw(this.gfx);
            this.path2.draw(this.gfx);
            this.path3.draw(this.gfx);
        }

        destroy()
        {
            super.destroy();

            this.tween1.stop();
            this.tween2.stop();
            this.tween3.stop();
            this.tweenTimer.stop();
            this.sprite1.destroy();
            this.sprite2.destroy();
            this.sprite3.destroy();
            this.path1.destroy();
            this.path2.destroy();
            this.path3.destroy();
            this.gfx.destroy();
        }
    }

    export class SpellEffect_IceSpear extends SpellEffect
    {
        sprite1: Phaser.GameObjects.Sprite;
        path1: Phaser.Curves.Path;
        gfx: Phaser.GameObjects.Graphics;
        tween1: Phaser.Tweens.Tween;
        tween2: Phaser.Tweens.Tween;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2, end: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite1 = this.scene.add.sprite(start.x, start.y, "assets/skill/wizard/sk_icespear.png", 0).setDepth(DepthLayer.Med_Priority);
            this.sprite1.setFlipX(true);

            this.path1 = new Phaser.Curves.Path(start.x - 30, start.y - 6);
            this.path1.lineTo(start.x, start.y - 20);
            this.path1.lineTo(end.x - 50, end.y);

            this.tween1 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(500),
                ease: "Cubic.easeOut"
            });

            this.tween2 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(800),
                ease: "Cubic.easeIn",
                delay: this.calculateDuration(500)
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }

        isFinished()
        {
            return this.tween2.totalProgress >= 1;
        }

        update()
        {
            super.update();
            
            let position = this.path1.getPoint(this.tween2.getValue());
            this.sprite1.setPosition(position.x, position.y);
            this.sprite1.setAlpha(this.tween1.getValue());
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.lineStyle(2, 0xFF0000, 1);
            this.path1.draw(this.gfx);
        }

        destroy()
        {
            super.destroy();

            this.tween1.stop();
            this.tween2.stop();
            this.sprite1.destroy();
            this.path1.destroy();
            this.gfx.destroy();
        }
    }
    

    export class SpellEffect_WaterBarrier extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(
                start.x - 2, 
                start.y - 0, 
                "assets/skill/wizard/sk_waterbarrier.png", 0).setDepth(DepthLayer.Med_Priority).setScale(1, 1);

            this.tween = this.scene.tweens.addCounter({
                from: 1,
                to: 0,
                duration: this.calculateDuration(200),
                ease: "Quart.easeIn",
                yoyo: true,
                repeat: 1
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tween.totalProgress >= 1;
        }

        update()
        {
            super.update();

            this.sprite.setAlpha(this.tween.getValue());
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.fillStyle(0xFF0000, 1);
            this.gfx.fillCircle(this.sprite.x, this.sprite.y, 5);
        }

        destroy()
        {
            super.destroy();

            this.tween.stop();
            this.sprite.destroy();
            this.gfx.destroy();
        }
    }

    export class SpellEffect_Frostbite extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;
        tweenTimer: Phaser.Tweens.Tween;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(
                start.x - 0, 
                start.y - 0, 
                "assets/skill/wizard/sk_frostbite.png", 0).setDepth(DepthLayer.Low_Priority).setScale(1, 1);

            this.tween = this.scene.tweens.addCounter({
                from: 1,
                to: 0.33,
                duration: this.calculateDuration(400),
                ease: "Quart.easeIn",
                yoyo: true,
                repeat: -1
            });
                
            this.tweenTimer = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(800),
                ease: "Quart.easeIn"
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tweenTimer.totalProgress >= 1;
        }

        update()
        {
            super.update();

            this.sprite.setAlpha(this.tween.getValue());
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.fillStyle(0xFF0000, 1);
            this.gfx.fillCircle(this.sprite.x, this.sprite.y, 5);
        }

        destroy()
        {
            super.destroy();

            this.tween.stop();
            this.tweenTimer.stop();
            this.sprite.destroy();
            this.gfx.destroy();
        }
    }

    export class SpellEffect_HeatWave extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(start.x, start.y, "assets/heatwave.jpg", 0).setDepth(DepthLayer.Med_Priority);
            this.sprite.setBlendMode(Phaser.BlendModes.ADD);
            this.sprite.setRotation(Math.random() * Math.PI * 2);

            this.tween = this.scene.tweens.addCounter({
                from: 40,
                to: 8000,
                duration: this.calculateDuration(1500),
                ease: "Quart.easeIn"
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

            this.sprite.setDisplaySize(this.tween.getValue(),this.tween.getValue());
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.fillStyle(0xFF0000, 1);
            this.gfx.fillCircle(this.sprite.x, this.sprite.y, 5);
        }

        destroy()
        {
            super.destroy();

            this.tween.stop();
            this.sprite.destroy();
            this.gfx.destroy();
        }
    }

    

    export class SpellEffect_FireBarrier extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(
                start.x - 2, 
                start.y - 0, 
                "assets/skill/wizard/sk_firebarrier.png", 0).setDepth(DepthLayer.Med_Priority).setScale(1, 1);

            this.tween = this.scene.tweens.addCounter({
                from: 1,
                to: 0,
                duration: this.calculateDuration(200),
                ease: "Quart.easeIn",
                yoyo: true,
                repeat: 1
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tween.totalProgress >= 1;
        }

        update()
        {
            super.update();

            this.sprite.setAlpha(this.tween.getValue());
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.fillStyle(0xFF0000, 1);
            this.gfx.fillCircle(this.sprite.x, this.sprite.y, 5);
        }

        destroy()
        {
            super.destroy();

            this.tween.stop();
            this.sprite.destroy();
            this.gfx.destroy();
        }
    }
    
    export class SpellEffect_Kindle extends SpellEffect
    {
        sprite1: Phaser.GameObjects.Sprite;
        sprite2: Phaser.GameObjects.Sprite;
        sprite3: Phaser.GameObjects.Sprite;
        path1: Phaser.Curves.Path;
        path2: Phaser.Curves.Path;
        path3: Phaser.Curves.Path;
        gfx: Phaser.GameObjects.Graphics;
        tween1: Phaser.Tweens.Tween;
        tween2: Phaser.Tweens.Tween;
        tween3: Phaser.Tweens.Tween;
        tweenTimer: Phaser.Tweens.Tween;

        constructor(scene: Scene_Arena, end: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite1 = this.scene.add.sprite(end.x, end.y, "assets/skill/wizard/sk_kindle.png", 0).setDepth(DepthLayer.Med_Priority);
            this.sprite2 = this.scene.add.sprite(end.x, end.y, "assets/skill/wizard/sk_kindle.png", 0).setDepth(DepthLayer.Med_Priority);
            this.sprite3 = this.scene.add.sprite(end.x, end.y, "assets/skill/wizard/sk_kindle.png", 0).setDepth(DepthLayer.Med_Priority);
            this.sprite1.setScale(0.3);
            this.sprite2.setScale(0.3);
            this.sprite3.setScale(0.4).setFlipX(true);

            this.path1 = new Phaser.Curves.Path(end.x - 20, end.y + 20);
            this.path1.lineTo(end.x - 20, end.y - 20);

            this.path2 = new Phaser.Curves.Path(end.x + 20, end.y + 20);
            this.path2.lineTo(end.x + 20, end.y - 20);
            
            this.path3 = new Phaser.Curves.Path(end.x, end.y + 20);
            this.path3.lineTo(end.x , end.y - 20);

            this.tween1 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(800),
                ease: "Cubic.easeOut"
            });

            this.tween2 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(800),
                ease: "Cubic.easeOut",
                delay: this.calculateDuration(300)
            });

            this.tween3 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(800),
                ease: "Cubic.easeOut",
                delay: this.calculateDuration(600)
            });

            this.tweenTimer = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(1800),
                ease: "Cubic.easeOut",
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }

        isFinished()
        {
            return this.tweenTimer.totalProgress >= 1;
        }

        update()
        {
            super.update();
            
            let position = this.path1.getPoint(this.tween1.getValue());
            this.sprite1.setPosition(position.x, position.y);
            
            position = this.path2.getPoint(this.tween2.getValue());
            this.sprite2.setPosition(position.x, position.y);

            position = this.path3.getPoint(this.tween3.getValue());
            this.sprite3.setPosition(position.x, position.y);
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.lineStyle(2, 0xFF0000, 1);
            this.path1.draw(this.gfx);
            this.path2.draw(this.gfx);
            this.path3.draw(this.gfx);
        }

        destroy()
        {
            super.destroy();

            this.tween1.stop();
            this.tween2.stop();
            this.tween3.stop();
            this.tweenTimer.stop();
            this.sprite1.destroy();
            this.sprite2.destroy();
            this.sprite3.destroy();
            this.path1.destroy();
            this.path2.destroy();
            this.path3.destroy();
            this.gfx.destroy();
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
                duration: this.calculateDuration(600),
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

    export class SpellEffect_Flamethrower extends SpellEffect
    {
        sprites: Phaser.GameObjects.Sprite[];
        gfx: Phaser.GameObjects.Graphics;
        tween1: Phaser.Tweens.Tween;
        tilesTall: integer;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2, end: Phaser.Math.Vector2)
        {
            super(scene);

            this.tilesTall = (end.y - start.y) / scene.tileHeight;
            this.sprites = [];

            for(let i = start.x; i < end.x; i += scene.tileWidth)
            {
                for(let j = start.y; j < end.y; j += scene.tileHeight)
                {
                    let sprite = this.scene.add.sprite(
                        i + scene.tileWidth * 0.5, 
                        j + scene.tileHeight * 0.5, 
                        "assets/ss_fire.png", 
                        0).setDepth(DepthLayer.Med_Priority);
                    sprite.setBlendMode(Phaser.BlendModes.ADD);
                    this.sprites.push(sprite);
                }
            }
                
            
            this.tween1 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(1000),
                ease: "Quad.easeIn"
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }

        update()
        {
            this.gfx.clear();
            for(let i = 0; i < this.sprites.length; i++)
            {
                let col = Math.floor(i / this.tilesTall) + 1;
                let maxCol =  Math.floor(this.sprites.length / this.tilesTall);

                if (col / maxCol <= this.tween1.getValue())
                {
                    this.sprites[i].setAlpha(1);
                }
                else 
                {
                    this.sprites[i].setAlpha(0);
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
            this.gfx.destroy();
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tween1.totalProgress >= 1;
        }
    }

    export class SpellEffect_Cremate extends SpellEffect
    {
        sprites: Phaser.GameObjects.Sprite[];
        gfx: Phaser.GameObjects.Graphics;
        tween1: Phaser.Tweens.Tween;
        tilesTall: integer;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2, end: Phaser.Math.Vector2)
        {
            super(scene);

            this.tilesTall = (end.y - start.y) / scene.tileHeight;
            this.sprites = [];

            for(let i = start.x; i < end.x; i += scene.tileWidth)
            {
                for(let j = start.y; j < end.y; j += scene.tileHeight)
                {
                    let sprite = this.scene.add.sprite(
                        i + scene.tileWidth * 0.5, 
                        j + scene.tileHeight * 0.5, 
                        "assets/ss_fire.png", 
                        0).setDepth(DepthLayer.Med_Priority);
                    sprite.setBlendMode(Phaser.BlendModes.ADD);
                    this.sprites.push(sprite);
                }
            }
                
            
            this.tween1 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(1000),
                ease: "Quad.easeIn"
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }

        update()
        {
            this.gfx.clear();
            for(let i = 0; i < this.sprites.length; i++)
            {
                let col = Math.floor(i / this.tilesTall) + 1;
                let maxCol =  Math.floor(this.sprites.length / this.tilesTall);

                if (1 - (col / maxCol) <= this.tween1.getValue())
                {
                    this.sprites[i].setAlpha(1);
                }
                else 
                {
                    this.sprites[i].setAlpha(0);
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
            this.gfx.destroy();
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tween1.totalProgress >= 1;
        }
    }

    export class SpellEffect_Firestorm extends SpellEffect
    {
        sprite1: Phaser.GameObjects.Sprite;
        sprite2: Phaser.GameObjects.Sprite;
        path1: Phaser.Curves.Path;
        gfx: Phaser.GameObjects.Graphics;
        tween1: Phaser.Tweens.Tween;
        tweenTimer: Phaser.Tweens.Tween;

        constructor(scene: Scene_Arena, end: Phaser.Math.Vector2)
        {
            super(scene);

            let x = end.x + scene.tileWidth;
            let y = end.y + scene.tileHeight;

            this.sprite1 = this.scene.add.sprite(x, y, "assets/skill/dragon/sk_firestorm.png", 0).setDepth(DepthLayer.Med_Priority);
            this.sprite2 = this.scene.add.sprite(x, y, "assets/skill/dragon/sk_firestorm_floor.png", 0).setDepth(DepthLayer.Low_Priority);

            this.path1 = new Phaser.Curves.Path(x + 30, y - 100);
            this.path1.lineTo(x + 5, y - 15);

            this.tween1 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(2000),
                ease: "Linear"
            });

            this.tweenTimer = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(2500),
                ease: "Cubic.easeOut",
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);
        }

        isFinished()
        {
            return this.tweenTimer.totalProgress >= 1;
        }

        update()
        {
            super.update();
            
            let position = this.path1.getPoint(this.tween1.getValue());
            this.sprite1.setPosition(position.x, position.y);
        }

        debug()
        {
            this.gfx.clear();
            this.gfx.lineStyle(2, 0xFF0000, 1);
            this.path1.draw(this.gfx);
        }

        destroy()
        {
            super.destroy();

            this.tween1.stop();
            this.tweenTimer.stop();
            this.sprite1.destroy();
            this.sprite2.destroy();
            this.path1.destroy();
            this.gfx.destroy();
        }
    }

    export class SpellEffect_Claw extends SpellEffect
    {
        sprite: Phaser.GameObjects.Sprite;
        gfx: Phaser.GameObjects.Graphics;
        tween: Phaser.Tweens.Tween;
        path: Phaser.Curves.Path;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2)
        {
            super(scene);

            this.sprite = this.scene.add.sprite(
                start.x, 
                start.y, 
                "assets/skill/dragon/sk_claw.png", 0).setDepth(DepthLayer.Med_Priority).setScale(0.75, 0.75);

            this.tween = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(500),
                ease: "Quart.easeInOut"
            });

            this.gfx = this.scene.add.graphics().setDepth(DepthLayer.Med_Priority);

            this.path = new Phaser.Curves.Path(start.x + 35, start.y - 25);
            this.path.lineTo(start.x + 35, start.y + 25);
            //this.path.cubicBezierTo(
            //    start.x - 35, start.y + 25,
            //    start.x - 70,  start.y - 25,
            //    start.x - 70,  start.y + 25
            //);
        }
        
        isFinished()
        {
            return GLOBAL_GAME.arena.turn != this.startTurn && 
                this.tween.totalProgress >= 1;
        }

        update()
        {
            super.update();
            
            let position = this.path.getPoint(this.tween.getValue());
            this.sprite.setPosition(position.x, position.y);
            //this.sprite.setRotation(Phaser.Math.DegToRad( 65 + this.tween.getValue() * 40));
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
            this.gfx.destroy();
            this.path.destroy();
        }
    }

    export class SpellEffect_SpikeTrap extends SpellEffect
    {
        sprites: Phaser.GameObjects.Sprite[];
        gfx: Phaser.GameObjects.Graphics;
        tween1: Phaser.Tweens.Tween;
        tween2: Phaser.Tweens.Tween;
        tween3: Phaser.Tweens.Tween;
        tilesTall: integer;

        constructor(scene: Scene_Arena, start: Phaser.Math.Vector2, end: Phaser.Math.Vector2)
        {
            super(scene);

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
                duration: this.calculateDuration(200),
                ease: "Quint.easeIn"
            });
            
            this.tween2 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(600),
                ease: "Quint.easeIn"
            });
            
            this.tween3 = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: this.calculateDuration(1000),
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