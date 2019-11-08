import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import ErrorBoundary from "components/ErrorBoundary";
import ErrorDragon from "components/ErrorDragon";
import Loading from "components/Loading";
import Main from "./Main";
import Navbar from "./Navbar";
import { SERVICE_PRODUCT_TEAM_PATH } from "config/servicesConfig";
import useAxiosFetch from "utils/hooks/useAxios";
import AppContext from "state/context/appContext";
import styles from "./App.module.scss";

export function App() {
  const location = useLocation();
  const globalMatch = matchPath(location.pathname, { path: "/:teamName" });

  const teamsState = useAxiosFetch(SERVICE_PRODUCT_TEAM_PATH);

  const [activeTeam, setActiveTeam] = React.useState();

  const activeTeamName = globalMatch?.params?.teamName;
  React.useEffect(() => {
    if (activeTeamName) {
      const activeTeam = teamsState.data?.find(team => team.name === activeTeamName);
      setActiveTeam(activeTeam);
    }
  }, [activeTeamName, setActiveTeam, teamsState.data]);

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
        <Navbar />
        {renderMain()}
      </div>
    </ErrorBoundary>
  );
}

export default App;
