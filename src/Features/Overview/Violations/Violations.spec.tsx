import React from "react";
import Violations from "./index";
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
        policyActivityCreatedDate: 1558453998666,
        violations: 3
    }
];
describe("Violations --- Snapshot", () => {
    it("Capturing Snapshot of Violations", async () => {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const { baseElement } = (global as any).rtlRender(<Violations violations={violations} hasPolicies={true}/>);
        expect(baseElement).toMatchSnapshot();
    });
});
