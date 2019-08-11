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
    let team = GLOBAL_INPUT_HELPER.parseInputCreateTeam(RaidNight.Engine.FightType.Fight1);
    if (team)
    {
        GLOBAL_GAME.readInput(team);
        GLOBAL_GAME.newGame();
        GLOBAL_GAME.start();
    }
};

var GameAction_ReadInput2 = function (){
    GLOBAL_GAME.stop();
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
    let team = GLOBAL_INPUT_HELPER.parseInputCreateTeam(RaidNight.Engine.FightType.Fight3);
    if (team)
    {
        GLOBAL_GAME.readInput(team);
        GLOBAL_GAME.newGame();
        GLOBAL_GAME.start();
    }
};

var GameAction_NewGame = function (){
    if(GLOBAL_GAME.allyActions == null)
    {
        console.log("Please read a valid input before beginning a new game.");
        return;
    }

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

    // prevent arrow keys from manipulating the page
    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }

    switch(event.keyCode)
    {
        case 37: // left
            GameAction_NewGame();
            break;
        case 40: //down
            GameAction_Step();
            break;
        case 39: //right
            GameAction_Resume();
            break;
        case 81: //Q
            GameAction_NewGame();
            break;
        case 87: //W
            GameAction_Step();
            break;
        case 69: //E
            GameAction_Resume();
            break;
    }
});