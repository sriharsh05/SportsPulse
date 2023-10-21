import { Reducer } from "react";
import { MatchListState, MatchListAction, MatchListActionTypes } from "./types";

export const initialState: MatchListState = {
  matches: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const matchListReducer: Reducer<MatchListState, MatchListAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case MatchListActionTypes.FETCH_MATCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case MatchListActionTypes.FETCH_MATCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        matches: action.payload,
      };
    case MatchListActionTypes.FETCH_MATCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case MatchListActionTypes.UPDATE_SCORE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case MatchListActionTypes.UPDATE_SCORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        matches: state.matches.map((match) =>
          match.id === action.payload.id ? action.payload : match
        ),
      };
    case MatchListActionTypes.UPDATE_SCORE_FAILURE:
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
