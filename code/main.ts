/**
 * Main entry point for the game
 */
class Main {   

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
//GLOBAL_GAME.setup1();
//GLOBAL_GAME.step();

const GLOBAL_MAIN = new Main();
GLOBAL_MAIN.begin();

const GLOBAL_GAME_PHASER = new RaidNight.Graphics.Game_RaidNight();

var GameAction_ReadInput1 = function (){
    GLOBAL_GAME.stop();
    GLOBAL_GAME.readInput(null);
    GLOBAL_GAME.newGame();
    GLOBAL_GAME.start();
};

var GameAction_ReadInput2 = function (){
    GLOBAL_GAME.stop();
    console.log("Reading new input...");
    let team = GLOBAL_INPUT_HELPER.parseInputCreateTeam(RaidNight.Engine.FightType.Fight2);
    if (team)
    {
        GLOBAL_GAME.readInput(team);
        GLOBAL_GAME.newGame();
        GLOBAL_GAME.start();
    }
};

var GameAction_ReadInput3 = function (){
    GLOBAL_GAME.stop();
    console.log("Reading new input...");
    let team = GLOBAL_INPUT_HELPER.parseInputCreateTeam(RaidNight.Engine.FightType.Fight3);
    if (team)
    {
        GLOBAL_GAME.readInput(team);
        GLOBAL_GAME.newGame();
        GLOBAL_GAME.start();
    }
};

var GameAction_NewGame = function (){
    GLOBAL_GAME.stop();
    GLOBAL_GAME.readInput(null);
    GLOBAL_GAME.newGame();
    GLOBAL_GAME.start();
};

var GameAction_Step = function (){
    GLOBAL_GAME.step();
};

var GameAction_Resume = function (){
    GLOBAL_GAME.resume();
};

var GameAction_Debug = function (){
    let element = <HTMLInputElement>document.getElementById("debug_checkbox");
    RaidNight.Debug.DebugEnabled = element.checked;
};
GameAction_Debug();

document.body.addEventListener("keydown", (event) =>
{
    //console.log(`key: ${event.code} ${event.keyCode}`);

    switch(event.keyCode)
    {
        case 49: // 1
            GameAction_NewGame();
            break;
        case 50: // 2
            GameAction_Step();
            break;
        case 51: // 3
            GameAction_Resume();
            break;
    }
});