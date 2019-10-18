import { default as updatePolicyReducer, types, initialState } from "./index";

describe(">>>REDUCER --- updatePolicyReducer", () => {
  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = initialState;

    expect(updatePolicyReducer(undefined, action)).toEqual(expected);
  });
  it("should handle RESET_UPDATE_POLICY", () => {
    const action = { type: types.RESET_UPDATE_POLICY };
    const expected = { ...initialState };

    expect(updatePolicyReducer(initialState, action)).toEqual(expected);
  });
  it("should handle UPDATE_POLICY_REQUEST", () => {
    const action = { type: types.UPDATE_POLICY_REQUEST };
    const expected = { ...initialState, isUpdating: true };

    expect(updatePolicyReducer(initialState, action)).toEqual(expected);
  });
  it("should handle UPDATE_POLICY_SUCCESS", () => {
    const action = { type: types.UPDATE_POLICY_SUCCESS, data: [] };
    const expected = {
      ...initialState,
      isUpdating: false,
      status: "success",
      data: []
    };
    const newState = updatePolicyReducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it("should handle UPDATE_POLICY_FAILURE", () => {
    const action = { type: types.UPDATE_POLICY_FAILURE, error: "" };
    const expected = { ...initialState, isUpdating: false, status: "failure", error: "" };

    expect(updatePolicyReducer(initialState, action)).toEqual(expected);
  });
});
