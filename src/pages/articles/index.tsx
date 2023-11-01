import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import LoadingSpinner from "../../components/LoadingSpinner";
const ArticleModal = React.lazy(() => import("./ArticleModal"));
const ArticlePage = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="suspense-loading">
              <LoadingSpinner />
            </div>
          }
        >
          <ArticleModal />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default ArticlePage;
