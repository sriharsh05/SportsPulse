import React, { createContext, useContext, useReducer } from "react";

import { articleListReducer, initialState } from "./reducer";
import { ArticleListState, ArticleListDispatch } from "./types";

const ArticleStateContext = createContext<ArticleListState>(initialState);
const ArticleListDispatchContext = createContext<ArticleListDispatch>(() => {});

export const ArticleListProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(articleListReducer, initialState);
  return (
    <ArticleStateContext.Provider value={state}>
      <ArticleListDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleListDispatchContext.Provider>
    </ArticleStateContext.Provider>
  );
};

export const useArticleListState = () => useContext(ArticleStateContext);
export const useArticleListDispatch = () =>
  useContext(ArticleListDispatchContext);
