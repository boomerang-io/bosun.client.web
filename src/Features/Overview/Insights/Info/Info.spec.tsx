import React from "react";
import Info from ".";

const info = {
  type: "test",
  title: "Test title",
  content: "Test content text",
  count: "---"
};

describe("Info --- Snapshot", () => {
  it("Capturing Snapshot of Info", async () => {
    const { baseElement } = global.rtlRender(<Info info={info} />);
    expect(baseElement).toMatchSnapshot();
  });
});
