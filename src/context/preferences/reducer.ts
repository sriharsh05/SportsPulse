import { Reducer } from "react";
import {
  PreferencesAction,
  PreferencesActionTypes,
  PreferencesState,
} from "./types";

export const initialState: PreferencesState = {
  preferences: {
    sports: [],
    teams: [],
  },
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const preferencesReducer: Reducer<
  PreferencesState,
  PreferencesAction
> = (state = initialState, action) => {
  switch (action.type) {
    case PreferencesActionTypes.FETCH_PREFERENCES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PreferencesActionTypes.FETCH_PREFERENCES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        preferences: action.payload,
      };
    case PreferencesActionTypes.FETCH_PREFERENCES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case PreferencesActionTypes.UPDATE_PREFERENCES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PreferencesActionTypes.UPDATE_PREFERENCES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        preferences: action.payload,
      };
    case PreferencesActionTypes.UPDATE_PREFERENCES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
