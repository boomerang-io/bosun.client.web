import React from "react";
import ErrorDragonComponent from "@boomerang/boomerang-components/lib/ErrorDragon";
import { BASE_LAUNCH_ENV_URL } from "config/platformUrlConfig";

function ErrorDragon(props) {
  return (
    <ErrorDragonComponent
      {...props}
      theme="brmg-white"
      includeReportBug={false}
      statusUrl={`${BASE_LAUNCH_ENV_URL}/status`}
    />
  );
}

export default ErrorDragon;
