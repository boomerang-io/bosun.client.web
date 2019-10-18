import { default as appReducer, types, initialState } from "./index";

describe(">>>REDUCER --- appReducer", () => {
  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = initialState;

    expect(appReducer(undefined, action)).toEqual(expected);
  });

  it("should handle SET_ACTIVE_TEAM", () => {
    const testTeam = { name:"test name", id:"testid" };
    const action = { type: types.SET_ACTIVE_TEAM, data:testTeam };
    const expected = {
      ...initialState,
      activeTeam: testTeam
    };
    const newState = appReducer(initialState, action);

    expect(newState).toEqual(expected);
  });
});