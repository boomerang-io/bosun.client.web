import React from "react";
import Policies from "./index";
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
describe("Policies --- Snapshot", () => {
    it("Capturing Snapshot of Policies", async () => {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const { baseElement } = (global as any).rtlRouterRender(<Policies policies={policies}/>);
        expect(baseElement).toMatchSnapshot();
    });
});
