import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import { Error404, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import styles from "./Main.module.scss";

const EditPolicy = lazy(() => import(/* webpackChunkName: "EditPolicy" */ "features/EditPolicy"));
const CreatePolicy = lazy(() => import(/* webpackChunkName: "CreatePolicy" */ "features/CreatePolicy"));
const CreateTemplate = lazy(() => import(/* webpackChunkName: "CreateTemplate" */ "features/CreateTemplate"));
const EditTemplate = lazy(() => import(/* webpackChunkName: "EditTemplate" */ "features/EditTemplate"));
const Overview = lazy(() => import(/* webpackChunkName: "Overview" */ "features/Overview"));
const Templates = lazy(() => import(/* webpackChunkName: "Templates" */ "features/Templates"));

function Main() {
  return (
    <>
      <main id="content" className={styles.container}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/templates/create" component={CreateTemplate} />
            <Route path="/templates/edit/:templateId" component={EditTemplate} />
            <Route exact path="/templates" component={Templates} />
            <Route path="/teams/:teamId/policy/edit/:policyId" component={EditPolicy} />
            <Route path="/teams/:teamId/policy/create" component={CreatePolicy} />
            <Route path="/teams/:teamId" component={Overview} />
            <Route exact path="/" component={Overview} />
            <Route path="*" component={Error404} />
          </Switch>
        </Suspense>
      </main>
      <ToastContainer
        autoClose={3000}
        closeOnClick={true}
        draggablePercent={60}
        hideProgressBar={true}
        pauseOnHover={true}
        position="top-right"
        transition={Slide}
      />
    </>
  );
}

export default Main;
