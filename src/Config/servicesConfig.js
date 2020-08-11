import axios, { CancelToken } from "axios";
import HTTPMethods from "Constants/httpMethods";
import portForwardMap from "../setupPortForwarding";

//const REACT_APP_PORT_FORWARD = process.env.REACT_APP_PORT_FORWARD;

export const BASE_SERVICE_ENV_URL =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? "http://localhost:8000/api"
    : window._SERVER_DATA && window._SERVER_DATA.BASE_SERVICE_ENV_URL;

export const PRODUCT_SERVICE_ENV_URL =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? "http://localhost:8000/api"
    : window._SERVER_DATA && window._SERVER_DATA.PRODUCT_SERVICE_ENV_URL;

// Standard
const REACT_APP_PORT_FORWARD = process.env.REACT_APP_PORT_FORWARD;

/**
 * if port forwarding is enabled, then check to see if service is in config map
 * If it is, set the url request to be only the serviceContextPath
 * CRA will proxy the request as seen in setupProxy.js
 * @param {string} baseUrl - base of the serivce url
 * @param {sring} serviceContextPath - additional path for the service context e.g. /admin
 */
function determineUrl(baseUrl, serviceContextPath) {
  if (REACT_APP_PORT_FORWARD && portForwardMap[serviceContextPath]) {
    return serviceContextPath;
  } else {
    return baseUrl + serviceContextPath;
  }
}

export const BASE_SERVICE_USERS_URL = determineUrl(BASE_SERVICE_ENV_URL, "/users");

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

export const serviceUrl = {
  deletePolicy: ({policyId}) => `${SERVICE_PRODUCT_BASE_PATH}/policies/${policyId}`,
  getInsights: ({teamId}) => `${SERVICE_PRODUCT_BASE_PATH}/policies/insights?teamId=${teamId}`,
  getNavigation: () => `${BASE_SERVICE_USERS_URL}/navigation`,
  getPolicies: () => `${SERVICE_PRODUCT_BASE_PATH}/templates`,
  getPolicy: ({policyId}) => `${SERVICE_PRODUCT_BASE_PATH}/policies/${policyId}`,
  getTeams: () => `${SERVICE_PRODUCT_BASE_PATH}/teams`,
  getTeamPolicies: ({teamId}) => `${SERVICE_PRODUCT_BASE_PATH}/policies?teamId=${teamId}`,
  getTemplates: () => `${SERVICE_PRODUCT_BASE_PATH}/templates`,
  getUserProfile: () => `${BASE_SERVICE_USERS_URL}/profile`,
  getValidateInfo: ({policyId}) => `${SERVICE_PRODUCT_BASE_PATH}/validate/info/${policyId}`,
  getViolations: ({teamId}) => `${SERVICE_PRODUCT_BASE_PATH}/policies/violations?teamId=${teamId}`,
  patchUpdatePolicy: ({policyId}) => `${SERVICE_PRODUCT_BASE_PATH}/policies/${policyId}`,
  patchUpdatePolicyTemplate: ({templateId}) =>`${SERVICE_PRODUCT_BASE_PATH}/templates/${templateId}`,
  postCreatePolicy: () => `${SERVICE_PRODUCT_BASE_PATH}/policies`,
  postCreatePolicyTemplate: () => `${SERVICE_PRODUCT_BASE_PATH}/templates`,
  postCreateTeam: () => `${SERVICE_PRODUCT_BASE_PATH}/teams`,
};

export const cancellableResolver = ({ url, method, body, ...config }) => {
  // Create a new CancelToken source for this request
  const source = CancelToken.source();
  const promise = axios({ url, method, body, cancelToken: source.token, ...config });
  return { promise, cancel: () => source.cancel("cancel") };
};

export const resolver = {
  query: (url) => () => axios.get(url).then((response) => response.data),
  postMutation: (request) => axios.post(request),
  patchMutation: (request) => axios.patch(request),
  putMutation: (request) => axios.put(request),
  deletePolicy: ({policyId}) => axios.delete(serviceUrl.deletePolicy({policyId})),
  patchUpdatePolicy: ({policyId, body}) => axios.patch(serviceUrl.patchUpdatePolicy({policyId}), body),
  patchUpdatePolicyTemplate: ({templateId, body}) => axios.patch(serviceUrl.patchUpdatePolicyTemplate({templateId}), body),
  postCreatePolicy: ({ body }) => axios.post(serviceUrl.postCreatePolicy(), body),
  postCreatePolicyTemplate: ({ body }) => axios.post(serviceUrl.postCreatePolicyTemplate(), body),
  postCreateTeam: ({ body }) =>
    cancellableResolver({ url: serviceUrl.postCreateTeam(), data: body, method: HTTPMethods.Post }),
};