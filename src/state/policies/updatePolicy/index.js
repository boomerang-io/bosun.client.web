/* eslint-disable no-console*/
import createReducer from "@boomerang/boomerang-utilities/lib/createReducer";
import requestFactory from "@boomerang/boomerang-utilities/lib/requestFactory";

//action types
export const types = {
  RESET_UPDATE_POLICY: "RESET_UPDATE_POLICY",
  UPDATE_POLICY_REQUEST: "UPDATE_POLICY_REQUEST",
  UPDATE_POLICY_SUCCESS: "UPDATE_POLICY_SUCCESS",
  UPDATE_POLICY_FAILURE: "UPDATE_POLICY_FAILURE"
};

//initial state
export const initialState = {
  isUpdating: false,
  status: "",
  error: "",
  data: []
};

//action handlers
const actionHandlers = {
  [types.RESET_UPDATE_POLICY]: () => {
    return { ...initialState };
  },
  [types.UPDATE_POLICY_REQUEST]: state => {
    return { ...state, isUpdating: true };
  },
  [types.UPDATE_POLICY_SUCCESS]: (state, action) => {
    return { ...state, isUpdating: false, status: "success", data: action.data };
  },
  [types.UPDATE_POLICY_FAILURE]: (state, action) => {
    return { ...state, isUpdating: false, status: "failure", error: action.error };
  }
};

//reducer exported by default
export default createReducer(initialState, actionHandlers);

/*
 action creators declared to be passed into the policy factory boilerplate
*/
const reset = () => ({ type: types.RESET_UPDATE_POLICY });
const patchPolicyRequest = () => ({ type: types.UPDATE_POLICY_REQUEST });
const patchPolicySuccess = data => ({ type: types.UPDATE_POLICY_SUCCESS, data });
const patchPolicyFailure = error => ({ type: types.UPDATE_POLICY_FAILURE, error });

const patchPolicyActionCreators = {
  reset,
  request: patchPolicyRequest,
  success: patchPolicySuccess,
  failure: patchPolicyFailure
};

// patchPolicy api call
const patchPolicyApi = requestFactory(patchPolicyActionCreators);

const patch = url => dispatch => dispatch(patchPolicyApi.request({ method: "patch", url }));

const cancelPostTeams = () => dispatch => dispatch(patchPolicyApi.cancelRequest());

//actions
export const actions = {
  reset,
  patchPolicyRequest,
  patchPolicySuccess,
  patchPolicyFailure,
  patch,
  cancelPostTeams
};
