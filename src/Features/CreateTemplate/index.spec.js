import React from "react";
import Inputs from "../CreateTemplate";
import { fireEvent } from "@testing-library/react";

const mockfn = jest.fn();

const initialState = {
  workflow: {
    data: {
      rules: [
        {
          defaultValue: "pandas",
          description: "Tim property",
          key: "tim.property",
          label: "Tim Property",
          required: true,
          type: "select",
          validValues: ["pandas", "dogs"]
        }
      ]
    }
  }
};

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
    const { baseElement } = rtlReduxRender(<Inputs {...props} />, { initialState });
    expect(baseElement).toMatchSnapshot();
  });
});

