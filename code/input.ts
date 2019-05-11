module RaidNight.Engine
{
    export interface InputResult {
        hasError:boolean;
        errorMessage:string;
        actions: Action[];
    } 

    enum TokenType { Wait, Loop, Arg_Open, Arg_Close, Block_Open, Block_Close, Skill_Operator, Alphabetic, Numeric }

    interface Token {
        token: string;
        type: TokenType;
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
            let knight = new Character("Knight", 200, 100, 7, 7);
            let priest = new Character("Priest", 150, 200, 12, 6);
            let wizard = new Character("Wizard", 150, 400, 12, 8);

            let inputs = document.getElementsByTagName("textarea");
            let isValid = true;

            for (let i = 0; i < inputs.length; i++)
            {
                switch(inputs[i].id.toUpperCase())
                {
                    case "WIZARD_INPUT": {
                        let result = this.parseWrapper("WIZARD", inputs[i].value);
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
                        let result = this.parseWrapper("PRIEST", inputs[i].value);
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
                        let result = this.parseWrapper("KNIGHT", inputs[i].value);
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
            let validTargets = ["DRAGON", "WIZARD", "PRIEST", "KNIGHT"];

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
                    throw "ERROR P3";
                }

                if (action.token == "MOVE")
                {
                    let operator = tokens[seek++];
                    let target = tokens[seek++];

                    if (operator == null || target == null || 
                        operator.type != TokenType.Skill_Operator || 
                        target.type != TokenType.Alphabetic)
                    {
                        throw "ERROR P4";
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
                            throw "ERROR P5";
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
                            throw "ERROR P6";
                        }
                    }

                    let skill = GLOBAL_GAME.library.lookupSkill(action.token);
                    if (skill.selfOnly || skill.allAllies)
                    {
                        return new action_Skill(action.token, ["all"]);
                    }
                    
                    if (operator == null || target == null)
                    {
                        throw "ERROR P7";
                    }

                    if (validTargets.includes(target.token))
                    {
                        return new action_Skill(action.token, [target.token])
                    }
                } 

                throw "ERROR P8";
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
                    throw "ERROR L4";
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
                            throw "ERROR L1";
                        }
                    }
                }
                
                if (tokens[seek] == null)
                {
                    throw "ERROR L2";
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
                        throw "ERROR B9";
                    }
                }
            }

            for(let i = 0; i < actions.length; i++)
            {
                console.log(`b ${ActionType[actions[i].type]} name: ${actions[i].skill} target: ${actions[i].targets[0]}`);
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
                    throw "ERROR 1"
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
                //console.log(`seek: ${seek} token: ${token.token} type: ${TokenType[token.type]}`);
            }

            return tokens;
        }
    }
}
