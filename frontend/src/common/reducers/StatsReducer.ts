import { Reducer } from "react";
import { StatsActions } from "../enums/StatsActions";
import { IDateContainer } from "../interfaces/IDateContainer";
import { IStatsTeamMember } from "../interfaces/IStatsTeamMember";
import { IProjectNameState } from "../interfaces/IProjectNameState";

export interface IStatsAction {
  type: StatsActions;
  payload?: any;
}

export interface IStatsState {
  projectList: IProjectNameState[];
  currentProject: IProjectNameState | undefined;
  currentDate: IDateContainer;
  allTeamMembers: IStatsTeamMember[];
  reducedTeamMembers: IStatsTeamMember[];
}

export const StatsReducer: Reducer<IStatsState, IStatsAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "SET_PROJECT_LIST": {
      return {
        ...state,
        projectList: action.payload,
      };
    }
    case "SET_PROJECT": {
      return {
        ...state,
        currentProject: action.payload,
      };
    }
    case "SET_CURRENT_DATE": {
      return {
        ...state,
        currentDate: action.payload,
      };
    }
    case "SET_ALL_TEAM_MEMBERS": {
      return {
        ...state,
        allTeamMembers: action.payload,
      };
    }
    case "SET_REDUCED_TEAM_MEMBERS": {
      return {
        ...state,
        reducedTeamMembers: action.payload,
      };
    }
    case "REMOVE_TEAM_MEMBER": {
      const newTeamMembers: IStatsTeamMember[] =
        state.reducedTeamMembers.filter(
          (member) => member.uniqueName !== action.payload
        );
      return {
        ...state,
        reducedTeamMembers: newTeamMembers,
      };
    }
    case "ADD_TEAM_MEMBER": {
      const teamMember = state.allTeamMembers.find(
        (member) => member.uniqueName === action.payload
      );

      if (teamMember && !state.reducedTeamMembers.includes(teamMember)) {
        return {
          ...state,
          reducedTeamMembers: state.reducedTeamMembers.push(teamMember),
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};
