
module RaidNight.Engine
{
    export enum ArenaState { Win, Lose, InProgress, NotStarted }

    export class Arena 
    {
        enemies: Character[];
        allies: Character[];
        board: Board;

        turn: integer = 0;
        maxTurns: integer = 1000;
        state: ArenaState = ArenaState.NotStarted;

        setup = () =>
        {
            this.state = ArenaState.InProgress;
        }

        executeTurn = () =>
        {
            this.turn++;
            console.log(`Executing turn ${this.turn}`);

            if (this.state != ArenaState.InProgress)
            {
                console.log(`Game is not running, cannot execute turn. '${this.state}'`);
            }

            let i = 0;
            for( i = 0; i < this.allies.length; i++)
            {
                this.allies[i].runAI();
            }

            for (i = 0; i < this.enemies.length; i++)
            {
                this.enemies[i].runAI();
            }

            this.checkWinCondition();
            this.checkLoseCondition();
        }

        checkWinCondition = () =>
        {
            let isWon = true;
            let i = 0;
            for (i = 0; i < this.enemies.length; i++)
            {
                if(this.enemies[i].health > 0)
                {
                    isWon = false;
                    break;
                }
            }

            if (isWon)
            {
                console.log(`WON! Enemies are dead.`);
                this.state = ArenaState.Win;
            }
        }
        
        checkLoseCondition = () =>
        {
            if(this.turn >= this.maxTurns)
            {
                console.log(`LOSE! Took too long.`);
                this.state = ArenaState.Lose;
                return;
            }

            let isLose = false;
            let i = 0;
            for(i = 0; i < this.allies.length; i++)
            {
                if(this.allies[i].health <= 0)
                {
                    console.log(`LOSE! ${this.allies[i].name} has died!`);
                    isLose = true;
                    break;
                }
            }

            if (isLose)
            {
                this.state = ArenaState.Lose;
            }
        }

        lookupTarget = (targetName: string) =>
        {
            let i = 0;
            for(i = 0; i < this.enemies.length; i++)
            {
                if (this.enemies[i].name.toUpperCase() == targetName.toUpperCase())
                {
                    return this.enemies[i];
                }
            }

            for(i = 0; i < this.allies.length; i++)
            {
                if (this.allies[i].name.toUpperCase() == targetName.toUpperCase())
                {
                    return this.allies[i];
                }
            }

            console.log(`ERROR: Lookup target failed ${targetName}`);
            return null;
        }
    }
}