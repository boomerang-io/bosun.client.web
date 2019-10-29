export const BASE_SERVICE_ENV_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : window._SERVER_DATA && window._SERVER_DATA.BASE_SERVICE_ENV_URL;

export const PRODUCT_SERVICE_ENV_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : window._SERVER_DATA && window._SERVER_DATA.PRODUCT_SERVICE_ENV_URL;

// Product
export const SERVICE_PRODUCT_BASE_PATH = "/bosun";
export const SERVICE_PRODUCT_DEFINITIONS_PATH = `${SERVICE_PRODUCT_BASE_PATH}/definitions`;
export const SERVICE_PRODUCT_INSIGHTS_PATH = `${SERVICE_PRODUCT_BASE_PATH}/policies/insights`;
export const SERVICE_PRODUCT_POLICIES_PATH = `${SERVICE_PRODUCT_BASE_PATH}/policies`;
export const SERVICE_PRODUCT_TEAM_PATH = `${SERVICE_PRODUCT_BASE_PATH}/teams`;
export const SERVICE_PRODUCT_VIOLATIONS_PATH = `${SERVICE_PRODUCT_BASE_PATH}/policies/violations`;

export const SERVICE_REQUEST_STATUSES = {
  FAILURE: "failure",
  SUCCESS: "success"
};
