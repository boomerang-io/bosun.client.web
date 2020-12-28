import React from "react";
import Inputs from "../CreateTemplate";

const mockfn = jest.fn();

const props = {
  loading: false,
  updateInputs: mockfn,
  workflowActions: { deleteWorkflowInput: mockfn }
};

beforeEach(() => {
  document.body.setAttribute("id", "app");
});

describe("Inputs --- Snapshot Test", () => {
  it("Capturing Snapshot of Inputs", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'rtlRender'.
    const { baseElement } = rtlRender(<Inputs {...props} />);
    expect(baseElement).toMatchSnapshot();
  });
});

