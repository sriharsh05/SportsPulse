import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import LoadingSpinner from "../../components/LoadingSpinner";
const FavoritesModal = React.lazy(() => import("./FavoritesModal"));

const FavoritesPage = () => {
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
          <FavoritesModal />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default FavoritesPage;
