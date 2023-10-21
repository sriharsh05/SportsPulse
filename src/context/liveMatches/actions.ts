import { getMatch, getMatcheList } from "../../utils/api";
import { MatchListActionTypes, MatchListDispatch } from "./types";

export const fetchMatches = async (dispatch: MatchListDispatch) => {
  try {
    dispatch({ type: MatchListActionTypes.FETCH_MATCH_REQUEST });
    const response = await getMatcheList();
    if (response.errors) {
      throw new Error(response.errors);
    }
    dispatch({
      type: MatchListActionTypes.FETCH_MATCH_SUCCESS,
      payload: response.matches,
    });
  } catch (error: any) {
    dispatch({
      type: MatchListActionTypes.FETCH_MATCH_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchUpdatedMatchScore = async (
  dispatch: MatchListDispatch,
  matchId: string
) => {
  try {
    dispatch({ type: MatchListActionTypes.UPDATE_SCORE_REQUEST });
    const response = await getMatch(matchId);
    if (response.errors) {
      throw new Error(response.errors);
    }
    dispatch({
      type: MatchListActionTypes.UPDATE_SCORE_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: MatchListActionTypes.UPDATE_SCORE_FAILURE,
      payload: error.message,
    });
  }
};
