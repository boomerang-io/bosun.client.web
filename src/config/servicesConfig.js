//import portForwardMap from "../setupPortForwarding";

//const REACT_APP_PORT_FORWARD = process.env.REACT_APP_PORT_FORWARD;

export const BASE_SERVICE_ENV_URL =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? "http://localhost:8000/api"
    : window._SERVER_DATA && window._SERVER_DATA.BASE_SERVICE_ENV_URL;

export const PRODUCT_SERVICE_ENV_URL =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? "http://localhost:8000/api"
    : window._SERVER_DATA && window._SERVER_DATA.PRODUCT_SERVICE_ENV_URL;

/**
 * if port forwarding is enabled, then check to see if service is in config map
 * If it is, set the url request to be only the serviceContextPath
 * CRA will proxy the request as seen in setupProxy.js
 * @param {string} baseUrl - base of the serivce url
 * @param {sring} serviceContextPath - additional path for the service context e.g. /admin
 */
// function determineUrl(baseUrl, serviceContextPath) {
//   if (REACT_APP_PORT_FORWARD && portForwardMap[serviceContextPath]) {
//     return serviceContextPath;
//   } else {
//     return baseUrl + serviceContextPath;
//   }
// }

// Product
export const SERVICE_PRODUCT_BASE_PATH = "/policy";
export const SERVICE_PRODUCT_TEMPLATES_PATH = `${SERVICE_PRODUCT_BASE_PATH}/templates`;
export const SERVICE_PRODUCT_INSIGHTS_PATH = `${SERVICE_PRODUCT_BASE_PATH}/policies/insights`;
export const SERVICE_PRODUCT_POLICIES_PATH = `${SERVICE_PRODUCT_BASE_PATH}/policies`;
export const SERVICE_PRODUCT_VALIDATION_INFO_PATH = `${SERVICE_PRODUCT_BASE_PATH}/validate/info`;
export const SERVICE_PRODUCT_TEAM_PATH = `${SERVICE_PRODUCT_BASE_PATH}/teams`;
export const SERVICE_PRODUCT_VIOLATIONS_PATH = `${SERVICE_PRODUCT_BASE_PATH}/policies/violations`;

// Platform
export const SERVICE_PLATFORM_PROFILE_PATH = `${BASE_SERVICE_ENV_URL}/users/profile`;
export const SERVICE_PLATFORM_NAVIGATION_PATH = `${BASE_SERVICE_ENV_URL}/users/navigation`;

export const SERVICE_REQUEST_STATUSES = {
  FAILURE: "failure",
  SUCCESS: "success",
};
