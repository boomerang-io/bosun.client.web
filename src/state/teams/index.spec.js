import { default as teamsReducer, types, initialState } from "./index";

describe(">>>REDUCER --- teamsReducer", () => {
  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = initialState;

    expect(teamsReducer(undefined, action)).toEqual(expected);
  });
  it("should handle RESET_TEAMS", () => {
    const action = { type: types.RESET_TEAMS };
    const expected = { ...initialState };

    expect(teamsReducer(initialState, action)).toEqual(expected);
  });
  it("should handle FETCH_TEAMS_REQUEST", () => {
    const action = { type: types.FETCH_TEAMS_REQUEST };
    const expected = { ...initialState, isFetching: true };

    expect(teamsReducer(initialState, action)).toEqual(expected);
  });
  it("should handle FETCH_TEAMS_SUCCESS", () => {
    const action = { type: types.FETCH_TEAMS_SUCCESS, data: [] };
    const expected = {
      ...initialState,
      isFetching: false,
      status: "success",
      data: []
    };
    const newState = teamsReducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it("should handle FETCH_TEAMS_FAILURE", () => {
    const action = { type: types.FETCH_TEAMS_FAILURE, error: "" };
    const expected = { ...initialState, isFetching: false, status: "failure", error: "" };

    expect(teamsReducer(initialState, action)).toEqual(expected);
  });
});
