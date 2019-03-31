module RaidNight.Engine
{
    export interface InputResult {
        hasError:boolean;
        errorMessage:string;
        actions: Action[];
    } 

    export class Input
    {
        private generateErrorResult = (errorMessage: string): InputResult =>
        {
            return {
                hasError: true,
                errorMessage: errorMessage,
                actions: null
            }
        }

        private generateSuccessResult = (actions: Action[]): InputResult =>
        {
            return {
                hasError: false,
                errorMessage: "",
                actions: actions
            }
        }

        parseInputCreateTeam = (): Character[] =>
        {
            let warrior = new Character("Warrior", 200, 100, 10, 8);
            let priest = new Character("Priest", 100, 200, 12, 6);
            let wizard = new Character("Wizard", 100, 200, 12, 10);

            let inputs = document.getElementsByTagName("textarea");
            for (let i = 0; i < inputs.length; i++)
            {
                switch(inputs[i].id.toUpperCase())
                {
                    case "WIZARD_INPUT": {
                        let result = this.parseRawInput(inputs[i].value);
                        if(!result.hasError)
                        {
                            wizard.actionList = result.actions;
                        }
                        else 
                        {
                            console.log(`Wizard Error: ${result.errorMessage}`);
                        }
                        break
                    }
                    
                    case "PRIEST_INPUT": {
                        let result = this.parseRawInput(inputs[i].value);
                        if(!result.hasError)
                        {
                            priest.actionList = result.actions;
                        }
                        else 
                        {
                            console.log(`Priest Error: ${result.errorMessage}`);
                        }
                        break
                    }
                    
                    case "WARRIOR_INPUT": {
                        let result = this.parseRawInput(inputs[i].value);
                        if(!result.hasError)
                        {
                            warrior.actionList = result.actions;
                        }
                        else 
                        {
                            console.log(`Warrior Error: ${result.errorMessage}`);
                        }
                        break
                    }
                }
            }

            if (warrior.actionList && priest.actionList && wizard.actionList)
            {
                return [warrior, priest, wizard];
            }
            else 
            {
                return null;
            }
        }

        parseRawInput = (raw: string): InputResult =>
        {
            // "Flare:Dragon,Fireball:Dragon,Move:Up,Fireball:Dragon";
            let actions: Action[] = [];
            let validTargets = ["DRAGON", "WIZARD", "PRIEST", "WARRIOR"];

            console.log(`Parsing input ${raw}`);
            
            let actionTokens = raw.split(",");
            let i = 0;
            for (i = 0; i < actionTokens.length; i++)
            {
                let components = actionTokens[i].split(":")
                if (components.length != 2)
                {
                    return this.generateErrorResult("Input not in correct format.");
                }

                let action = components[0].trim();
                let target = components[1].trim();

                if (action.toUpperCase() == "MOVE")
                {
                    switch (target.toUpperCase())
                    {
                        case "UP": {
                            actions.push(new action_Move(0, -1));
                            break;
                        }
                        case "DOWN": {
                            actions.push(new action_Move(0, 1));
                            break;
                        }
                        case "LEFT": {
                            actions.push(new action_Move(-1, 0));
                            break;
                        }
                        case "RIGHT": {
                            actions.push(new action_Move(1, 0));
                            break;
                        }
                        default: {
                            return this.generateErrorResult("Valid MOVE actions are UP,DOWN,LEFT,RIGHT");
                        }
                    }

                    continue;
                }
                else if (GLOBAL_GAME.library.lookupSkill(action) != null)
                {
                    if (!validTargets.includes(target.toUpperCase()))
                    {
                        return this.generateErrorResult(`Invalid target ${target}`);
                    }

                    actions.push(new action_Skill(action, target));
                    continue;
                } 
                else 
                {
                    return this.generateErrorResult(`Invalid action ${action}`);
                }
            }

            return this.generateSuccessResult(actions);
        }
    }
}
