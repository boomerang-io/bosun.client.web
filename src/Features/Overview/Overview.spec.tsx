import React from "react";
import { fireEvent } from "@testing-library/react";
import { queryCaches } from "react-query";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Route } from "react-router-dom";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'ApiServer' or its correspondin... Remove this comment to see the full error message
import { startApiServer } from "ApiServer";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/appConfig' or its corre... Remove this comment to see the full error message
import { appPath, appLink } from "Config/appConfig";
import Overview from ".";

let server: any;

beforeEach(() => {
  server = startApiServer();
});

afterEach(() => {
  server.shutdown();
  queryCaches.forEach((queryCache) => queryCache.clear());
});

describe("Overview --- Snapshot", () => {

  it("Capturing Snapshot of Overview", async () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'rtlContextRouterRender'.
    const { baseElement, findByText } = rtlContextRouterRender(
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Route path={appPath.overview}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Overview /> 
    </Route>,
    {
      route: appLink.teamOverview({teamId: "5a8b331e262a70306622df73"}),
    }
    );
    await findByText(/Violations Trend/);
    expect(baseElement).toMatchSnapshot();
  });
});

describe("Overview --- RTL", () => {

  it("Render Overview Content", async () => {
    
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'rtlContextRouterRender'.
    const { getByText, getAllByText, getAllByTestId, getByTestId, findByText } = rtlContextRouterRender(
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Route path={appPath.overview}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Overview /> 
      </Route>,
      {
        route: appLink.teamOverview({teamId: "5a8b331e262a70306622df73"}),
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
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'rtlContextRouterRender'.
    const { history, findByText, getByText } = rtlContextRouterRender(
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Route path={appPath.overview}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Overview /> 
      </Route>,
      {
        route: appLink.teamOverview({teamId: "5a8b331e262a70306622df73"})
      }
    );
    await findByText("Violations Trend");
    const addPolicyButton = getByText("Create Policy");
    fireEvent.click(addPolicyButton);
    expect(history.location.pathname).toEqual(appLink.createPolicy({teamId: "5a8b331e262a70306622df73"}));
  });
  it("Redirect to Edit Policy", async () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'rtlContextRouterRender'.
    const { getByTestId, history, findByText } = rtlContextRouterRender(
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Route path={appPath.overview}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Overview /> 
      </Route>,
      {
        route: appLink.teamOverview({teamId: "5a8b331e262a70306622df73"})
      }
    );
    await findByText("Violations Trend");
    const policyTbody = getByTestId("policies-tbody");
    fireEvent.click(policyTbody.firstChild);
    expect(history.location.pathname).toEqual(appLink.editPolicy({teamId:"5a8b331e262a70306622df73", policyId:"5cd49adff6ea74a9bb6adef3"}));
  });
});
