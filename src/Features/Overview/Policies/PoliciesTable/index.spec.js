import React from "react";
import PoliciesTable from "./index";

const policies = [
  {
    createdDate: 1558051200000,
    name: "Timss",
    teamId: "5a8b331e262a70306622df73",
    definitions: [
      {
        policyTemplateId: "5cd49777f6ea74a9bb6ac629",
        rules: [
          {
            value: "sdfgsdfg",
            operator: "less than",
            metric: "complexity"
          }
        ]
      },
      {
        policyTemplateId: "5cd498f3f6ea74a9bb6ad0f3",
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
  it("Capturing Snapshot of PoliciesTable", async () => {
    const { baseElement } = global.rtlRouterRender(<PoliciesTable policies={policies} />);
    expect(baseElement).toMatchSnapshot();
  });
});
