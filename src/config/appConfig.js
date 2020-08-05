// Look for the data injected into the HTML file from the Express app
// See server/app.js for implementation
export const APP_ROOT = window?._SERVER_DATA?.APP_ROOT ?? "/bosun";

export const PRODUCT_STANDALONE = process.env.PRODUCT_STANDALONE === "true" ?? false;

// TODO
export const ROUTES = {};

export const FeatureFlag = {
  Standalone: "standalone"
};
