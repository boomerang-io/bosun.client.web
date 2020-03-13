import React from "react";
import { matchPath, useLocation, useHistory } from "react-router-dom";
import ErrorBoundary from "components/ErrorBoundary";
import ErrorDragon from "components/ErrorDragon";
import Loading from "components/Loading";
import Main from "./Main";
import Navbar from "./Navbar";
import {
  SERVICE_PRODUCT_TEAM_PATH,
  SERVICE_PLATFORM_PROFILE_PATH,
  SERVICE_PLATFORM_NAVIGATION_PATH
} from "config/servicesConfig";
import useAxiosFetch from "utils/hooks/useAxios";
import AppContext from "state/context/appContext";
import styles from "./App.module.scss";

export function App() {
  const history = useHistory();
  const location = useLocation();
  const globalMatch = matchPath(location.pathname, { path: "/:feature/:teamId" });

  const userState = useAxiosFetch(SERVICE_PLATFORM_PROFILE_PATH);
  const navigationState = useAxiosFetch(SERVICE_PLATFORM_NAVIGATION_PATH);
  const teamsState = useAxiosFetch(SERVICE_PRODUCT_TEAM_PATH);

  const [activeTeam, setActiveTeam] = React.useState();
  const activeTeamId = globalMatch?.params?.teamId;
  const activeFeature = globalMatch?.params?.feature;
  React.useEffect(() => {
    if (!teamsState?.data) {
      return;
    }

    if (activeTeamId) {
      const activeTeam = teamsState.data?.find(team => team.id === activeTeamId);
      setActiveTeam(activeTeam);
    } else {
      const firstTeam = teamsState.data[0];
      setActiveTeam(firstTeam);
      if (activeFeature === "teams") {
        history.push(`/teams/${firstTeam.id}`);
      }
    }
  }, [activeFeature, activeTeam, activeTeamId, history, setActiveTeam, teamsState]);

  function renderMain() {
    if (teamsState.isLoading) {
      return <Loading centered />;
    }

    if (teamsState.error) {
      return <ErrorDragon style={{ margin: "3.5rem 0" }} />;
    }

    if (teamsState.data) {
      return (
        <AppContext.Provider value={{ activeTeam: activeTeam, teams: teamsState.data }}>
          <Main />
        </AppContext.Provider>
      );
    }

    return null;
  }

  return (
    <ErrorBoundary errorComponent={ErrorDragon}>
      <div className={styles.container}>
        <Navbar activeTeam={activeTeam} navigationState={navigationState} userState={userState} />
        {renderMain()}
      </div>
    </ErrorBoundary>
  );
}

export default App;
