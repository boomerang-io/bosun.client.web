import React from "react";
import axios from "axios";
import { fireEvent, waitForElement } from "react-testing-library";
import EditPolicy from ".";
import MockAdapter from "axios-mock-adapter";
import { SERVICE_PRODUCT_DEFINITIONS_PATH, SERVICE_PRODUCT_POLICIES_PATH } from "Config/servicesConfig";

const route = "/111/policy/edit/222";
const props = {
  match: { params: { policyId: "222" } }
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

const policy = {
  id: "5cd49adff6ea74a9bb6adef3",
  createdDate: "2019-06-21T00:00:00.000+0000",
  name: "Tyson's Policy",
  teamId: "5a8b331e262a70306622df73",
  definitions: [
    {
      ciPolicyDefinitionId: "5cd49777f6ea74a9bb6ac629",
      rules: [
        {
          metric: "lines",
          operator: "",
          value: "10"
        },
        {
          metric: "complexity",
          operator: "",
          value: "1000"
        }
      ]
    }
  ],
  stages: ["dev"]
};

describe("EditPolicy --- Snapshot", () => {
  beforeEach(() => {
    document.body.setAttribute("id", "app");
  });

  const mockAxios = new MockAdapter(axios);
  mockAxios.onGet(SERVICE_PRODUCT_DEFINITIONS_PATH).reply(200, definitions);
  mockAxios.onGet(SERVICE_PRODUCT_POLICIES_PATH + "/222").reply(200, policy);
  it("+++ renders correctly", async () => {
    const { baseElement, getByText } = renderWithRouter(<EditPolicy {...props} />, { route });
    await waitForElement(() => getByText(/Edit Policy Definitions/i));
    expect(baseElement).toMatchSnapshot();
  });
});

describe("EditPolicy --- RTL", () => {
  beforeEach(() => {
    document.body.setAttribute("id", "app");
  });

  test("renders error message when fetching definitions failed", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(SERVICE_PRODUCT_DEFINITIONS_PATH).reply(404);
    mockAxios.onGet(SERVICE_PRODUCT_POLICIES_PATH + "/222").reply(200, policy);

    const { getByText } = renderWithRouter(<EditPolicy {...props} />, { route });
    const errorMessage = await waitForElement(() => getByText("Don’t lose your daks"));
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders error message when fetching policy failed", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(SERVICE_PRODUCT_DEFINITIONS_PATH).reply(200, definitions);
    mockAxios.onGet(SERVICE_PRODUCT_POLICIES_PATH + "/222").reply(404);

    const { getByText } = renderWithRouter(<EditPolicy {...props} />, { route });
    const errorMessage = await waitForElement(() => getByText("Don’t lose your daks"));
    expect(errorMessage).toBeInTheDocument();
  });

  test("it is able to update policy only if it has a name", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(SERVICE_PRODUCT_DEFINITIONS_PATH).reply(200, definitions);
    mockAxios.onGet(SERVICE_PRODUCT_POLICIES_PATH + "/222").reply(200, policy);

    const { getByPlaceholderText, getByTestId } = renderWithRouter(<EditPolicy {...props} />, { route });

    const saveButton = await waitForElement(() => getByTestId("policy-header-affirmative-action"));

    expect(saveButton).toBeEnabled();

    const nameInput = getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: "" } });
    expect(saveButton).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(saveButton).toBeEnabled();
  });

  test("save button is disabled while saving", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(SERVICE_PRODUCT_DEFINITIONS_PATH).reply(200, definitions);
    mockAxios.onGet(SERVICE_PRODUCT_POLICIES_PATH + "/222").reply(200, policy);

    const { getByPlaceholderText, getByTestId } = renderWithRouter(<EditPolicy {...props} />, { route });

    const saveButton = await waitForElement(() => getByTestId("policy-header-affirmative-action"));

    const nameInput = getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(saveButton).toBeEnabled();

    fireEvent.click(saveButton);
    expect(saveButton).toBeDisabled();
  });

  test("delete modals appears and delete button is disabled while deleting", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(SERVICE_PRODUCT_DEFINITIONS_PATH).reply(200, definitions);
    mockAxios.onGet(SERVICE_PRODUCT_POLICIES_PATH + "/222").reply(200, policy);

    const { getByText } = renderWithRouter(<EditPolicy {...props} />, { route });

    const deleteButton = await waitForElement(() => getByText(/delete/i));
    expect(deleteButton).toBeEnabled();

    fireEvent.click(deleteButton);
    getByText(/it will be gone/i);

    fireEvent.click(getByText(/yes/i));
    expect(deleteButton).toBeDisabled();
  });
});
