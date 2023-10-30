import React, { createContext, useContext, useReducer } from "react";

import { matchListReducer, initialState } from "./reducer";
import { MatchListState, MatchListDispatch } from "./types";

const MatchStateContext = createContext<MatchListState>(initialState);
const MatchListDispatchContext = createContext<MatchListDispatch>(() => {});

export const MatchListProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(matchListReducer, initialState);
  return (
    <MatchStateContext.Provider value={state}>
      <MatchListDispatchContext.Provider value={dispatch}>
        {children}
      </MatchListDispatchContext.Provider>
    </MatchStateContext.Provider>
  );
};

export const useMatchListState = () => useContext(MatchStateContext);
export const useMatchListDispatch = () => useContext(MatchListDispatchContext);
