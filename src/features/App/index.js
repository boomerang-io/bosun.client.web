import React from "react";
import { matchPath, useLocation, useHistory } from "react-router-dom";
import { FlagsProvider } from "flagged";
import { ErrorDragon, ErrorBoundary, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import Main from "./Main";
import Navbar from "./Navbar";
import { PRODUCT_STANDALONE } from "config/appConfig";
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
  const teamsMatch = matchPath(location.pathname, { path: "/teams/:teamId" });
  const templatesMatch = matchPath(location.pathname, { path: "/templates" });

  const userState = useAxiosFetch(SERVICE_PLATFORM_PROFILE_PATH);
  const navigationState = useAxiosFetch(SERVICE_PLATFORM_NAVIGATION_PATH);
  const teamsState = useAxiosFetch(SERVICE_PRODUCT_TEAM_PATH);

  const [activeTeam, setActiveTeam] = React.useState();
  const activeTeamId = teamsMatch?.params?.teamId;
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
      if (!templatesMatch) {
        history.push(`/teams/${firstTeam.id}`);
      }
    }
  }, [activeTeam, activeTeamId, history, setActiveTeam, teamsState, templatesMatch]);

  function renderMain() {
    if (teamsState.isLoading) {
      return <Loading />;
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
      <FlagsProvider features={{ standalone: PRODUCT_STANDALONE }}>
        <div className={styles.container}>
          <Navbar activeTeam={activeTeam} navigationState={navigationState} userState={userState} />
          {renderMain()}
        </div>
      </FlagsProvider>
    </ErrorBoundary>
  );
}

export default App;
