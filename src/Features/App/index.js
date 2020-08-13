import React from "react";
import { matchPath, useLocation, useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { FlagsProvider } from "flagged";
import { ErrorDragon, ErrorBoundary, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import Main from "./Main";
import Navbar from "./Navbar";
import { PRODUCT_STANDALONE } from "Config/appConfig";
import { serviceUrl, resolver } from "Config/servicesConfig";
import { appLink } from "Config/appConfig";
import AppContext from "State/context/appContext";
import { appPath } from "Config/appConfig";
import styles from "./App.module.scss";

const userUrl = serviceUrl.getUserProfile();
const navigationUrl = serviceUrl.getNavigation();
const teamsUrl = serviceUrl.getTeams();

export function App() {
  const history = useHistory();
  const location = useLocation();
  const teamsMatch = matchPath(location.pathname, { path: appPath.overview });
  const templatesMatch = matchPath(location.pathname, { path: appPath.templates });
  
  const userState = useQuery({
    queryKey: userUrl,
    queryFn: resolver.query(userUrl),
  });
  const navigationState = useQuery({
    queryKey: navigationUrl,
    queryFn: resolver.query(navigationUrl),
  });
  const teamsState = useQuery({
    queryKey: teamsUrl,
    queryFn: resolver.query(teamsUrl),
  });

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
        history.push(appLink.teamOverview({teamId: firstTeam.id}));
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
