import React from "react";
import { fireEvent, waitForElement } from "@testing-library/react";
import CreatePolicy from ".";
import mockAxios from "utils/mocks/axios";
import { SERVICE_PRODUCT_TEMPLATES_PATH } from "Config/servicesConfig";

const route = "/111/policy/create";
const initialState = {
  app: {
    activeTeam: {
      id: "111"
    }
  }
};

const definitions = [
  {
    id: "5cd49777f6ea74a9bb6ac629",
    key: "static_code_analysis",
    name: "Static Code Analysis",
    description: "The following policy metrics are validated from SonarQube data collected in your CI pipeline.",
    order: 0,
    config: [
      {
        key: "metric",
        label: "Metric",
        type: "select",
        defaultValue: "",
        required: false,
        description: "",
        options: [
          "issues-total",
          "issues-blocker",
          "issues-critical",
          "issues-major",
          "issues-minor",
          "issues-info",
          "issues-filesAnalyzed",
          "ncloc",
          "complexity",
          "violations"
        ]
      },
      {
        key: "operator",
        label: "Operator",
        type: "select",
        defaultValue: "",
        required: false,
        description: "",
        options: ["equal", "not equal", "less than", "less than or equal", "greater than", "greater than or equal"]
      },
      {
        key: "value",
        label: "Value",
        type: "text",
        defaultValue: "",
        required: false,
        description: "",
        options: null
      }
    ]
  }
];

beforeEach(() => {
  mockAxios.resetHistory();
});

describe("CreatePolicy --- Snapshot", () => {
  mockAxios.onGet(SERVICE_PRODUCT_TEMPLATES_PATH).reply(200, definitions);
  it("+++ renders correctly", async () => {
    const { baseElement, getByText } = renderWithRouter(<CreatePolicy />, { initialState, route });
    await waitForElement(() => getByText(/Create Policy/i));
    expect(baseElement).toMatchSnapshot();
  });
});

describe("CreatePolicy --- RTL", () => {
  test("renders error message when fetching definitions failed", async () => {
    mockAxios
      .onGet(SERVICE_PRODUCT_TEMPLATES_PATH)
      .reply(404, { response: { data: { status: "error", message: "something went wrong" } } });

    const { getByText } = renderWithRouter(<CreatePolicy />, { route });
    const errorMessage = await waitForElement(() => getByText("Don’t lose your daks"));
    expect(errorMessage).toBeInTheDocument();
  });

  test("it is able to create policy only after adding a name", async () => {
    mockAxios.onGet(SERVICE_PRODUCT_TEMPLATES_PATH).reply(200, definitions);

    const { getByPlaceholderText, getByTestId } = renderWithRouter(<CreatePolicy />, {
      initialState,
      route
    });

    const createButton = await waitForElement(() => getByTestId("policy-header-affirmative-action"));

    expect(createButton).toBeDisabled();

    const nameInput = getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: "test" } });

    expect(createButton).toBeEnabled();
  });

  test("create button is disabled while creating", async () => {
    mockAxios.onGet(SERVICE_PRODUCT_TEMPLATES_PATH).reply(200, definitions);

    const { getByPlaceholderText, getByTestId } = renderWithRouter(<CreatePolicy />, {
      initialState,
      route
    });

    const createButton = await waitForElement(() => getByTestId("policy-header-affirmative-action"));

    const nameInput = getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(createButton).toBeEnabled();

    fireEvent.click(createButton);
    expect(createButton).toBeDisabled();
  });
});
