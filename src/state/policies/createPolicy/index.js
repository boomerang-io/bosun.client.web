/* eslint-disable no-console*/
import createReducer from "@boomerang/boomerang-utilities/lib/createReducer";
import requestGenerator from "@boomerang/boomerang-utilities/lib/requestGenerator";

//action types
export const types = {
  RESET_TEAMS: "RESET_TEAMS",
  CREATE_POLICY_REQUEST: "CREATE_POLICY_REQUEST",
  CREATE_POLICY_SUCCESS: "CREATE_POLICY_SUCCESS",
  CREATE_POLICY_FAILURE: "CREATE_POLICY_FAILURE"
};

//initial state
export const initialState = {
  isCreating: false,
  status: "",
  error: "",
  data: []
};

//action handlers
const actionHandlers = {
  [types.RESET_TEAMS]: () => {
    return { ...initialState };
  },
  [types.CREATE_POLICY_REQUEST]: state => {
    return { ...state, isCreating: true };
  },
  [types.CREATE_POLICY_SUCCESS]: (state, action) => {
    return { ...state, isCreating: false, status: "success", data: action.data };
  },
  [types.CREATE_POLICY_FAILURE]: (state, action) => {
    return { ...state, isCreating: false, status: "failure", error: action.error };
  }
};

//reducer exported by default
export default createReducer(initialState, actionHandlers);

/*
 action creators declared to be passed into the teams generator boilerplate
*/
const reset = () => ({ type: types.RESET_TEAMS });
const postPolicyRequest = () => ({ type: types.CREATE_POLICY_REQUEST });
const postPolicySuccess = data => ({ type: types.CREATE_POLICY_SUCCESS, data });
const postPolicyFailure = error => ({ type: types.CREATE_POLICY_FAILURE, error });

const postPolicyActionCreators = {
  reset,
  request: postPolicyRequest,
  success: postPolicySuccess,
  failure: postPolicyFailure
};

// postPolicy api call
const postPolicyApi = requestGenerator(postPolicyActionCreators);

const post = url => dispatch => dispatch(postPolicyApi.request({ method: "post", url }));

const cancelPostTeams = () => dispatch => dispatch(postPolicyApi.cancelRequest());

//actions
export const actions = {
  reset,
  postPolicyRequest,
  postPolicySuccess,
  postPolicyFailure,
  post,
  cancelPostTeams
};