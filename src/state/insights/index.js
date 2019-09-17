/* eslint-disable no-console*/
import createReducer from "@boomerang/boomerang-utilities/lib/createReducer";
import requestFactory from "@boomerang/boomerang-utilities/lib/requestFactory";

//action types
export const types = {
  RESET_INSIGHTS: "RESET_INSIGHTS",
  FETCH_INSIGHTS_REQUEST: "FETCH_INSIGHTS_REQUEST",
  FETCH_INSIGHTS_SUCCESS: "FETCH_INSIGHTS_SUCCESS",
  FETCH_INSIGHTS_FAILURE: "FETCH_INSIGHTS_FAILURE"
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
  [types.RESET_INSIGHTS]: () => {
    return { ...initialState };
  },
  [types.FETCH_INSIGHTS_REQUEST]: state => {
    return { ...state, isFetching: true };
  },
  [types.FETCH_INSIGHTS_SUCCESS]: (state, action) => {
    return { ...state, isFetching: false, status: "success", data: action.data };
  },
  [types.FETCH_INSIGHTS_FAILURE]: (state, action) => {
    return { ...state, isFetching: false, status: "failure", error: action.error };
  }
};

//reducer exported by default
export default createReducer(initialState, actionHandlers);

/*
 action creators declared to be passed into the violations factory boilerplate
*/
const reset = () => ({ type: types.RESET_INSIGHTS });
const fetchInsightsRequest = () => ({ type: types.FETCH_INSIGHTS_REQUEST });
const fetchInsightsSuccess = data => ({ type: types.FETCH_INSIGHTS_SUCCESS, data });
const fetchInsightsFailure = error => ({ type: types.FETCH_INSIGHTS_FAILURE, error });

const fetchInsightsActionCreators = {
  reset,
  request: fetchInsightsRequest,
  success: fetchInsightsSuccess,
  failure: fetchInsightsFailure
};

// fetchInsights api call
const fetchInsightsApi = requestFactory(fetchInsightsActionCreators);

const fetch = url => dispatch => dispatch(fetchInsightsApi.request({ method: "get", url }));

const cancelFetchInsights = () => dispatch => dispatch(fetchInsightsApi.cancelRequest());

//actions
export const actions = {
  reset,
  fetchInsightsRequest,
  fetchInsightsSuccess,
  fetchInsightsFailure,
  fetch,
  cancelFetchInsights
};
