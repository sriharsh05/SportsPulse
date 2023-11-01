import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import LoadingSpinner from "../../components/LoadingSpinner";
const UpdatePasswordModal = React.lazy(() => import("./UpdatePasswordModal"));
const UpdatePasswordPage = () => {
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
          <UpdatePasswordModal />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default UpdatePasswordPage;
