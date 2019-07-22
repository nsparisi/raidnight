module RaidNight.Engine
{
    export interface InputResult {
        hasError:boolean;
        errorMessage:string;
        actions: Action[];
    } 

    export interface PlayerActions {
        knight: Action[];
        priest: Action[];
        wizard: Action[];
    }

    enum TokenType { Wait, Loop, Arg_Open, Arg_Close, Block_Open, Block_Close, Skill_Operator, Alphabetic, Numeric }

    interface Token {
        token: string;
        type: TokenType;
    }

    export class Input
    {
        validTargets = ["DRAGON", "WIZARD", "PRIEST", "KNIGHT"];

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

        parseInputCreateTeam = (fightType: FightType): PlayerActions =>
        {
            let inputs = document.getElementsByTagName("textarea");
            let isValid = true;
            let wizardName = ""
            let playerActions = {
                knight: [],
                priest: [],
                wizard: [],
            }

            if (fightType == FightType.Fight1)
            {
                wizardName = "IWIZARD";
                this.validTargets = ["DRAGON", "WIZARD", "PRIEST", "KNIGHT"];
            }
            else if (fightType == FightType.Fight2)
            {
                wizardName = "FWIZARD";
                this.validTargets = ["MOSSDRAGON", "DEVILVINE", "CORPSEFLOWER", "WIZARD", "PRIEST", "KNIGHT"];
            }
            else
            {
                wizardName = "EWIZARD";
                this.validTargets = ["DRAGON", "WIZARD", "PRIEST", "KNIGHT"];
            }

            for (let i = 0; i < inputs.length; i++)
            {
                switch(inputs[i].id.toUpperCase())
                {
                    case "WIZARD_INPUT": {
                        let result = this.parseWrapper(wizardName, inputs[i].value);
                        if(!result.hasError)
                        {
                            playerActions.wizard = result.actions;
                        }
                        else 
                        {
                            Debug.logError(`Wizard Error: ${result.errorMessage}`);
                            isValid = false;
                        }
                        break
                    }
                    
                    case "PRIEST_INPUT": {
                        let result = this.parseWrapper("PRIEST", inputs[i].value);
                        if(!result.hasError)
                        {
                            playerActions.priest = result.actions;
                        }
                        else 
                        {
                            Debug.logError(`Priest Error: ${result.errorMessage}`);
                            isValid = false;
                        }
                        break
                    }
                    
                    case "KNIGHT_INPUT": {
                        let result = this.parseWrapper("KNIGHT", inputs[i].value);
                        if(!result.hasError)
                        {
                            playerActions.knight = result.actions;
                        }
                        else 
                        {
                            Debug.logError(`Knight Error: ${result.errorMessage}`);
                            isValid = false;
                        }
                        break
                    }
                }
            }

            if (isValid)
            {
                return playerActions;
            }
            else 
            {
                return null;
            }
        }

        parseWrapper = (className: string, raw: string): InputResult => 
        {
            try {
                let actions = this.parse(className, raw);
                return this.generateSuccessResult(actions);
            }
            catch (e) {
                return this.generateErrorResult(e);
            }
        }

        parse = (className: string, raw: string): Action[] =>
        {
            let seek = 0;
            let tokens = this.tokenize(raw);

            let process_wait = (): Action =>
            {
                seek++;
                return new action_Wait();
            }
            
            let process_action = (): Action =>
            {
                let action = tokens[seek++];

                if (action == null  || 
                    action.type != TokenType.Alphabetic)
                {
                    throw `Did not understand action: '${action.token}'`;
                }

                if (action.token == "MOVE")
                {
                    let operator = tokens[seek++];
                    let target = tokens[seek++];

                    if (operator == null || target == null || 
                        operator.type != TokenType.Skill_Operator || 
                        target.type != TokenType.Alphabetic)
                    {
                        throw `MOVE command should be of the format 'MOVE:[UP|DOWN|LEFT|RIGHT]'.`;
                    }

                    switch (target.token)
                    {
                        case "UP": {
                            return new action_Move(0, -1);
                        }
                        case "DOWN": {
                            return new action_Move(0, 1);
                        }
                        case "LEFT": {
                            return new action_Move(-1, 0);
                        }
                        case "RIGHT": {
                            return new action_Move(1, 0);
                        }
                        default: {
                            throw `MOVE command should be followed by either of UP DOWN LEFT RIGHT but was '${target.token}'.`;
                        }
                    }
                }

                if (GLOBAL_GAME.library.lookupSkillForClass(className, action.token))
                {
                    let operator:Token = null;
                    let target:Token = null;
                    if (tokens[seek] != null && tokens[seek].type == TokenType.Skill_Operator)
                    {
                        operator = tokens[seek++];
                        target = tokens[seek++];
    
                        if (operator == null || target == null || 
                            operator.type != TokenType.Skill_Operator || 
                            target.type != TokenType.Alphabetic)
                        {
                            throw `Skill '${action.token}' was not in the correct format 'skill:target'.`;
                        }
                    }

                    let skill = GLOBAL_GAME.library.lookupSkill(action.token);
                    if (skill.selfOnly || skill.allAllies)
                    {
                        return new action_Skill(action.token, ["all"]);
                    }
                    
                    if (operator == null || target == null)
                    {
                        throw `Skill '${action.token}' was not in the correct format 'skill:target'.`;
                    }

                    if (this.validTargets.includes(target.token))
                    {
                        return new action_Skill(action.token, [target.token])
                    }
                    else
                    {
                        throw `Target '${target.token}' is not a valid target.`;
                    }
                } 

                throw `Skill '${action.token}' is not appropriate for this character.`;
            }
            
            let process_loop = (): Action[] =>
            {
                let token1 = tokens[seek++]; // loop
                let token2 = tokens[seek++]; // (
                let token3 = tokens[seek++]; // 5
                let token4 = tokens[seek++]; // )
                let token5 = tokens[seek++]; // {

                if (token1 == null || token1.type != TokenType.Loop || 
                    token2 == null || token2.type != TokenType.Arg_Open || 
                    token3 == null || token3.type != TokenType.Numeric || 
                    token4 == null || token4.type != TokenType.Arg_Close || 
                    token5 == null || token5.type != TokenType.Block_Open)
                {
                    throw `Loop statement not in the correct format of 'loop(num){}'.`;
                }

                let loopedActions: Action[] = [];
                while (tokens[seek] != null && tokens[seek].type != TokenType.Block_Close)
                {
                    switch(tokens[seek].type)
                    {
                        case TokenType.Wait: {
                            loopedActions.push(process_wait());
                            break;
                        }

                        case TokenType.Alphabetic: {
                            loopedActions.push(process_action());
                            break;
                        }

                        default: {
                            throw `Could not process word '${tokens[seek].token}' within a loop statement.`;
                        }
                    }
                }
                
                if (tokens[seek] == null)
                {
                    throw `Loop statement did not end with a curly brace '}'.`;
                }

                seek++;

                let totalActions: Action[] = [];
                for (let i = 0; i < Number(token3.token); i++)
                {
                    totalActions = totalActions.concat(loopedActions);
                }

                return totalActions;
            }


            let actions: Action[] = [];
            while (seek < tokens.length)
            {
                switch(tokens[seek].type)
                {
                    case TokenType.Wait: {
                        actions.push(process_wait());
                        break;
                    }

                    case TokenType.Loop: {
                        actions = actions.concat(process_loop());
                        break
                    }

                    case TokenType.Alphabetic: {
                        actions.push(process_action());
                        break;
                    }

                    default: {
                        throw `Did not understand token ${tokens[seek].token}`;
                    }
                }
            }

            for(let i = 0; i < actions.length; i++)
            {
                // Debug.log(`b ${ActionType[actions[i].type]} name: ${actions[i].skill} target: ${actions[i].targets[0]}`);
            }

            if (actions.length == 0)
            {
                throw `No actions were found.`;
            }

            return actions;
        }

        tokenize = (raw: string): Token[] => 
        {
            let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let numerals = "0123456789"
            let symbols = "(){}:";

            let token_wait = "WAIT";
            let token_loop = "LOOP";
            let token_arg_open = "(";
            let token_arg_close = ")";
            let token_block_open = "{";
            let token_block_close = "}";
            let token_skill_operator = ":";

            let seek = 0;
            raw = raw.split("\r\n").join(" ").split("\r").join(" ").split("\n").join(" ").trim().toUpperCase();

            let isWhiteSpace = (char:string) =>
            {
                return char == null || char == "" || char == " " || char == "\n" || char == "\r" || char == "\t";
            }

            let isAlphabetic = (char:string) =>
            {
                return alphabet.indexOf(char) >= 0;
            }

            let isNumeric = (char:string) =>
            {
                return numerals.indexOf(char) >= 0;
            }

            let isAlphaNumeric = (char:string) =>
            {
                return isAlphabetic(char) || isNumeric(char);
            }

            let isSymbol = (char:string) =>
            {
                return symbols.indexOf(char) >= 0;
            }

            let readToken = (): Token =>
            {
                let token = "";
                let char = "";
                let type: TokenType = null;

                while (isWhiteSpace(char))
                {
                    char = raw[seek++];
                }
                
                if (isSymbol(char))
                {
                    switch (char)
                    {
                        case token_block_open: {
                            type = TokenType.Block_Open;
                            break;
                        }
                        case token_block_close: {
                            type = TokenType.Block_Close;
                            break;
                        }
                        case token_arg_open: {
                            type = TokenType.Arg_Open;
                            break;
                        }
                        case token_arg_close: {
                            type = TokenType.Arg_Close;
                            break;
                        }
                        case token_skill_operator: {
                            type = TokenType.Skill_Operator;
                            break;
                        }
                    }
                    
                    return {token: char, type: type};
                }

                if (!isAlphaNumeric(char))
                {
                    throw `Error reading character ${char} at position ${seek}.`
                }

                if (isAlphabetic(char))
                {
                    while (isAlphabetic(char))
                    {
                        token += char;
                        char = raw[seek++];
                    }

                    seek--;

                    switch (token)
                    {
                        case token_wait: {
                            type = TokenType.Wait;
                            break;
                        }
                        case token_loop: {
                            type = TokenType.Loop;
                            break;
                        }
                        default: {
                            type = TokenType.Alphabetic;
                            break;
                        }
                    }
                }

                else if (isNumeric(char))
                {
                    while (isNumeric(char))
                    {
                        token += char;
                        char = raw[seek++];
                    }
    
                    seek--;
                    type = TokenType.Numeric;
                }

                return {token: token, type: type};
            }

            let tokens = [];
            while (seek < raw.length)
            {
                let token = readToken();
                tokens.push(token);
                //Debug.log(`seek: ${seek} token: ${token.token} type: ${TokenType[token.type]}`);
            }

            return tokens;
        }
    }
}
