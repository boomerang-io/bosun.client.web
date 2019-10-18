import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";
import { NotificationsContainer } from "@boomerang/carbon-addons-boomerang-react";
import LoadingAnimation from "Components/Loading";
import CreatePolicy from "Features/CreatePolicy";
import EditPolicy from "Features/EditPolicy";
import Overview from "Features/Overview";
import MessageBanner from "Components/MessageBanner";
import styles from "./Main.module.scss";

Main.propTypes = {
  globalMatch: PropTypes.object,
  location: PropTypes.object.isRequired,
  setActiveTeam: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

function Main({ globalMatch, location, setActiveTeam, user }) {
  const teamName = globalMatch?.params?.teamName;
  React.useEffect(() => {
    if (teamName) {
      setActiveTeam(teamName);
    }
  }, [teamName, setActiveTeam]);

  React.useEffect(() => {
    if (window.newrelic && user.data.id) {
      window.newrelic.setCustomAttribute("userId", user.data.id);
    }
  }, [user]);

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
      <NotificationsContainer enableMultiContainer />
    </>
  );
}

export default withRouter(Main);
