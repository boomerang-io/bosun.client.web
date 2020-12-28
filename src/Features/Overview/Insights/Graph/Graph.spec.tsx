import React from "react";
import Graph from "./index";
const formatedData = {
    chartData: [{ date: 1558457676, test1: 1, test2: 2 }],
    lines: ["test1", "test2"],
    higherValue: 2,
};
describe("Graph --- Snapshot", () => {
    it("Capturing Snapshot of Graph", async () => {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const { baseElement } = (global as any).rtlRender(<Graph formatedData={formatedData}/>);
        expect(baseElement).toMatchSnapshot();
    });
});
