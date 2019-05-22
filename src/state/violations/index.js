/* eslint-disable no-console*/
import createReducer from "@boomerang/boomerang-utilities/lib/createReducer";
import requestGenerator from "@boomerang/boomerang-utilities/lib/requestGenerator";

//action types
export const types = {
  RESET_VIOLATIONS: "RESET_VIOLATIONS",
  FETCH_VIOLATIONS_REQUEST: "FETCH_VIOLATIONS_REQUEST",
  FETCH_VIOLATIONS_SUCCESS: "FETCH_VIOLATIONS_SUCCESS",
  FETCH_VIOLATIONS_FAILURE: "FETCH_VIOLATIONS_FAILURE"
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
  [types.RESET_VIOLATIONS]: () => {
    return { ...initialState };
  },
  [types.FETCH_VIOLATIONS_REQUEST]: state => {
    return { ...state, isFetching: true };
  },
  [types.FETCH_VIOLATIONS_SUCCESS]: (state, action) => {
    return { ...state, isFetching: false, status: "success", data: action.data };
  },
  [types.FETCH_VIOLATIONS_FAILURE]: (state, action) => {
    return { ...state, isFetching: false, status: "failure", error: action.error };
  }
};

//reducer exported by default
export default createReducer(initialState, actionHandlers);

/*
 action creators declared to be passed into the violations generator boilerplate
*/
const reset = () => ({ type: types.RESET_VIOLATIONS });
const fetchViolationsRequest = () => ({ type: types.FETCH_VIOLATIONS_REQUEST });
const fetchViolationsSuccess = data => ({ type: types.FETCH_VIOLATIONS_SUCCESS, data });
const fetchViolationsFailure = error => ({ type: types.FETCH_VIOLATIONS_FAILURE, error });

const fetchViolationsActionCreators = {
  reset,
  request: fetchViolationsRequest,
  success: fetchViolationsSuccess,
  failure: fetchViolationsFailure
};

// fetchViolations api call
const fetchViolationsApi = requestGenerator(fetchViolationsActionCreators);

const fetch = url => dispatch => dispatch(fetchViolationsApi.request({ method: "get", url }));

const cancelFetchViolations = () => dispatch => dispatch(fetchViolationsApi.cancelRequest());

//actions
export const actions = {
  reset,
  fetchViolationsRequest,
  fetchViolationsSuccess,
  fetchViolationsFailure,
  fetch,
  cancelFetchViolations
};
