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
            let knight = new Character("Knight", 200, 100, 8, 7);
            let priest = new Character("Priest", 150, 200, 13, 7);
            let wizard = new Character("Wizard", 150, 400, 10, 10);

            let inputs = document.getElementsByTagName("textarea");
            let isValid = true;

            for (let i = 0; i < inputs.length; i++)
            {
                switch(inputs[i].id.toUpperCase())
                {
                    case "WIZARD_INPUT": {
                        let result = this.parseRawInput("WIZARD", inputs[i].value);
                        if(!result.hasError)
                        {
                            wizard.actionList = result.actions;
                        }
                        else 
                        {
                            console.log(`Wizard Error: ${result.errorMessage}`);
                            isValid = false;
                        }
                        break
                    }
                    
                    case "PRIEST_INPUT": {
                        let result = this.parseRawInput("PRIEST", inputs[i].value);
                        if(!result.hasError)
                        {
                            priest.actionList = result.actions;
                        }
                        else 
                        {
                            console.log(`Priest Error: ${result.errorMessage}`);
                            isValid = false;
                        }
                        break
                    }
                    
                    case "KNIGHT_INPUT": {
                        let result = this.parseRawInput("KNIGHT", inputs[i].value);
                        if(!result.hasError)
                        {
                            knight.actionList = result.actions;
                        }
                        else 
                        {
                            console.log(`Knight Error: ${result.errorMessage}`);
                            isValid = false;
                        }
                        break
                    }
                }
            }

            if (isValid)
            {
                return [knight, priest, wizard];
            }
            else 
            {
                return null;
            }
        }

        parseRawInput = (className: string, raw: string): InputResult =>
        {
            // "Flare:Dragon,Fireball:Dragon,Move:Up,Fireball:Dragon";
            let actions: Action[] = [];
            let validTargets = ["DRAGON", "WIZARD", "PRIEST", "KNIGHT"];

            console.log(`Parsing input ${raw}`);
            
            // join newlines into a single line
            raw = raw.split("\r\n").join(" ").split("\r").join(" ").split("\n").join(" ");

            let actionTokens = raw.split(" ");
            let i = 0;
            for (i = 0; i < actionTokens.length; i++)
            {
                let components = actionTokens[i].split(":")

                if (components.length > 0 && components[0].trim().toUpperCase()=="WAIT")
                {
                    actions.push(new action_Wait());
                    continue;
                }

                if (components.length == 1 && components[0].trim().length == 0)
                {
                    // empty string
                    continue;
                }

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
                else if (GLOBAL_GAME.library.lookupSkillForClass(className, action))
                {
                    if (!validTargets.includes(target.toUpperCase()))
                    {
                        return this.generateErrorResult(`Invalid target ${target}`);
                    }

                    actions.push(new action_Skill(action, [target]));
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
