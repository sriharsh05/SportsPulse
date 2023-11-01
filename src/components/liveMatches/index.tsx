import React, { Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";
import LoadingSpinner from "../LoadingSpinner";
const MatchList = React.lazy(() => import("./MatchList"));

const Matches = () => {
  return (
    <div>
      <div className="flex flex-col w-full">
        <h1 className="text-xl font-bold font-custom">
          Live and upcoming matches
        </h1>
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="suspense-loading">
                <LoadingSpinner />
              </div>
            }
          >
            <MatchList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Matches;
