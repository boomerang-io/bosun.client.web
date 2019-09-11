import React from "react";
import { render as rtlRender, fireEvent, waitForElement } from "react-testing-library";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Overview } from "./index";
import "react-testing-library/cleanup-after-each";

function render(ui, { route = "/", history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...rtlRender(<Router history={history}>{ui}</Router>),
    history
  };
}

const insightsActions = { fetch: () => new Promise(() => {}) };
const getPoliciesActions = { fetch: () => new Promise(() => {}) };
const violationsActions = { fetch: () => new Promise(() => {}) };
const teams = [
  {
    id: "5a8b331e262a70306622df73",
    name: "ATT",
    higherLevelGroupId: "59aebcf47424530fce952fa2",
    ucdApplicationId: "96c22f37-5443-4bf5-83bb-7ce90deec820",
    isActive: true,
    audits: [
      {
        auditerId: null,
        date: 1519072030853,
        note: "CI-Team created"
      }
    ],
    boomerangTeamName: "AT&T MIL Mobile@Scale",
    boomerangTeamShortname: "ms-att-mil"
  },
  {
    id: "5a8b331f262a70306622df75",
    name: "Demo",
    higherLevelGroupId: "5a399185fe6c5c000a26663f",
    ucdApplicationId: "b89224cb-4f45-46e5-8721-0b09205e9bc6",
    isActive: true,
    audits: [
      {
        auditerId: null,
        date: 1519072031004,
        note: "CI-Team created"
      }
    ],
    boomerangTeamName: "Boomerang Demo",
    boomerangTeamShortname: "boomerang-demo"
  }
];
const reducerState = {
  isFetching: false,
  status: "success",
  error: "",
  data: []
};
const fetchingReducerState = {
  isFetching: true,
  status: "",
  error: "",
  data: []
};
const policiesReducerState = {
  isFetching: false,
  status: "success",
  error: "",
  data: [
    {
      createdDate: 1558051200000,
      name: "Timss",
      teamId: "5a8b331e262a70306622df73",
      definitions: [
        {
          ciPolicyDefinitionId: "5cd49777f6ea74a9bb6ac629",
          rules: [
            {
              value: "sdfgsdfg",
              operator: "less than",
              metric: "complexity"
            }
          ]
        },
        {
          ciPolicyDefinitionId: "5cd498f3f6ea74a9bb6ad0f3",
          rules: [
            {
              version: " asdfasdf",
              artifact: "asdasdf`",
              type: "maven"
            }
          ]
        }
      ],
      stages: ["dev"],
      id: "R4nuqJE"
    }
  ]
};
const team = {
  id: "5a8b331f262a70306622df75",
  name: "Demo",
  higherLevelGroupId: "5a399185fe6c5c000a26663f",
  ucdApplicationId: "b89224cb-4f45-46e5-8721-0b09205e9bc6",
  isActive: true,
  audits: [
    {
      auditerId: null,
      date: 1519072031004,
      note: "CI-Team created"
    }
  ],
  boomerangTeamName: "Boomerang Demo",
  boomerangTeamShortname: "boomerang-demo"
};
const props = {
  activeTeam: null,
  insightsActions,
  getPoliciesActions,
  violationsActions,
  insights: reducerState,
  policies: reducerState,
  violations: reducerState,
  teams
};

describe("Overview --- Snapshot", () => {
  it("Capturing Snapshot of Overview", async () => {
    const { baseElement, findByText } = render(<Overview {...props} activeTeam={team} />);
    await findByText(/Violations Trend/);
    expect(baseElement).toMatchSnapshot();
  });
});

describe("Overview --- RTL", () => {
  it("Render the Welcome page", async () => {
    const { getByText } = render(<Overview {...props} />);

    const welcomeText = await waitForElement(() => getByText(/Welcome to/i), { timeout: 5000 });
    const appText = await waitForElement(() => getByText(/Boomerang Citadel/i), { timeout: 5000 });
    const selectText = await waitForElement(() => getByText(/Select a team to get started/i), { timeout: 5000 });

    expect(welcomeText).toBeInTheDocument();
    expect(appText).toBeInTheDocument();
    expect(selectText).toBeInTheDocument();
  });

  it("Render Loading", () => {
    const { queryByTestId } = render(<Overview {...props} insights={fetchingReducerState} activeTeam={teams[0]} />);
    const loadingComponent = queryByTestId("loading-centered");
    expect(loadingComponent).toBeInTheDocument();
  });

  it("Render Overview Content", async () => {
    const { getByText, getAllByText, getAllByTestId, getByTestId } = render(
      <Overview {...props} activeTeam={teams[0]} policies={policiesReducerState} />
    );
    expect(getByText(/Insights/i)).toBeInTheDocument();
    expect(getAllByText(/Policies/i).length).toBeGreaterThan(1);
    expect(getAllByText(/Violations/i).length).toBeGreaterThan(1);

    const tiles = getAllByTestId("tile-info");

    expect(tiles).toHaveLength(2);

    expect(getByTestId("insights-graph")).toBeInTheDocument();
    expect(getByTestId("policies-container")).toBeInTheDocument();
    expect(getByTestId("violations-container")).toBeInTheDocument();
  });
  it("Redirect to Create Policy", async () => {
    const { history, findByText, getByText } = render(<Overview {...props} activeTeam={teams[0]} />);
    await findByText("Violations Trend");
    const addPolicyButton = getByText("Add Policy");
    fireEvent.click(addPolicyButton);
    expect(history.location.pathname).toEqual("//policy/create");
  });
  it("Redirect to Edit Policy", async () => {
    const { getByTestId, history, findByText } = render(
      <Overview {...props} activeTeam={teams[0]} policies={policiesReducerState} />
    );
    await findByText("Violations Trend");
    const policyTbody = getByTestId("policies-tbody");
    fireEvent.click(policyTbody.firstChild);
    expect(history.location.pathname).toEqual(`//policy/edit/${policiesReducerState.data[0].id}`);
  });
});
