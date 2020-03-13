export const BASE_LAUNCH_ENV_URL =
  window._SERVER_DATA && window._SERVER_DATA.BASE_LAUNCH_ENV_URL
    ? window._SERVER_DATA.BASE_LAUNCH_ENV_URL
    : "http://localhost:3000";

export const CICD_PRODUCT_APP_ENV_URL =
  window._SERVER_DATA && window._SERVER_DATA.CICD_PRODUCT_APP_ENV_URL
    ? window._SERVER_DATA.CICD_PRODUCT_APP_ENV_URL
    : "http://localhost:3000";
