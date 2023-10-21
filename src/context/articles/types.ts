import { Team } from "../liveMatches/types";

export type Sport = {
  id: number;
  name: string;
};

export interface ArticlePreview {
  id: number;
  title: string;
  date: string;
  sport: Sport;
  thumbnail: string;
  summary: string;
  content?: string;
  teams: Team[] | [];
}

export interface ArticleListState {
  articles: ArticlePreview[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export enum ArticleListActionTypes {
  FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST",
  FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS",
  FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE",
}

export type ArticleListAction =
  | { type: ArticleListActionTypes.FETCH_ARTICLES_REQUEST }
  | { type: ArticleListActionTypes.FETCH_ARTICLES_SUCCESS; payload: ArticlePreview[] }
  | { type: ArticleListActionTypes.FETCH_ARTICLES_FAILURE; payload: string };

export type ArticleListDispatch = React.Dispatch<ArticleListAction>;
