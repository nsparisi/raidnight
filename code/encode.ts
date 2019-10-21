module RaidNight.Engine
{
    export interface EncodedActions {
        knight: [];
        priest: Action[];
        wizard: Action[];
    }

    // These are raw notes on encoding behavior -- saving in case it needs to be picked up in the future
    // type: 0,1,2
    // targets: 0,1,2,3,4,5
    // skill: 0,1,2,3,4,5
    // targettype: 0,1
    // x: 0,1
    // y: 0,1
    //
    // type: 0 (skill)
    // targets: 0,1,2,3,4,5,6  (all, knight, priest, wizard, boss1, boss2, boss3)
    // skill: 0,1,2,3,4,5
    // targettype:0,1 (only if skill is cremate, choose 1)
    //
    // type:1 (move)
    // x: 0,1
    // y: 0,1
    //
    // type:2 (wait)
    export class Encode
    {
        static ENCODE_TABLE = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

        static SKILL_OFFSET = 7;   // max 7 skills at this time (1 buffer)
        static TARGET_OFFSET = 7;  // max 7 targets options: n/a, knight, priest, wizard, boss1, boss2, boss3 
        static MOVE_OFFSET = Encode.SKILL_OFFSET * Encode.TARGET_OFFSET;
        static WAIT_OFFSET = Encode.MOVE_OFFSET + 5;

        static encode(actions: PlayerActions)
        {
            let wizardName = "";
            switch(actions.fight)
            {
                case FightType.Fight1:
                        wizardName = "IWIZARD";
                        break
                case FightType.Fight2:
                        wizardName = "FWIZARD";
                        break
                case FightType.Fight3:
                        wizardName = "EWIZARD";
                        break
            }

            let knightHash = "";
            let priestHash = "";
            let wizardHash = "";
            actions.knight.forEach(action => {
                knightHash += this.encodeHash(this.getHash("KNIGHT", action));
            });
            
            actions.priest.forEach(action => {
                priestHash += this.encodeHash(this.getHash("PRIEST", action));
            });
            
            actions.wizard.forEach(action => {
                wizardHash += this.encodeHash(this.getHash(wizardName, action));
            });

            return JSON.stringify({
                knight: knightHash,
                priest: priestHash,
                wizard: wizardHash,
            });
        }

        static encodeHash(hash: integer):string
        {
            if(!this.ENCODE_TABLE[hash])
            {
                throw `Unable to encode hash ${hash}`;
            }

            return this.ENCODE_TABLE[hash];
        }

        static getHash(characterName: string, action: Action):integer
        {
            if(action.type == ActionType.Skill)
            {
                return this.skillHash(characterName, action.skill) * this.SKILL_OFFSET + 
                       this.targetHash(action.targets);
            }
            else if(action.type == ActionType.Move)
            {
                return this.moveHash(action) + this.MOVE_OFFSET;
            }
            else if(action.type == ActionType.Wait)
            {
                return this.WAIT_OFFSET;
            }

            throw `Unable to encode action ${action.skill} for ${characterName}`;
        }

        static moveHash(action: Action):integer
        {
            if (action.x == 1)
            {
                return 0;
            }
            if (action.x == -1)
            {
                return 1;
            }
            if (action.y == 1)
            {
                return 2;
            }
            if (action.y == -1)
            {
                return 3;
            }

            throw `Unable to encode move action (${action.x}, ${action.y}).`;
        }

        static skillHash(characterName: string, skillName: string):integer
        {
            // grabs the index 0-6 from skill library
            let index = GLOBAL_GAME.library.classSkillLookup[characterName.toUpperCase()].indexOf(skillName.toUpperCase());
            if(index < 0)
            {
                throw `Unable to encode skill action ${characterName}: ${skillName}.`;
            }

            return index;
        }

        static targetHash(targets: string[]):integer
        {
            if(targets.length == 0 || targets.length > 1)
            {
                return 0;
            }

            let target = targets[0];
            switch(target.toUpperCase())
            {
                case "KNIGHT":
                    return 1;
                case "PRIEST":
                    return 2;
                case "WIZARD":
                    return 3;
                case "DRAGON":
                    return 4;
                case "MOSSDRAGON":
                    return 4;
                case "TIMEDRAGON":
                    return 4;
                case "DEVILVINE":
                    return 5;
                case "CORPSEFLOWER":
                    return 6;
                default:
                    return 0;
            }
        }
    }
}
