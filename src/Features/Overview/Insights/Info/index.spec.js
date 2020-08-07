import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { Info } from "./index";

const info = {
  type: "test",
  title: "Test title",
  content: "Test content text",
  count: "---"
};

describe("Info --- Snapshot", () => {
  it("Capturing Snapshot of Info", () => {
    const renderedValue = renderer
      .create(
        <Info
          info={info}
        />
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe("Info --- Shallow render", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Info
        info={info}
      />
    );
  });

  it("Render the DUMB component", () => {
    expect(wrapper.length).toEqual(1);
  });
});
