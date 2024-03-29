import React, { PropsWithChildren } from "react";
import {
  IStatsAction,
  IStatsState,
  StatsReducer,
} from "../reducers/StatsReducer";

interface IStatsInitialState {
  state: IStatsState;
  dispatch: React.Dispatch<IStatsAction>;
}

export const StateContext = React.createContext<IStatsInitialState>({
  state: {} as IStatsState,
  dispatch: () => null,
});

export const StatsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(StatsReducer, {
    projectList: [],
    currentProject: undefined,
    currentDate: {
      startDate: new Date(),
      endDate: new Date(Date.now() + 3600 * 1000 * 24),
    },
    allTeamMembers: [],
    reducedTeamMembers: [],
  });

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
