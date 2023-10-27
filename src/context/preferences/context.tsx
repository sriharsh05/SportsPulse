import React, { createContext, useContext, useReducer } from "react";

import { preferencesReducer, initialState } from "./reducer";
import { PreferencesState, PreferencesDispatch } from "./types";

const PreferencesStateContext = createContext<PreferencesState>(initialState);
const PreferencesDispatchContext = createContext<PreferencesDispatch>(() => {});

export const PreferencesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(preferencesReducer, initialState);
  return (
    <PreferencesStateContext.Provider value={state}>
      <PreferencesDispatchContext.Provider value={dispatch}>
        {children}
      </PreferencesDispatchContext.Provider>
    </PreferencesStateContext.Provider>
  );
};

export const usePreferencesState = () => useContext(PreferencesStateContext);
export const usePreferencesDispatch = () =>
  useContext(PreferencesDispatchContext);
