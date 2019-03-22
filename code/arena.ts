class Arena 
{
    enemies: Character[];
    allies: Character[];

    turn: integer = 0;

    executeTurn = () =>
    {
        this.turn++;
        console.log(`Executing turn ${this.turn}`)

        let i = 0;
        for(i = 0; i < this.allies.length; i++)
        {
            this.allies[i].runAI();
        }

        for(i = 0; i < this.enemies.length; i++)
        {
            this.enemies[i].runAI();
        }
    }

}