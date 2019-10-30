#!/usr/bin/env node

/**
 * Import and execute app
 */
const app = require("./index");

require("yargs") // eslint-disable-line
  .command("serve", "start the webapp server", yargs => {
    const { cors, dotenvFilePath, disableInjectHTMLHeadData } = yargs.argv;
    // Import .env file
    if (dotenvFilePath) {
      require("dotenv").config({
        path: require("path").join(process.cwd(), dotenvFilePath)
      });
    }
    // Invoke server
    app({ cors, disableInjectHTMLHeadData });
  })
  .option("cors", {
    alias: "c",
    describe: "CORS configuration using cors package. Accepts JSON string.",
    type: "string"
  })

  .option("disableInjectHTMLHeadData", {
    alias: "d",
    describe: "Enable injection of data and scripts into the head of the HTML file.",
    default: false,
    type: "boolean"
  })
  .option("dotenvFilePath", {
    alias: "p",
    default: false,
    describe: "Path to local .env file to read in. Useful for local testing.",
    type: "string"
  })
  .coerce({
    cors: JSON.parse
  }).argv;
