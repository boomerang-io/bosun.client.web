const NODE_ENV = String(process.env.NODE_ENV);
const isDevOrTest = NODE_ENV === "development" || NODE_ENV === "test";

export const BASE_LAUNCH_ENV_URL = isDevOrTest ? "http://localhost:3000" : window?._SERVER_DATA?.BASE_LAUNCH_ENV_URL;

export const CICD_PRODUCT_APP_ENV_URL = isDevOrTest
  ? "http://localhost:3000"
  : window?._SERVER_DATA?.CICD_PRODUCT_APP_ENV_URL;
