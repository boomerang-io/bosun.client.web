import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import { Error404 } from "@boomerang/carbon-addons-boomerang-react";
import LoadingAnimation from "components/Loading";
import CreatePolicy from "features/CreatePolicy";
import CreateTemplate from "features/CreateTemplate";
import EditPolicy from "features/EditPolicy";
import EditTemplate from "features/EditTemplate";
import Overview from "features/Overview";
import Templates from "features/Templates";
//import MessageBanner from "components/MessageBanner";
import styles from "./Main.module.scss";

function Main() {
  return (
    <>
      {
        //<MessageBanner />
      }
      <main className={styles.container}>
        <Suspense fallback={<LoadingAnimation centered />}>
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
