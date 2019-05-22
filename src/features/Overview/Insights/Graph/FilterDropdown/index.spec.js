import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import FilterDropdown from "./index";

const mockfn = jest.fn();

const label = "testLabel";
const options = [{text:"option1", value:"option1"}];
const onChange = mockfn;

describe("FilterDropdown --- Snapshot", () => {
  it("Capturing Snapshot of FilterDropdown", () => {
    const renderedValue = renderer
      .create(
        <FilterDropdown
          label={label}
          options={options}
          onChange={onChange}
        />
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe("FilterDropdown --- Shallow render", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <FilterDropdown
        label={label}
        options={options}
        onChange={onChange}
      />
    );
  });

  it("Render the DUMB component", () => {
    expect(wrapper.length).toEqual(1);
  });
});
