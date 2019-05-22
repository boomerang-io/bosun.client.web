import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router";
import { Overview } from "./index";

jest.mock("./Header", () => "Header");

const insightsActions = { fetch: jest.fn() };
const getPoliciesActions = { fetch: jest.fn() };
const violationsActions = { fetch: jest.fn() };
const reducerState = {
  isFetching: false,
  status: "success",
  error: "",
  data: []
};

describe("Overview --- Snapshot", () => {
  it("Capturing Snapshot of Overview", () => {
    const renderedValue = renderer
      .create(
        <MemoryRouter>
          <Overview
            activeTeam={{}}
            insightsActions={insightsActions}
            getPoliciesActions={getPoliciesActions}
            violationsActions={violationsActions}
            insights={reducerState}
            policies={reducerState}
            violations={reducerState}
          />
        </MemoryRouter>
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe("Overview --- Shallow render", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter>
        <Overview
          activeTeam={{}}
          insightsActions={insightsActions}
          getPoliciesActions={getPoliciesActions}
          violationsActions={violationsActions}
          insights={reducerState}
          policies={reducerState}
          violations={reducerState}
        />
      </MemoryRouter>
    );
  });

  it("Render the DUMB component", () => {
    expect(wrapper.length).toEqual(1);
  });
});
