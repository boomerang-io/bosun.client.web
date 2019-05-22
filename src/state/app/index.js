/* eslint-disable no-console*/
import createReducer from "@boomerang/boomerang-utilities/lib/createReducer";

// Action types
export const types = {
  SET_ACTIVE_TEAM: "SET_ACTIVE_TEAM"
};
Object.freeze(types);

//initial state
export const initialState = {
  activeTeam: null
};

const actionHandlers = {
  [types.SET_ACTIVE_TEAM]: (state, action) => {
    return { ...state, activeTeam: action.data };
  }
};

export default createReducer(initialState, actionHandlers);

/*
 action creators declared to be passed into the GET request generator boilerplate
*/
export const setActiveTeam = data => ({ type: types.SET_ACTIVE_TEAM, data });

export const actions = {
  setActiveTeam
};
