
module RaidNight.Debug
{
    export var DebugEnabled: boolean = true;
    
    export var log = (message) =>
    {
        console.log("[debug]" + message);
    }
    
    export var logError = (message) =>
    {
        console.log("[error]" + message);
    }
}