import React from "react";
import { fireEvent, waitForElement } from "@testing-library/react";
import { queryCaches } from "react-query";
import { startApiServer } from "ApiServer";
import CreatePolicy from "../CreatePolicy";
import { serviceUrl } from "Config/servicesConfig";

const route = "/5a8b331e262a70306622df73/policy/create";
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

let server;

beforeEach(() => {
  server = startApiServer();
});

afterEach(() => {
  server.shutdown();
  queryCaches.forEach((queryCache) => queryCache.clear());
});

describe("CreatePolicy --- Snapshot", () => {
  it("renders correctly", async () => {
    const { baseElement, getByText } = rtlRouterRender(<CreatePolicy />, { initialState, route });
    await waitForElement(() => getByText(/Create Policy/i));
    expect(baseElement).toMatchSnapshot();
  });
});

describe("CreatePolicy --- RTL", () => {
  test("renders error message when fetching definitions failed", async () => {
    server.get(serviceUrl.getPolicies(), () => {
      return new Response(404, {}, {data: {status:404}})
    });
    const { getByText } = rtlRouterRender(<CreatePolicy />, { route });
    const errorMessage = await waitForElement(() => getByText("Don’t lose your daks"));
    expect(errorMessage).toBeInTheDocument();
  });

  test("it is able to create policy only after adding a name", async () => {
    const { getByPlaceholderText, getByTestId } = rtlRouterRender(<CreatePolicy />, {
      route
    });

    const createButton = await waitForElement(() => getByTestId("policy-header-affirmative-action"));

    expect(createButton).toBeDisabled();

    const nameInput = getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: "test" } });

    expect(createButton).toBeEnabled();
  });

  test("create button is disabled while creating", async () => {
    const { getByPlaceholderText, getByTestId, findByText } = rtlContextRouterRender(<CreatePolicy />, {
      initialState,
      route
    });

    const createButton = await waitForElement(() => getByTestId("policy-header-affirmative-action"));

    const nameInput = getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(createButton).toBeEnabled();

    fireEvent.click(createButton);
    expect(await findByText(/Create Policy/)).toBeInTheDocument();
  });
});
