/* eslint-disable no-console*/
/* eslint-disable no-unused-vars*/
import createReducer from "@boomerang/boomerang-utilities/lib/createReducer";
import requestFactory from "@boomerang/boomerang-utilities/lib/requestFactory";

//action types
export const types = {
  USER_RESET: "USER_RESET",
  FETCH_USER_REQUEST: "FETCH_USER_REQUEST",
  FETCH_USER_SUCCESS: "FETCH_USER_SUCCESS",
  FETCH_USER_FAILURE: "FETCH_USER_FAILURE"
};

//initial state
export const initialState = {
  isFetching: false,
  status: "",
  error: "",
  data: {}
};

//action handlers
const actionHandlers = {
  [types.USER_RESET]: () => {
    return { ...initialState };
  },
  [types.FETCH_USER_REQUEST]: state => {
    return { ...state, isFetching: true };
  },
  [types.FETCH_USER_SUCCESS]: (state, action) => {
    return { ...state, isFetching: false, status: "success", data: action.data };
  },
  [types.FETCH_USER_FAILURE]: (state, action) => {
    return { ...state, isFetching: false, status: "failure", error: action.error };
  }
};

export default createReducer(initialState, actionHandlers);

// Action creators declared to be passed into the GET request factory boilerplate
const resetUser = () => ({ type: types.USER_RESET });
const fetchUserRequest = () => ({ type: types.FETCH_USER_REQUEST });
const fetchUserSuccess = data => ({ type: types.FETCH_USER_SUCCESS, data });
const fetchUserFailure = error => ({ type: types.FETCH_USER_FAILURE, error });

const fetchUserActionCreators = {
  reset: resetUser,
  request: fetchUserRequest,
  success: fetchUserSuccess,
  failure: fetchUserFailure
};

const fetchUserApi = requestFactory(fetchUserActionCreators);
const fetchUser = url => dispatch => dispatch(fetchUserApi.request({ method: "get", url }));
const cancelFetchUser = () => dispatch => dispatch(fetchUserApi.cancelRequest());

export const actions = {
  resetUser,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  fetchUser,
  cancelFetchUser
};
