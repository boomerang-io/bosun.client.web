import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import ViolationsTable from "./index";

const violations = [
  {
    "id":"1",
    "ciPolicyId": "5cd49adff6ea74a9bb6adef4",
    "ciPolicyName": "Tyson's Policy",
    "ciStageId": "5cb123bdf6ea74a9bb5425b6",
    "ciStageName": "dev",
    "ciComponentId": "5cdb4c15f6ea74a9bb9cfdba",
    "ciComponentName": "boomerang.service.ci",
    "ciComponentVersionId": "5cdb4ca3f6ea74a9bb9cf251",
    "ciComponentVersionName": "6.4.9-175",
    "ciPolicyActivityCreatedDate": 1558453998666,
    "violations": 3
  }
];

describe("ViolationsTable --- Snapshot", () => {
  it("Capturing Snapshot of ViolationsTable", () => {
    const renderedValue = renderer
      .create(
        <ViolationsTable
          violations={violations}
        />
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe("ViolationsTable --- Shallow render", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ViolationsTable
        violations={violations}
      />
    );
  });

  it("Render the DUMB component", () => {
    expect(wrapper.length).toEqual(1);
  });
});
