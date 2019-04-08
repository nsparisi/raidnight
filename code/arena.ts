
module RaidNight.Engine
{
    export enum ArenaState { Win, Lose, InProgress, NotStarted }

    export class Arena 
    {
        enemies: Character[];
        allies: Character[];
        room: Room;

        turn: integer = 0;
        maxTurns: integer = 1000;
        state: ArenaState = ArenaState.NotStarted;

        start = () =>
        {
            this.state = ArenaState.InProgress;
            this.turn = 0;
        }

        stop = () =>
        {
            this.state = ArenaState.NotStarted;
        }

        executeTurn = () =>
        {
            this.turn++;
            let i = 0;
            console.log(`Executing turn ${this.turn}`);

            if (this.state != ArenaState.InProgress)
            {
                console.log(`Game is not running, cannot execute turn. '${this.state}'`);
            }

            // resolve allies status + action
            for(i = 0; i < this.allies.length; i++)
            {
                this.allies[i].resolveStatus();
            }

            for (i = 0; i < this.allies.length; i++)
            {
                this.allies[i].runAI();
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
                console.log(`LOSE! All allies are dead!`);
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

            console.log(`ERROR: Lookup target failed ${targetName}`);
            return null;
        }
        
        
        findAlliesInArea(area: Area)
        {
            let targets = new Array<Character>();

            for (let i = 0; i < this.allies.length; i++)
            {
                let ally = this.allies[i];
               
                console.log(`characterIsInArea: ${ally.x},${ally.y} :: ${area.ul_x},${area.ul_y} - ${area.br_x},${area.br_y} :: ${this.characterIsInArea(ally, area)}`);
                
                if (this.characterIsInArea(ally, area))
                {
                    console.log(`ROOM found a valid target in area: ${ally.name}.`);
                    targets.push(ally);
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