import { default as createPolicyReducer, types, initialState } from "./index";

describe(">>>REDUCER --- createPolicyReducer", () => {
  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = initialState;

    expect(createPolicyReducer(undefined, action)).toEqual(expected);
  });
  it("should handle RESET_CREATE_POLICY", () => {
    const action = { type: types.RESET_CREATE_POLICY };
    const expected = { ...initialState };

    expect(createPolicyReducer(initialState, action)).toEqual(expected);
  });
  it("should handle CREATE_POLICY_REQUEST", () => {
    const action = { type: types.CREATE_POLICY_REQUEST };
    const expected = { ...initialState, isCreating: true };

    expect(createPolicyReducer(initialState, action)).toEqual(expected);
  });
  it("should handle CREATE_POLICY_SUCCESS", () => {
    const action = { type: types.CREATE_POLICY_SUCCESS, data: [] };
    const expected = {
      ...initialState,
      isCreating: false,
      status: "success",
      data: []
    };
    const newState = createPolicyReducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it("should handle CREATE_POLICY_FAILURE", () => {
    const action = { type: types.CREATE_POLICY_FAILURE, error: "" };
    const expected = { ...initialState, isCreating: false, status: "failure", error: "" };

    expect(createPolicyReducer(initialState, action)).toEqual(expected);
  });
});
