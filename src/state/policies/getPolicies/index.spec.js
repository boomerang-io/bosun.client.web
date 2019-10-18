import { default as policiesReducer, types, initialState } from "./index";

describe(">>>REDUCER --- policiesReducer", () => {
  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = initialState;

    expect(policiesReducer(undefined, action)).toEqual(expected);
  });
  it("should handle RESET_POLICIES", () => {
    const action = { type: types.RESET_POLICIES };
    const expected = { ...initialState };

    expect(policiesReducer(initialState, action)).toEqual(expected);
  });
  it("should handle FETCH_POLICIES_REQUEST", () => {
    const action = { type: types.FETCH_POLICIES_REQUEST };
    const expected = { ...initialState, isFetching: true };

    expect(policiesReducer(initialState, action)).toEqual(expected);
  });
  it("should handle FETCH_POLICIES_SUCCESS", () => {
    const action = { type: types.FETCH_POLICIES_SUCCESS, data: [] };
    const expected = {
      ...initialState,
      isFetching: false,
      status: "success",
      data: []
    };
    const newState = policiesReducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it("should handle FETCH_POLICIES_FAILURE", () => {
    const action = { type: types.FETCH_POLICIES_FAILURE, error: "" };
    const expected = { ...initialState, isFetching: false, status: "failure", error: "" };

    expect(policiesReducer(initialState, action)).toEqual(expected);
  });
});
