import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "components/ErrorBoundary";
import ErrorDragon from "components/ErrorDragon";
import App from "features/App";
import { APP_ROOT } from "config/appConfig";

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default function Root({ store }) {
  return (
    <ErrorBoundary errorComponent={ErrorDragon}>
      <BrowserRouter basename={APP_ROOT}>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
