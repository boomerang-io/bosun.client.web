import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import LoadingAnimation from "components/Loading";
import CreatePolicy from "features/CreatePolicy";
import CreateTemplate from "features/CreateTemplate";
import EditPolicy from "features/EditPolicy";
import EditTemplate from "features/EditTemplate";
import Overview from "features/Overview";
import Templates from "features/Templates";
import MessageBanner from "components/MessageBanner";
import styles from "./Main.module.scss";

function Main() {
  return (
    <>
      <MessageBanner />
      <main className={styles.container}>
        <Suspense fallback={<LoadingAnimation centered />}>
          <Switch>
            <Route path="/templates/create" component={CreateTemplate} />
            <Route path="/templates/edit/:templateId" component={EditTemplate} />
            <Route exact path="/templates" component={Templates} />
            <Route path="/:teamName/policy/edit/:policyId" component={EditPolicy} />
            <Route path="/:teamName/policy/create" component={CreatePolicy} />
            <Route path="/:teamName" component={Overview} />
            <Route path="/" component={Overview} />
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
