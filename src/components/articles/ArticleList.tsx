import { useEffect } from "react";
import { useArticleListDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import ArticleOptions from "./ArticleOptions";

const ArticleList = () => {
  const articleListDispatch = useArticleListDispatch();
  useEffect(() => {
    fetchArticles(articleListDispatch);
  }, [articleListDispatch]);

  return (
    <div className="mt-4">
      <ArticleOptions />
    </div>
  );
};

export default ArticleList;
