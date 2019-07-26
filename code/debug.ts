
module RaidNight.Debug
{
    export var DebugEnabled: boolean = true;
    
    export var log = (message) =>
    {
        console.log(message);
    }

    export var logNewTurn = (turn) =>
    {
        console.log("%c    Executing turn %s    ", "background: #44FFAA", turn);
    }

    export var logDeath = (name) =>
    {
        console.log("%c    %s has fallen!    ", "background: #FF6699", name);
    }
    
    export var logError = (message) =>
    {
        console.error(message);
    }
}