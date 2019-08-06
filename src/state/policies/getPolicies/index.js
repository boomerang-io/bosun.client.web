/* eslint-disable no-console*/
import createReducer from "@boomerang/boomerang-utilities/lib/createReducer";
import requestFactory from "@boomerang/boomerang-utilities/lib/requestFactory";

//action types
export const types = {
  RESET_POLICIES: "RESET_POLICIES",
  FETCH_POLICIES_REQUEST: "FETCH_POLICIES_REQUEST",
  FETCH_POLICIES_SUCCESS: "FETCH_POLICIES_SUCCESS",
  FETCH_POLICIES_FAILURE: "FETCH_POLICIES_FAILURE"
};

//initial state
export const initialState = {
  isFetching: false,
  status: "",
  error: "",
  data: []
};

//action handlers
const actionHandlers = {
  [types.RESET_POLICIES]: () => {
    return { ...initialState };
  },
  [types.FETCH_POLICIES_REQUEST]: state => {
    return { ...state, isFetching: true };
  },
  [types.FETCH_POLICIES_SUCCESS]: (state, action) => {
    return { ...state, isFetching: false, status: "success", data: action.data };
  },
  [types.FETCH_POLICIES_FAILURE]: (state, action) => {
    return { ...state, isFetching: false, status: "failure", error: action.error };
  }
};

//reducer exported by default
export default createReducer(initialState, actionHandlers);

/*
 action creators declared to be passed into the request factory boilerplate
*/
const reset = () => ({ type: types.RESET_POLICIES });
const fetchPoliciesRequest = () => ({ type: types.FETCH_POLICIES_REQUEST });
const fetchPoliciesSuccess = data => ({ type: types.FETCH_POLICIES_SUCCESS, data });
const fetchPoliciesFailure = error => ({ type: types.FETCH_POLICIES_FAILURE, error });

const fetchPoliciesActionCreators = {
  reset,
  request: fetchPoliciesRequest,
  success: fetchPoliciesSuccess,
  failure: fetchPoliciesFailure
};

// fetchPolicies api call
const fetchPoliciesApi = requestFactory(fetchPoliciesActionCreators);

const fetch = url => dispatch => dispatch(fetchPoliciesApi.request({ method: "get", url }));

const cancelFetchPolicies = () => dispatch => dispatch(fetchPoliciesApi.cancelRequest());

//actions
export const actions = {
  reset,
  fetchPoliciesRequest,
  fetchPoliciesSuccess,
  fetchPoliciesFailure,
  fetch,
  cancelFetchPolicies
};
