import React from "react";
import axios from "axios";
import { fireEvent, waitForElement } from "react-testing-library";
import CreatePolicy from ".";
import MockAdapter from "axios-mock-adapter";
import { SERVICE_PRODUCT_DEFINITIONS_PATH, SERVICE_PRODUCT_POLICIES_PATH } from "Config/servicesConfig";

const route = "/111/policy/create";
const props = {
  appState: {
    activeTeam: {
      id: "111"
    }
  }
}

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
]

describe("CreatePolicy --- Snapshot", () => {
  const mockAxios = new MockAdapter(axios);
  mockAxios.onGet(SERVICE_PRODUCT_DEFINITIONS_PATH).reply(200, definitions);
  it("+++ renders correctly", async () => {
    const { baseElement, getByText } = rtlReduxRouterRender(<CreatePolicy {...props} />, { route })
    await waitForElement(() => getByText(/Create Policy Definitions/i));
    expect(baseElement).toMatchSnapshot();
  });
});

describe("CreatePolicy --- RTL", () => {
  test("renders error message when fetching definitions failed", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(SERVICE_PRODUCT_DEFINITIONS_PATH).reply(404);

    const { getByText } = rtlReduxRouterRender(<CreatePolicy {...props} />, { route })
    const errorMessage = await waitForElement(() => getByText("Don’t lose your daks"));
    expect(errorMessage).toBeInTheDocument();
  });

  test("it is able to create policy only after adding a name", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(SERVICE_PRODUCT_DEFINITIONS_PATH).reply(200, definitions);

    const { getByPlaceholderText, getByTestId } = rtlReduxRouterRender(<CreatePolicy {...props} />, { route });

    const createButton = await waitForElement(() => getByTestId("policy-header-affirmative-action"));

    expect(createButton).toBeDisabled();

    const nameInput = getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: "test" } });

    expect(createButton).toBeEnabled();
  });

  test("create button is disabled while creating", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(SERVICE_PRODUCT_DEFINITIONS_PATH).reply(200, definitions);

    const { getByPlaceholderText, getByTestId } = rtlReduxRouterRender(<CreatePolicy {...props} />, { route });

    const createButton = await waitForElement(() => getByTestId("policy-header-affirmative-action"));

    const nameInput = getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(createButton).toBeEnabled();

    fireEvent.click(createButton);
    expect(createButton).toBeDisabled();
  });
});
