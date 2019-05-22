/* eslint-disable no-console*/
import createReducer from "@boomerang/boomerang-utilities/lib/createReducer";
import requestGenerator from "@boomerang/boomerang-utilities/lib/requestGenerator";

//action types
export const types = {
  RESET_DEFINITIONS: "RESET_DEFINITIONS",
  FETCH_DEFINITIONS_REQUEST: "FETCH_DEFINITIONS_REQUEST",
  FETCH_DEFINITIONS_SUCCESS: "FETCH_DEFINITIONS_SUCCESS",
  FETCH_DEFINITIONS_FAILURE: "FETCH_DEFINITIONS_FAILURE"
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
  [types.RESET_DEFINITIONS]: () => {
    return { ...initialState };
  },
  [types.FETCH_DEFINITIONS_REQUEST]: state => {
    return { ...state, isFetching: true };
  },
  [types.FETCH_DEFINITIONS_SUCCESS]: (state, action) => {
    return { ...state, isFetching: false, status: "success", data: action.data };
  },
  [types.FETCH_DEFINITIONS_FAILURE]: (state, action) => {
    return { ...state, isFetching: false, status: "failure", error: action.error };
  }
};

//reducer exported by default
export default createReducer(initialState, actionHandlers);

/*
 action creators declared to be passed into the definitions generator boilerplate
*/
const reset = () => ({ type: types.RESET_DEFINITIONS });
const fetchDefinitionsRequest = () => ({ type: types.FETCH_DEFINITIONS_REQUEST });
const fetchDefinitionsSuccess = data => ({ type: types.FETCH_DEFINITIONS_SUCCESS, data });
const fetchDefinitionsFailure = error => ({ type: types.FETCH_DEFINITIONS_FAILURE, error });

const fetchDefinitionsActionCreators = {
  reset,
  request: fetchDefinitionsRequest,
  success: fetchDefinitionsSuccess,
  failure: fetchDefinitionsFailure
};

// fetchDefinitions api call
const fetchDefinitionsApi = requestGenerator(fetchDefinitionsActionCreators);

const fetch = url => dispatch => dispatch(fetchDefinitionsApi.request({ method: "get", url }));

const cancelFetchDefinitions = () => dispatch => dispatch(fetchDefinitionsApi.cancelRequest());

//actions
export const actions = {
  reset,
  fetchDefinitionsRequest,
  fetchDefinitionsSuccess,
  fetchDefinitionsFailure,
  fetch,
  cancelFetchDefinitions
};
