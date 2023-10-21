import { getMatcheList } from "../../utils/api";
import { MatchListActionTypes, MatchListDispatch } from "./types";

export const fetchMatches = async (
  dispatch: MatchListDispatch
) => {
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