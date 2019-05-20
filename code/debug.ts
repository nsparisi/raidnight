
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
    
    export var logError = (message) =>
    {
        console.error(message);
    }
}