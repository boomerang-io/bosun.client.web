import React from "react";
import { fireEvent, wait, screen } from "@testing-library/react";
import { queryCaches } from "react-query";
import { startApiServer } from "ApiServer";
import EditPolicy from "../EditPolicy";
import { serviceUrl } from "Config/servicesConfig";

const route = "/5a8b331e262a70306622df73/policy/edit/5cd49adff6ea74a9bb6adef3";
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

let server;

beforeEach(() => {
  server = startApiServer();
});

afterEach(() => {
  server.shutdown();
  queryCaches.forEach((queryCache) => queryCache.clear());
});

describe("EditPolicy --- Snapshot", () => {
  beforeEach(() => {
    document.body.setAttribute("id", "app");
  });

  it("renders correctly", async () => {
    const { baseElement } = rtlRouterRender(<EditPolicy {...props} />, { route });
    await screen.findByText(/Edit Policy/i);
    expect(baseElement).toMatchSnapshot();
  });
});

describe("EditPolicy --- RTL", () => {
  beforeEach(() => {
    document.body.setAttribute("id", "app");
  });

  test("renders error message when fetching definitions failed", async () => {
    server.get(serviceUrl.getPolicies(), () => {
      return new Response(404, {}, {data: {status:404}})
    });

    rtlRouterRender(<EditPolicy {...props} />, { route });
    const errorMessage = await screen.findByText("Don’t lose your daks");
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders error message when fetching policy failed", async () => {
    server.get(serviceUrl.getPolicy({ policyId: "5cd49adff6ea74a9bb6adef3" }), () => {
      return new Response(404, {}, {data: {status:404}})
    });
    rtlRouterRender(<EditPolicy {...props} />, { route });
    const errorMessage = await screen.findByText("Don’t lose your daks");
    expect(errorMessage).toBeInTheDocument();
  });

  test("it is able to update policy only if it has a name", async () => {
    rtlRouterRender(<EditPolicy {...props} />, { route });
    await screen.findByText(/Edit Policy/i);

    const saveButton = await screen.findByTestId("policy-header-affirmative-action");

    expect(saveButton).toBeEnabled();

    const nameInput = screen.getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: "" } });
    expect(saveButton).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(saveButton).toBeEnabled();
  });

  test("save button is disabled while saving", async () => {

    rtlRouterRender(<EditPolicy {...props} />, { route });

    const saveButton = await screen.findByTestId("policy-header-affirmative-action");

    const nameInput = screen.getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(saveButton).toBeEnabled();

    fireEvent.click(saveButton);
    expect(saveButton).toBeDisabled();
  });
});
