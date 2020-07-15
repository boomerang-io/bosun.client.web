import React from "react";
import { render as rtlRender, fireEvent, waitForElement } from "@testing-library/react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import mockAxios from "utils/mocks/axios"
import {
  SERVICE_PRODUCT_INSIGHTS_PATH,
  SERVICE_PRODUCT_POLICIES_PATH,
  SERVICE_PRODUCT_VIOLATIONS_PATH
} from "config/servicesConfig";
import { Overview } from "./index";

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
          policyTemplateId: "5cd49777f6ea74a9bb6ac629",
          rules: [
            {
              value: "sdfgsdfg",
              operator: "less than",
              metric: "complexity"
            }
          ]
        },
        {
          policyTemplateId: "5cd498f3f6ea74a9bb6ad0f3",
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
const insights = [{
  "policyId": "5cddc15ff6ea74a9bbb2291b",
  "policyName": "Marcus's Policy",
  "policyCreatedDate": "2019-06-21T00:00:00.000+0000",
  "insights": [
    {
      "policyActivityId": "5cddc13fbc6f9400013360a9",
      "policyActivityCreatedDate": "2019-06-21T00:00:00.000+0000",
      "violations": 1
    },
    {
      "policyActivityId": "5cddc177bc6f9400013360aa",
      "policyActivityCreatedDate": "2019-06-22T00:00:00.000+0000",
      "violations": 1
    },
    {
      "policyActivityId": "5cddc430bc6f9400013360b2",
      "policyActivityCreatedDate": "2019-06-23T00:00:00.000+0000",
      "violations": 1
    },
    {
      "policyActivityId": "5cddc44fbc6f9400013360b4",
      "policyActivityCreatedDate": "2019-06-24T00:00:00.000+0000",
      "violations": 1
    },
    {
      "policyActivityId": "5ce1d56d76a4e100013eaab4",
      "policyActivityCreatedDate": "2019-06-25T00:00:00.000+0000",
      "violations": 1
    }
  ]
}];

const violations = [
  {
    "id": "5cf144d17d5cc80001d190a25cf968648a6e7e0001eca0e75cfeae64876b210001c439145cedf589dd1be20001f3d994",
    "policyId": "5cf144d17d5cc80001d190a2",
    "policyName": "Glens Policy",
    "policyActivityCreatedDate": "2019-06-13T20:47:41.265+0000",
    "policyDefinitionTypes": [
      "Static Code Analysis",
      "Static Code Analysis"
    ],
    "nbrViolations": 1,
    "violations": [],
    "labels": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "annotations": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  }
];
const policies = [
  {
    "id": "5cd49adff6ea74a9bb6adef3",
    "createdDate": "2019-06-21T00:00:00.000+0000",
    "name": "Tyson's Policy",
    "teamId": "5a8b331e262a70306622df73",
    "definitions": [
      {
        "policyTemplateId": "5cd49777f6ea74a9bb6ac629",
        "rules": [
          {
            "metric": "lines",
            "operator": "",
            "value": "10"
          },
          {
            "metric": "complexity",
            "operator": "",
            "value": "1000"
          }
        ]
      },
      {
        "policyTemplateId": "5cd498f3f6ea74a9bb6ad0f3",
        "rules": [
          {
            "type": "maven",
            "artifact": "commons-.*",
            "version": ".*"
          },
          {
            "type": "maven",
            "artifact": "jackson-annotator",
            "version": "1.8.9"
          }
        ]
      },
      {
        "policyTemplateId": "5cdd8667f6ea74a9bbaf5022",
        "rules": []
      },
      {
        "policyTemplateId": "5cdd8425f6ea74a9bbaf2fe6",
        "rules": []
      },
      {
        "policyTemplateId": "7J-RGvV",
        "rules": []
      }
    ],
    "stages": [
      "dev"
    ]
  }
];
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
  mockAxios.onGet(`${SERVICE_PRODUCT_INSIGHTS_PATH}?teamId=1`).reply(200, insights);
  mockAxios.onGet(`${SERVICE_PRODUCT_POLICIES_PATH}?teamId=1`).reply(200, policies);
  mockAxios.onGet(`${SERVICE_PRODUCT_VIOLATIONS_PATH}?teamId=1`).reply(200, violations);

  it("Capturing Snapshot of Overview", async () => {
    const { baseElement, findByText } = rtlContextRouterRender(
    <Route path="/teams/:id">
      <Overview {...props} activeTeam={team} /> 
    </Route>,
    {
      route: "/teams/1",
    }
    );
    await findByText(/Violations Trend/);
    expect(baseElement).toMatchSnapshot();
  });
});

describe("Overview --- RTL", () => {
  mockAxios.onGet(`${SERVICE_PRODUCT_INSIGHTS_PATH}?teamId=1`).reply(200, insights);
  mockAxios.onGet(`${SERVICE_PRODUCT_POLICIES_PATH}?teamId=1`).reply(200, policies);
  mockAxios.onGet(`${SERVICE_PRODUCT_VIOLATIONS_PATH}?teamId=1`).reply(200, violations);

  it("Render Overview Content", async () => {
    
    const { getByText, getAllByText, getAllByTestId, getByTestId, findByText } = rtlContextRouterRender(
      <Route path="/teams/:id">
        <Overview {...props} activeTeam={teams[0]} policies={policiesReducerState}/> 
      </Route>,
      {
        route: "/teams/1",
      }
    );
    await findByText(/Violations Trend/);
    expect(getByText(/insights/i)).toBeInTheDocument();
    expect(getAllByText(/policies/i).length).toBeGreaterThan(1);
    expect(getAllByText(/violations/i).length).toBeGreaterThan(1);

    const tiles = getAllByTestId("tile-info");

    expect(tiles).toHaveLength(2);

    expect(getByTestId("insights-graph")).toBeInTheDocument();
    expect(getByTestId("policies-container")).toBeInTheDocument();
    expect(getByTestId("violations-container")).toBeInTheDocument();
  });
  it("Redirect to Create Policy", async () => {
    const { history, findByText, getByText } = rtlContextRouterRender(
      <Route path="/teams/:id">
        <Overview {...props} activeTeam={team} /> 
      </Route>,
      {
        route: "/teams/1"
      }
    );
    await findByText("Violations Trend");
    const addPolicyButton = getByText("Create Policy");
    fireEvent.click(addPolicyButton);
    expect(history.location.pathname).toEqual("/teams/1/policy/create");
  });
  it("Redirect to Edit Policy", async () => {
    const { getByTestId, history, findByText } = rtlContextRouterRender(
      <Route path="/teams/:teamId">
        <Overview {...props} activeTeam={team} /> 
      </Route>,
      {
        route: "/teams/5a8b331f262a70306622df75"
      }
    );
    await findByText("Violations Trend");
    const policyTbody = getByTestId("policies-tbody");
    fireEvent.click(policyTbody.firstChild);
    expect(history.location.pathname).toEqual(`/teams/${team.id}/policy/edit/${policies[0].id}`);
  });
});
