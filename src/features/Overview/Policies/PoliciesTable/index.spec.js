import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router";
import PoliciesTable from "./index";

const policies = [
  {
    createdDate: 1558051200000,
    name: "Timss",
    teamId: "5a8b331e262a70306622df73",
    definitions: [
      {
        policyDefinitionId: "5cd49777f6ea74a9bb6ac629",
        rules: [
          {
            value: "sdfgsdfg",
            operator: "less than",
            metric: "complexity"
          }
        ]
      },
      {
        policyDefinitionId: "5cd498f3f6ea74a9bb6ad0f3",
        rules: [
          {
            version: " asdfasdf",
            artifact: "asdasdf`",
            type: "maven"
          }
        ]
      }
    ],
    stages: ["dev"],
    id: "R4nuqJE"
  }
];

describe("PoliciesTable --- Snapshot", () => {
  it("Capturing Snapshot of PoliciesTable", () => {
    const renderedValue = renderer
      .create(
        <MemoryRouter>
          <PoliciesTable policies={policies} />
        </MemoryRouter>
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe("PoliciesTable --- Shallow render", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter>
        <PoliciesTable policies={policies} />
      </MemoryRouter>
    );
  });

  it("Render the DUMB component", () => {
    expect(wrapper.length).toEqual(1);
  });
});
