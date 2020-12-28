import React from "react";
import FilterDropdown from ".";
const mockfn = jest.fn();
const label = "testLabel";
const options = [{ text: "option1", value: "option1" }];
const onChange = mockfn;
describe("FilterDropdown --- Snapshot", () => {
    it("Capturing Snapshot of FilterDropdown", async () => {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const { baseElement } = (global as any).rtlRender(<FilterDropdown label={label} options={options} onChange={onChange}/>);
        expect(baseElement).toMatchSnapshot();
    });
});
