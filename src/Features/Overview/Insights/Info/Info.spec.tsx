import React from "react";
import Info from ".";
const info = {
    type: "test",
    title: "Test title",
    content: "Test content text",
    count: "---"
};
describe("Info --- Snapshot", () => {
    it("Capturing Snapshot of Info", async () => {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const { baseElement } = (global as any).rtlRender(<Info info={info}/>);
        expect(baseElement).toMatchSnapshot();
    });
});
