/**
 * Main entry point for the game
 */
class Main {   

    // singleton implementation
    static Instance = new Main();
    constructor()
    {
        if(Main.Instance)
        {
            throw new Error("An instance of Main already exists.");
        }
        
        Main.Instance = this;
    }

    private isInitialized = false;

    public begin = () =>
    {
        // only run once
        if(this.isInitialized)
        {
            return;
        }
        this.isInitialized = true;

        // setup time variables
        var currentTime = 0;
        var lastUpdate = new Date().getTime();
        GLOBAL_deltaTimeMs = 0;

        // Set up game loop.
        var nextFrame = () =>
        {
            currentTime = new Date().getTime();
            GLOBAL_deltaTimeMs = currentTime - lastUpdate;
            
            // UPDATE
            GLOBAL_GAME.update();
            
            // RENDER
            // rendering loop is handled by Phaser.
            lastUpdate = currentTime;
        }
        
        // tells the browser to call the nextFrame 
        // as fast as possible (1 ms interval)
        setInterval(nextFrame, 1);
    }
}

var GLOBAL_deltaTimeMs = 0;

const GLOBAL_INPUT_HELPER = new RaidNight.Engine.Input();
const GLOBAL_GAME = new RaidNight.Engine.Game();
GLOBAL_GAME.setup();

Main.Instance.begin();

const GLOBAL_GAME_PHASER = new RaidNight.Graphics.Game_RaidNight();

var NewGameAction = function (){
    let team = GLOBAL_INPUT_HELPER.parseInputCreateTeam();
    if (team)
    {
        GLOBAL_GAME.newGame(team);
        GLOBAL_GAME.start();
    }
}