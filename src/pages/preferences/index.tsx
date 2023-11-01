import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import LoadingSpinner from "../../components/LoadingSpinner";
const PreferencesModal = React.lazy(() => import("./PreferencesModal"));
const PreferencesPage = () => {
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
          <PreferencesModal />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PreferencesPage;
