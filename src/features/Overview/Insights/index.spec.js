import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Insights from "./index";

function createNodeMock() {
  const doc = document.implementation.createHTMLDocument();
  return { parentElement: doc.body };
}

const insights = [
  {
    policyId: "5cddc15ff6ea74a9bbb2291b",
    policyName: "Marcus's Policy",
    ciPolicyCreatedDate: 1557791295946,
    insights: [
      {
        ciPolicyActivityId: "5cddc13fbc6f9400013360a9",
        policyActivityCreatedDate: 1557964800000,
        violations: 1
      },
      {
        ciPolicyActivityId: "5cddc177bc6f9400013360aa",
        policyActivityCreatedDate: 1557964800000,
        violations: 1
      },
      {
        ciPolicyActivityId: "5cddc430bc6f9400013360b2",
        policyActivityCreatedDate: 1557964800000,
        violations: 1
      },
      {
        ciPolicyActivityId: "5cddc44fbc6f9400013360b4",
        policyActivityCreatedDate: 1557964800000,
        violations: 1
      },
      {
        ciPolicyActivityId: "5ce1d56d76a4e100013eaab4",
        policyActivityCreatedDate: 1558304109636,
        violations: 1
      }
    ]
  }
];
const violations = [
  {
    policyId: "5cd49adff6ea74a9bb6adef4",
    policyName: "Tyson's Policy",
    ciStageId: "5cb123bdf6ea74a9bb5425b6",
    ciStageName: "dev",
    ciComponentId: "5cdb4c15f6ea74a9bb9cfdba",
    ciComponentName: "boomerang.service.ci",
    ciComponentVersionId: "5cdb4ca3f6ea74a9bb9cf251",
    ciComponentVersionName: "6.4.9-175",
    violations: 3
  }
];
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

describe("Insights --- Snapshot", () => {
  it("Capturing Snapshot of Insights", () => {
    const renderedValue = renderer
      .create(<Insights insights={insights} policies={policies} violations={violations} />, { createNodeMock })
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe("Insights --- Shallow render", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Insights insights={insights} policies={policies} violations={violations} />);
  });

  it("Render the DUMB component", () => {
    expect(wrapper.length).toEqual(1);
  });
});
