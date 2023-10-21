export type Team = {
  id: number;
  name: string;
};

export interface MatchPreview {
  id: number;
  name: string;
  sportName: string;
  location: string;
  isRunning: boolean;
  endsAt: string;
  teams: Team[];
}

export interface MatchListState {
  matches: MatchPreview[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export enum MatchListActionTypes {
  FETCH_MATCH_REQUEST = "FETCH_MATCH_REQUEST",
  FETCH_MATCH_SUCCESS = "FETCH_MATCH_SUCCESS",
  FETCH_MATCH_FAILURE = "FETCH_MATCH_FAILURE",

  UPDATE_MATCH_REQUEST = "UPDATE_MATCH_REQUEST",
  UPDATE_MATCH_SUCCESS = "UPDATE_MATCH_SUCCESS",
  UPDATE_MATCH_FAILURE = "UPDATE_MATCH_FAILURE",
}

export type MatchListAction =
  | { type: MatchListActionTypes.FETCH_MATCH_REQUEST }
  | { type: MatchListActionTypes.FETCH_MATCH_SUCCESS; payload: MatchPreview[] }
  | { type: MatchListActionTypes.FETCH_MATCH_FAILURE; payload: string }
  | { type: MatchListActionTypes.UPDATE_MATCH_REQUEST; payload: number }
  | { type: MatchListActionTypes.UPDATE_MATCH_SUCCESS; payload: MatchPreview }
  | { type: MatchListActionTypes.UPDATE_MATCH_FAILURE; payload: string };

export type MatchListDispatch = React.Dispatch<MatchListAction>;