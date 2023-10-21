import { Reducer } from "react";
import {
  ArticleListState,
  ArticleListAction,
  ArticleListActionTypes,
} from "./types";

export const initialState: ArticleListState = {
  articles: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const articleListReducer: Reducer<
  ArticleListState,
  ArticleListAction
> = (state = initialState, action) => {
  switch (action.type) {
    case ArticleListActionTypes.FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ArticleListActionTypes.FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: action.payload,
      };
    case ArticleListActionTypes.FETCH_ARTICLES_FAILURE:
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
