import React from "react";
import Graph from "./index";

jest.mock("./LineChart", () => "LineChart");

const formatedData = {
  chartData:[{date:1558457676, test1:1, test2: 2}],
  lines:["test1", "test2"],
  higherValue: 2
};

describe("Graph --- Snapshot", () => {
  it("Capturing Snapshot of Graph", async () => {
    const { baseElement } = global.rtlRender(<Graph formatedData={formatedData} />);
    expect(baseElement).toMatchSnapshot();
  });
});
