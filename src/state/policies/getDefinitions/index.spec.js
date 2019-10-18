import { default as definitionsReducer, types, initialState } from "./index";

describe(">>>REDUCER --- definitionsReducer", () => {
  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = initialState;

    expect(definitionsReducer(undefined, action)).toEqual(expected);
  });
  it("should handle RESET_DEFINITIONS", () => {
    const action = { type: types.RESET_DEFINITIONS };
    const expected = { ...initialState };

    expect(definitionsReducer(initialState, action)).toEqual(expected);
  });
  it("should handle FETCH_DEFINITIONS_REQUEST", () => {
    const action = { type: types.FETCH_DEFINITIONS_REQUEST };
    const expected = { ...initialState, isFetching: true };

    expect(definitionsReducer(initialState, action)).toEqual(expected);
  });
  it("should handle FETCH_DEFINITIONS_SUCCESS", () => {
    const action = { type: types.FETCH_DEFINITIONS_SUCCESS, data: [] };
    const expected = {
      ...initialState,
      isFetching: false,
      status: "success",
      data: []
    };
    const newState = definitionsReducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it("should handle FETCH_DEFINITIONS_FAILURE", () => {
    const action = { type: types.FETCH_DEFINITIONS_FAILURE, error: "" };
    const expected = { ...initialState, isFetching: false, status: "failure", error: "" };

    expect(definitionsReducer(initialState, action)).toEqual(expected);
  });
});
