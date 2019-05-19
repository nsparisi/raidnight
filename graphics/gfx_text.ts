module RaidNight.Graphics
{
    export class TextOverlay
    {
        scene: Scene_Arena;
        sprite: Phaser.GameObjects.Sprite;
        text: Phaser.GameObjects.Text;

        constructor(scene: Scene_Arena, text: string)
        {
            this.scene = scene;

            this.sprite = this.scene.add.sprite(
                this.scene.game.canvas.width / 2, 
                this.scene.game.canvas.height / 2, "assets/scroll.png").setDepth(DepthLayer.HUD);
            this.sprite.setDisplaySize(400,400);
            this.sprite.setVisible(true);
            
            let winStyle = {fontSize: "35px", fill: "#000", align: "center", stroke: "black", fontWeight: "bold"};
            this.text = this.scene.add.text(
                this.scene.game.canvas.width / 2, 
                this.scene.game.canvas.height / 2, text, winStyle).setDepth(DepthLayer.HUD);
            this.text.setOrigin(0.5);
            this.text.setWordWrapWidth(270, true);
        }

        updateText(text: string)
        {
            this.text.text = text;
        }

        show()
        {
            this.sprite.setVisible(true);
            this.text.setVisible(true);
        }

        hide()
        {
            this.sprite.setVisible(false);
            this.text.setVisible(false);
        }

        destroy()
        {
            this.sprite.destroy();
            this.text.destroy();
        }
    }
    
    export class TextManager
    {
        scene: Scene_Arena;
        texts: string[];
        overlay: TextOverlay;

        constructor(scene: Scene_Arena)
        {
            this.scene = scene;
            this.overlay = new TextOverlay(this.scene, "");
            this.overlay.hide();
        }

        update()
        {
            if (GLOBAL_GAME.isShowingText)
            {
                this.overlay.show();
                this.overlay.updateText(GLOBAL_GAME.textToShow[0]);
            }
            else
            {
                this.overlay.hide();
            }
        }
    }
}