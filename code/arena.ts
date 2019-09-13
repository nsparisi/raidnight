var actions;
var hot;

module RaidNight.Engine
{
    export enum ArenaState { Win, Lose, InProgress, NotStarted }

    export class Arena 
    {
        enemies: Character[];
        allies: Character[];
        room: Room;
        winTexts = ["NICE WORK!\r\n\r\nTHE DRAGON HAS FALLEN"];

        turn: integer = -2;
        maxTurns: integer = 10000;
        state: ArenaState = ArenaState.NotStarted;

        start = () =>
        {
            this.state = ArenaState.InProgress;
            this.turn = 0;
            hot.render();
        }

        stop = () =>
        {
            this.state = ArenaState.NotStarted;
        }

        executeTurn = () =>
        {
            this.turn++;
            let i = 0;
            Debug.logNewTurn(this.turn);

            if (this.state != ArenaState.InProgress)
            {
                Debug.logError(`Game is not running, cannot execute turn. '${this.state}'`);
            }

            // resolve allies status + action
            for(i = 0; i < this.allies.length; i++)
            {
                this.allies[i].resolveStatus();
            }

            for (i = 0; i < this.allies.length; i++)
            {
                let currTurnAction = null;
                if (this.turn<actions.length) currTurnAction = actions[this.turn][i+2];
                if (!currTurnAction) currTurnAction = new action_Wait();

                this.allies[i].runAI2(currTurnAction);
            }

            // resolve boss status + action
            for (i = 0; i < this.enemies.length; i++)
            {
                this.enemies[i].resolveStatus();
            }

            for (i = 0; i < this.enemies.length; i++)
            {
                this.enemies[i].runAI();
            }

            // resolve room actions
            this.room.runAI();
            hot.render();
            this.checkWinCondition();
            this.checkLoseCondition();
        }

        checkWinCondition = () =>
        {
            let isWon = true;
            let i = 0;
            for (i = 0; i < this.enemies.length; i++)
            {
                if (this.enemies[i].name.toUpperCase().indexOf("SANDPRISM") >= 0)
                {
                    continue;
                }

                if (this.enemies[i].health > 0)
                {
                    isWon = false;
                    break;
                }
            }

            if (isWon)
            {
                Debug.logCondensed(`WON! Enemies are dead.`);
                this.state = ArenaState.Win;

                GLOBAL_GAME.startText(...this.winTexts);
            }
        }
        
        checkLoseCondition = () =>
        {
            if(this.turn >= this.maxTurns)
            {
                Debug.logCondensed(`LOSE! Took too long.`);
                this.state = ArenaState.Lose;
                return;
            }

            let isLose = true;
            let i = 0;
            for (i = 0; i < this.allies.length; i++)
            {
                if (!this.allies[i].isDead())
                {
                    isLose = false;
                    break;
                }
            }

            if (isLose)
            {
                Debug.logCondensed(`LOSE! All allies are dead!`);
                this.state = ArenaState.Lose;
            }
        }

        lookupTarget = (targetName: string) =>
        {
            let i = 0;
            for (i = 0; i < this.enemies.length; i++)
            {
                if (this.enemies[i].name.toUpperCase() == targetName.toUpperCase())
                {
                    return this.enemies[i];
                }
            }

            for (i = 0; i < this.allies.length; i++)
            {
                if (this.allies[i].name.toUpperCase() == targetName.toUpperCase())
                {
                    return this.allies[i];
                }
            }

            Debug.logError(`ERROR: Lookup target failed ${targetName}`);
            return null;
        }
        
        
        findAllTargetsInArea(area: Area)
        {
            let targets = new Array<Character>();

            for (let i = 0; i < this.allies.length; i++)
            {
                let ally = this.allies[i];
                if (this.characterIsInArea(ally, area))
                {
                    targets.push(ally);
                }
            }
            
            for (let i = 0; i < this.enemies.length; i++)
            {
                let enemy = this.enemies[i];
                if (this.characterIsInArea(enemy, area))
                {
                    targets.push(enemy);
                }
            }

            return targets;
        }

        characterIsInArea(character: Character, area: Area)
        {
            return character.x >= area.ul_x &&
                character.x <= area.br_x  &&
                character.y >= area.ul_y &&
                character.y <= area.br_y;
        }
    }
}