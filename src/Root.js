import React from "react";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "components/ErrorBoundary";
import ErrorDragon from "components/ErrorDragon";
import App from "features/App";
import { APP_ROOT } from "config/appConfig";

export default function Root() {
  return (
    <ErrorBoundary errorComponent={ErrorDragon}>
      <BrowserRouter basename={APP_ROOT}>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
