module RaidNight.Engine
{
    export enum ActionType { Skill, Move, Wait }

    export enum TargetType { Character, Area }

    export class Area
    {
        ul_x: integer;
        ul_y: integer;
        br_x: integer;
        br_y: integer;

        constructor(ul_x: integer, ul_y: integer, br_x: integer, br_y: integer)
        {
            this.ul_x = ul_x;
            this.ul_y = ul_y;
            this.br_x = br_x;
            this.br_y = br_y;
        }
    }

    export class Action 
    {
        type: ActionType;
        x: integer;
        y: integer;
        skill: string;
        targets: string[];
        area: Area;
        targetType: TargetType;

        constructor(type: ActionType)
        {
            this.type = type;
            this.targets = [];
        }
    }
    export class action_Wait extends Action
    {
        constructor()
        {
            super(ActionType.Wait);
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
        constructor(skill: string, targets: string[])
        {
            super(ActionType.Skill);
            this.skill = skill;
            this.targets = targets;
            this.targetType = TargetType.Character;
        }
    }

    export class action_AreaSkill extends Action
    {
        constructor(skill: string, area: Area)
        {
            super(ActionType.Skill);
            this.skill = skill;
            this.area = area;
            this.targetType = TargetType.Area;
        }
    }

}