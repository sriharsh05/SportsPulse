import React, { Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";
import LoadingSpinner from "../LoadingSpinner";
const FavouriteList = React.lazy(() => import("./FavouriteList"));

const FavouriteNews = () => {
  return (
    <div className="mt-4 ml-2 p-2">
      <h2 className="text-xl font-bold font-custom">Favourites</h2>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="suspense-loading">
              <LoadingSpinner />
            </div>
          }
        >
          <FavouriteList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default FavouriteNews;
