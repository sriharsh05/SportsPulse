import React, { Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";
import LoadingSpinner from "../LoadingSpinner";
const ArticleList = React.lazy(() => import("./ArticleList"));

const Article = () => {
  return (
    <div className="mt-4 col-span-3">
      <h1 className="text-xl font-bold font-custom">Sports Articles</h1>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="suspense-loading">
              <LoadingSpinner />
            </div>
          }
        >
          <ArticleList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Article;
