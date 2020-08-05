import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ErrorDragon, ErrorBoundary } from "@boomerang-io/carbon-addons-boomerang-react";
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
