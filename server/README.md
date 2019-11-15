# Boomerang Webapp Server

Provide a consistent way to deploy Boomerang React SPAs with client-side routing into an IBM Cloud Private environment.

## Features

- Serve static assets
- Client-side routing
- Dynamic data and script injection into HTML document at run-time
- Logging with [@boomerang/boomerang-logging-middleware](https://github.ibm.com/Boomerang-Lib/boomerang.middleware.logging)
- Cloud native health checking with [Cloud Native Health Connect](@cloudnative/health-connect)
- New Relic monitoring

## Design

The webapp server can be invoked via a command line or imported as a configurable function to be executed.

- CLI
- Function

## CLI

The server can be invoked easily via a CLI command. Configuration can be entered as options.

Enter the following to see the manual

```shell
boomerang-webapp-server --help
```

Command

```shell
boomerang-webapp-server serve
```

Options

| **Option**                  | **Alias** | **Description**                                                                                  |
| :-------------------------- | :-------: | :----------------------------------------------------------------------------------------------- |
| --cors                      |    -c     | CORS configuration using [cors](https://www.npmjs.com/package/cors) package. Accepts JSON string |
| --disableInjectHTMLHeadData |    -d     | Toggle whether the app needs to inject data into the header. Defaults to `false`                 |
| --dotenvFilePath            |    -p     | Path to local .env file to read in. Useful for local testing                                     |

## Use as a function

```javascript
const server = require("@boomerang/boomerang-webapp-server");
server({
  cors: {},
  disableInjectHTMLHeadData: true
});
```

## Environment Variables

The following env variables are assumed to exist either from a local `.env` file or passed in to the container at runtime. If nothing is passed it, it will default to

|         **Variable**         |                                **Purpose**                                |       **Type**       |
| :--------------------------: | :-----------------------------------------------------------------------: | :------------------: |
|           APP_ROOT           |                      Root context of the application                      |        string        |
|          BUILD_DIR           |      directory relative to the exeuction where app files are located      |        string        |
| HTML_HEAD_INJECTED_DATA_KEYS |          Environment variables to inject into the HTML document           | comma delimited list |
|  HTML_HEAD_INJECTED_SCRIPTS  | Scripts to inject into HTML document. Files need to be in the `BUILD_DIR` | comma delimited list |
|      NEW_RELIC_APP_NAME      |                          App name for monitoring                          |        string        |
|    NEW_RELIC_LICENSE_KEY     |                        License key for monitoring                         |        string        |
|             PORT             |                         Port for server to run on                         |        number        |

## Defaults

Some of the values, both config and environment variables have defaults in the server that make deploying to the IBM Cloud Private work out-of-the-box.

APP_ROOT

- "/"

BUILD_DIR

- "build"

CORS

```json
{
  "origin": "*",
  "allowedHeaders": "Content-Type, Authorization, Content-Length, X-Requested-With",
  "methods": "DELETE,GET,OPTIONS,PATCH,POST,PUT"
}
```

HTML_HEAD_INJECTED_DATA_KEYS

- APP_ROOT
- BASE_APPS_ENV_URL
- BASE_LAUNCH_ENV_URL
- BASE_SERVICE_ENV_URL
- BASE_WWW_ENV_URL
- CORE_APPS_ENV_URL
- CORE_ENV_URL
- CORE_SERVICE_ENV_URL
- PRODUCT_APPS_ENV_URL
- PRODUCT_ENV_URL
- PRODUCT_SERVICE_ENV_URL

PORT

- 3000
