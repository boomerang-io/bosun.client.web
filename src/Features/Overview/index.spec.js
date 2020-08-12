import React from "react";
import { fireEvent } from "@testing-library/react";
import { queryCaches } from "react-query";
import { Route } from "react-router-dom";
import { startApiServer } from "ApiServer";
import { Overview } from "./index";

let server;

beforeEach(() => {
  server = startApiServer();
});

afterEach(() => {
  server.shutdown();
  queryCaches.forEach((queryCache) => queryCache.clear());
});

describe("Overview --- Snapshot", () => {

  it("Capturing Snapshot of Overview", async () => {
    const { baseElement, findByText } = rtlContextRouterRender(
    <Route path="/teams/:id">
      <Overview /> 
    </Route>,
    {
      route: "/teams/5a8b331e262a70306622df73",
    }
    );
    await findByText(/Violations Trend/);
    expect(baseElement).toMatchSnapshot();
  });
});

describe("Overview --- RTL", () => {

  it("Render Overview Content", async () => {
    
    const { getByText, getAllByText, getAllByTestId, getByTestId, findByText } = rtlContextRouterRender(
      <Route path="/teams/:id">
        <Overview /> 
      </Route>,
      {
        route: "/teams/5a8b331e262a70306622df73",
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
        <Overview /> 
      </Route>,
      {
        route: "/teams/5a8b331e262a70306622df73"
      }
    );
    await findByText("Violations Trend");
    const addPolicyButton = getByText("Create Policy");
    fireEvent.click(addPolicyButton);
    expect(history.location.pathname).toEqual("/teams/5a8b331e262a70306622df73/policy/create");
  });
  it("Redirect to Edit Policy", async () => {
    const { getByTestId, history, findByText } = rtlContextRouterRender(
      <Route path="/teams/:teamId">
        <Overview /> 
      </Route>,
      {
        route: "/teams/5a8b331e262a70306622df73"
      }
    );
    await findByText("Violations Trend");
    const policyTbody = getByTestId("policies-tbody");
    fireEvent.click(policyTbody.firstChild);
    expect(history.location.pathname).toEqual(`/teams/5a8b331e262a70306622df73/policy/edit/5cd49adff6ea74a9bb6adef3`);
  });
});
