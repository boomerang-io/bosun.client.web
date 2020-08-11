import React from "react";
import Inputs from "../CreateEditTemplateForm";
import { fireEvent } from "@testing-library/react";

global.body = {createTextRange: jest.fn()}

const mockfn = jest.fn();

const initialState = {
  workflow: {
    data: {
      properties: [
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
  workflowActions: { deleteWorkflowInput: mockfn },
  navigateBack: mockfn,
  onSubmit: mockfn, 
  template: {
    rules: [
      {
        "key": "value",
        "label": "Testing",
        "type": "text",
        "defaultValue": "",
        "required": false,
        "description": "",
        "options": null
      }
    ]
  }, 
  type: "create", 
  validationData: {}
};

beforeEach(() => {
  document.body.setAttribute("id", "app");
});

describe("Inputs --- Snapshot Test", () => {
  it("Capturing Snapshot of Inputs", () => {
    const { baseElement } = rtlRender(<Inputs {...props} />);
    expect(baseElement).toMatchSnapshot();
  });
});

describe("Inputs --- RTL", () => {
  it("Render inputs correctly", () => {
    const { queryByText } = rtlRender(<Inputs {...props} />);
    expect(queryByText("Testing")).toBeInTheDocument();
  });

  it("Opens create new property modal", () => {
    const { queryByText, getByTestId } = rtlRender(<Inputs {...props} />);

    //expect(queryByText(/Create a new property/i)).not.toBeInTheDocument();

    //const modalTrigger = getByText(/Create a new property/i);
    const modalTrigger = getByTestId("create-new-workflow-input-button");
    fireEvent.click(modalTrigger);

    expect(queryByText(/Create a new rule/i)).toBeInTheDocument();
  });

  it("Opens edit property modal", () => {
    const { getByTestId, queryByText } = rtlRender(<Inputs {...props} />);

    //expect(queryByText(/Let's update it/i)).not.toBeInTheDocument();

    const modalTrigger = getByTestId("edit-property-trigger");
    fireEvent.click(modalTrigger);

    expect(queryByText(/Let's update it/i)).toBeInTheDocument();
  });
});
