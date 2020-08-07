import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Graph from "./index";

jest.mock("./LineChart", () => "LineChart");

const formatedData = {
  chartData:[{date:1558457676, test1:1, test2: 2}],
  lines:["test1", "test2"],
  higherValue: 2
};

describe("Graph --- Snapshot", () => {
  it("Capturing Snapshot of Graph", () => {
    const renderedValue = renderer
      .create(
        <Graph
          formatedData={formatedData}
        />
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe("Graph --- Shallow render", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Graph
        formatedData={formatedData}
      />
    );
  });

  it("Render the DUMB component", () => {
    expect(wrapper.length).toEqual(1);
  });
});
