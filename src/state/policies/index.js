import { combineReducers } from "redux";
import createPolicy from "./createPolicy";
import getDefinitions from "./getDefinitions";
import getPolicies from "./getPolicies";
import updatePolicy from "./updatePolicy";

const policies = combineReducers({
  createPolicy,
  getDefinitions,
  getPolicies,
  updatePolicy
});

export default policies;
