import { default as insightsReducer, types, initialState } from "./index";

describe(">>>REDUCER --- insightsReducer", () => {
  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = initialState;

    expect(insightsReducer(undefined, action)).toEqual(expected);
  });
  it("should handle RESET_INSIGHTS", () => {
    const action = { type: types.RESET_INSIGHTS };
    const expected = { ...initialState };

    expect(insightsReducer(initialState, action)).toEqual(expected);
  });
  it("should handle FETCH_INSIGHTS_REQUEST", () => {
    const action = { type: types.FETCH_INSIGHTS_REQUEST };
    const expected = { ...initialState, isFetching: true };

    expect(insightsReducer(initialState, action)).toEqual(expected);
  });
  it("should handle FETCH_INSIGHTS_SUCCESS", () => {
    const action = { type: types.FETCH_INSIGHTS_SUCCESS, data: [] };
    const expected = {
      ...initialState,
      isFetching: false,
      status: "success",
      data: []
    };
    const newState = insightsReducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it("should handle FETCH_INSIGHTS_FAILURE", () => {
    const action = { type: types.FETCH_INSIGHTS_FAILURE, error: "" };
    const expected = { ...initialState, isFetching: false, status: "failure", error: "" };

    expect(insightsReducer(initialState, action)).toEqual(expected);
  });
});
