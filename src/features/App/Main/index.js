import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoadingAnimation from "components/Loading";
import CreatePolicy from "features/CreatePolicy";
import EditPolicy from "features/EditPolicy";
import Overview from "features/Overview";
import MessageBanner from "components/MessageBanner";
import styles from "./Main.module.scss";

function Main() {
  return (
    <>
      <MessageBanner />
      <main className={styles.container}>
        <Suspense fallback={<LoadingAnimation centered />}>
          <Switch>
            <Route path="/:teamName/policy/edit/:policyId" component={EditPolicy} />
            <Route path="/:teamName/policy/create" component={CreatePolicy} />
            <Route path="/:teamName" component={Overview} />
            <Route path="/" component={Overview} />
          </Switch>
        </Suspense>
      </main>
      <ToastContainer position="top-right" />
    </>
  );
}

export default Main;
