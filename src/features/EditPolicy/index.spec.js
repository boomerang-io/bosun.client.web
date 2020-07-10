import React from "react";
import axios from "axios";
import { fireEvent, wait, screen } from "@testing-library/react";
import EditPolicy from ".";
import MockAdapter from "axios-mock-adapter";
import { SERVICE_PRODUCT_TEMPLATES_PATH, SERVICE_PRODUCT_POLICIES_PATH, SERVICE_PRODUCT_VALIDATION_INFO_PATH } from "Config/servicesConfig";

const route = "/111/policy/edit/222";
const props = {
  match: { params: { policyId: "222" } }
};

const definitions = [
  {
    "id": "5cd49777f6ea74a9bb6ac629",
    "key": "package_safelist",
    "name": "Package Safe List",
    "createDate": "2019-06-21T00:00:00.000+0000",
    "description": "The following package and artifact validation is validated against scans by JFrog Xray. Artifact and Version are validated through regular expression.",
    "order": 1,
    "rego": "",
    "rules": [
      {
        "key": "artifact",
        "label": "Package",
        "type": "text",
        "defaultValue": "",
        "required": false,
        "description": "Regular Expression",
        "options": null
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
      policyTemplateId: "5cd49777f6ea74a9bb6ac629",
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
const validateInfo = {
  "policyId": "5db9a8c7b01c530001b838d1",
  "referenceId": null,
  "referenceLink": null,
  "labels": {
    "artifact-path": "",
    "artifact-name": "",
    "artifact-version": "",
    "sonarqube-id": "",
    "sonarqube-version": ""
  },
  "annotations": null,
  "data": null
};

describe("EditPolicy --- Snapshot", () => {
  beforeEach(() => {
    document.body.setAttribute("id", "app");
  });

  const mockAxios = new MockAdapter(axios);
  mockAxios.onGet(SERVICE_PRODUCT_TEMPLATES_PATH).reply(200, definitions);
  mockAxios.onGet(SERVICE_PRODUCT_POLICIES_PATH + "/222").reply(200, policy);
  mockAxios.onGet(SERVICE_PRODUCT_VALIDATION_INFO_PATH + "/222").reply(200, validateInfo);
  it("+++ renders correctly", async () => {
    const { baseElement } = rtlRouterRender(<EditPolicy {...props} />, { route });
    await wait(() => screen.findByText(/Edit Policy/i));
    expect(baseElement).toMatchSnapshot();
  });
});

describe("EditPolicy --- RTL", () => {
  beforeEach(() => {
    document.body.setAttribute("id", "app");
  });

  test("renders error message when fetching definitions failed", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(SERVICE_PRODUCT_TEMPLATES_PATH).reply(404);
    mockAxios.onGet(SERVICE_PRODUCT_POLICIES_PATH + "/222").reply(200, policy);

    rtlRouterRender(<EditPolicy {...props} />, { route });
    const errorMessage = await wait(() => screen.findByText("Don’t lose your daks"));
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders error message when fetching policy failed", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(SERVICE_PRODUCT_TEMPLATES_PATH).reply(200, definitions);
    mockAxios.onGet(SERVICE_PRODUCT_POLICIES_PATH + "/222").reply(404);

    rtlRouterRender(<EditPolicy {...props} />, { route });
    const errorMessage = await wait(() => screen.findByText("Don’t lose your daks"));
    expect(errorMessage).toBeInTheDocument();
  });

  test("it is able to update policy only if it has a name", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(SERVICE_PRODUCT_TEMPLATES_PATH).reply(200, definitions);
    mockAxios.onGet(SERVICE_PRODUCT_POLICIES_PATH + "/222").reply(200, policy);
    mockAxios.onGet(SERVICE_PRODUCT_VALIDATION_INFO_PATH + "/222").reply(200, validateInfo);

    rtlRouterRender(<EditPolicy {...props} />, { route });
    await wait(() => screen.findByText(/Edit Policy/i));

    const saveButton = await wait(() => screen.findByTestId("policy-header-affirmative-action"));

    expect(saveButton).toBeEnabled();

    const nameInput = screen.getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: "" } });
    expect(saveButton).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(saveButton).toBeEnabled();
  });

  test("save button is disabled while saving", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(SERVICE_PRODUCT_TEMPLATES_PATH).reply(200, definitions);
    mockAxios.onGet(SERVICE_PRODUCT_POLICIES_PATH + "/222").reply(200, policy);
    mockAxios.onGet(SERVICE_PRODUCT_VALIDATION_INFO_PATH + "/222").reply(200, validateInfo);

    rtlRouterRender(<EditPolicy {...props} />, { route });

    const saveButton = await wait(() => screen.findByTestId("policy-header-affirmative-action"));

    const nameInput = screen.getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(saveButton).toBeEnabled();

    fireEvent.click(saveButton);
    expect(saveButton).toBeDisabled();
  });
});
