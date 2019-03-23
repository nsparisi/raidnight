module RaidNight.Engine
{
    export enum ActionType { Skill, Move }

    export class Action 
    {
        type: ActionType;
        x: integer;
        y: integer;
        skill: string;
        target: string;

        constructor(type: ActionType)
        {
            this.type = type;
        }
    }

    export class action_Move extends Action
    {
        constructor(x: integer, y: integer)
        {
            super(ActionType.Move);
            this.x = x;
            this.y = y;
        }
    }

    export class action_Skill extends Action
    {
        constructor(skill: string, target: string)
        {
            super(ActionType.Skill);
            this.skill = skill;
            this.target = target;
        }
    }

}