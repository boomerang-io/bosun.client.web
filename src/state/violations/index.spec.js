import { default as violationsReducer, types, initialState } from "./index";

describe(">>>REDUCER --- violationsReducer", () => {
  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = initialState;

    expect(violationsReducer(undefined, action)).toEqual(expected);
  });
  it("should handle RESET_VIOLATIONS", () => {
    const action = { type: types.RESET_VIOLATIONS };
    const expected = { ...initialState };

    expect(violationsReducer(initialState, action)).toEqual(expected);
  });
  it("should handle FETCH_VIOLATIONS_REQUEST", () => {
    const action = { type: types.FETCH_VIOLATIONS_REQUEST };
    const expected = { ...initialState, isFetching: true };

    expect(violationsReducer(initialState, action)).toEqual(expected);
  });
  it("should handle FETCH_VIOLATIONS_SUCCESS", () => {
    const action = { type: types.FETCH_VIOLATIONS_SUCCESS, data: [] };
    const expected = {
      ...initialState,
      isFetching: false,
      status: "success",
      data: []
    };
    const newState = violationsReducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it("should handle FETCH_VIOLATIONS_FAILURE", () => {
    const action = { type: types.FETCH_VIOLATIONS_FAILURE, error: "" };
    const expected = { ...initialState, isFetching: false, status: "failure", error: "" };

    expect(violationsReducer(initialState, action)).toEqual(expected);
  });
});
