import React from "react";
import CustomTooltip from "./index";
const payload = [
    {
        color: "#047cc0",
        dataKey: "total",
        fill: "url(#blueGradient)",
        fillOpacity: 0.6,
        formatter: undefined,
        name: "total",
        payload: { date: 1542160248412, failed: 5, success: 12, total: 17 },
        stroke: "#047cc0",
        unit: undefined,
        value: 17
    }
];
describe("CustomTooltip --- Snapshot", () => {
    it("Capturing Snapshot of CustomTooltip", async () => {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const { baseElement } = (global as any).rtlRouterRender(<CustomTooltip payload={payload}/>);
        expect(baseElement).toMatchSnapshot();
    });
});
