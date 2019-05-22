import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router";
import Policies from "./index";

const policies = [
  {
    "createdDate": 1558051200000,
    "name": "Timss",
    "teamId": "5a8b331e262a70306622df73",
    "definitions": [
      {
        "ciPolicyDefinitionId": "5cd49777f6ea74a9bb6ac629",
        "rules": [
          {
            "value": "sdfgsdfg",
            "operator": "less than",
            "metric": "complexity"
          }
        ]
      },
      {
        "ciPolicyDefinitionId": "5cd498f3f6ea74a9bb6ad0f3",
        "rules": [
          {
            "version": " asdfasdf",
            "artifact": "asdasdf`",
            "type": "maven"
          }
        ]
      }
    ],
    "stages":[
      "dev"
   ],
    "id": "R4nuqJE"
  }
];

describe("Policies --- Snapshot", () => {
  it("Capturing Snapshot of Policies", () => {
    const renderedValue = renderer
      .create(
        <MemoryRouter>
          <Policies
            policies={policies}
          />
        </MemoryRouter>
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe("Policies --- Shallow render", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter>
        <Policies
          policies={policies}
        />
      </MemoryRouter>
    );
  });

  it("Render the DUMB component", () => {
    expect(wrapper.length).toEqual(1);
  });
});
