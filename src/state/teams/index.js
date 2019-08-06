/* eslint-disable no-console*/
import createReducer from "@boomerang/boomerang-utilities/lib/createReducer";
import requestFactory from "@boomerang/boomerang-utilities/lib/requestFactory";

//action types
export const types = {
  RESET_TEAMS: "RESET_TEAMS",
  FETCH_TEAMS_REQUEST: "FETCH_TEAMS_REQUEST",
  FETCH_TEAMS_SUCCESS: "FETCH_TEAMS_SUCCESS",
  FETCH_TEAMS_FAILURE: "FETCH_TEAMS_FAILURE"
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
  [types.RESET_TEAMS]: () => {
    return { ...initialState };
  },
  [types.FETCH_TEAMS_REQUEST]: state => {
    return { ...state, isFetching: true };
  },
  [types.FETCH_TEAMS_SUCCESS]: (state, action) => {
    return { ...state, isFetching: false, status: "success", data: action.data };
  },
  [types.FETCH_TEAMS_FAILURE]: (state, action) => {
    return { ...state, isFetching: false, status: "failure", error: action.error };
  }
};

//reducer exported by default
export default createReducer(initialState, actionHandlers);

/*
 action creators declared to be passed into the teams factory boilerplate
*/
const reset = () => ({ type: types.RESET_TEAMS });
const fetchTeamsRequest = () => ({ type: types.FETCH_TEAMS_REQUEST });
const fetchTeamsSuccess = data => ({ type: types.FETCH_TEAMS_SUCCESS, data });
const fetchTeamsFailure = error => ({ type: types.FETCH_TEAMS_FAILURE, error });

const fetchTeamsActionCreators = {
  reset,
  request: fetchTeamsRequest,
  success: fetchTeamsSuccess,
  failure: fetchTeamsFailure
};

// fetchTeams api call
const fetchTeamsApi = requestFactory(fetchTeamsActionCreators);

const fetch = url => dispatch => dispatch(fetchTeamsApi.request({ method: "get", url }));

const cancelFetchTeams = () => dispatch => dispatch(fetchTeamsApi.cancelRequest());

//actions
export const actions = {
  reset,
  fetchTeamsRequest,
  fetchTeamsSuccess,
  fetchTeamsFailure,
  fetch,
  cancelFetchTeams
};
