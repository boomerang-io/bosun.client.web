import React, { Suspense, lazy } from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Switch, Route } from "react-router-dom";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { Error404, Loading, NotificationsContainer } from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/appConfig' or its corre... Remove this comment to see the full error message
import { appPath } from "Config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Main.module.scss' or its cor... Remove this comment to see the full error message
import styles from "./Main.module.scss";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Features/EditPolicy' or its co... Remove this comment to see the full error message
const EditPolicy = lazy(() => import(/* webpackChunkName: "EditPolicy" */ "Features/EditPolicy"));
const CreatePolicy = lazy(() => import(/* webpackChunkName: "CreatePolicy" */ "Features/CreatePolicy"));
const CreateTemplate = lazy(() => import(/* webpackChunkName: "CreateTemplate" */ "Features/CreateTemplate"));
const EditTemplate = lazy(() => import(/* webpackChunkName: "EditTemplate" */ "Features/EditTemplate"));
const Overview = lazy(() => import(/* webpackChunkName: "Overview" */ "Features/Overview"));
const Templates = lazy(() => import(/* webpackChunkName: "Templates" */ "Features/Templates"));

function Main() {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <main id="content" className={styles.container}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Suspense fallback={<Loading />}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Switch>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Route path={appPath.createTemplate} component={CreateTemplate} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Route path={appPath.editTemplate} component={EditTemplate} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Route exact path={appPath.templates} component={Templates} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Route path={appPath.editPolicy} component={EditPolicy} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Route path={appPath.createPolicy} component={CreatePolicy} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Route path={appPath.overview} component={Overview} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Route exact path="/" component={Overview} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Route path="*" component={Error404} />
        </Switch>
      </Suspense>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <NotificationsContainer enableMultiContainer />
    </main>
  );
}

export default Main;
