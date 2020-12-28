import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { matchPath, useLocation, useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { FlagsProvider } from "flagged";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { ErrorDragon, ErrorBoundary, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import Main from "./Main";
import Navbar from "./Navbar";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/appConfig' or its corre... Remove this comment to see the full error message
import { PRODUCT_STANDALONE } from "Config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/servicesConfig' or its ... Remove this comment to see the full error message
import { serviceUrl, resolver } from "Config/servicesConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/appConfig' or its corre... Remove this comment to see the full error message
import { appLink } from "Config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'State/context/appContext' or i... Remove this comment to see the full error message
import AppContext from "State/context/appContext";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/appConfig' or its corre... Remove this comment to see the full error message
import { appPath } from "Config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './App.module.scss' or its corr... Remove this comment to see the full error message
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
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      const activeTeam = teamsState.data?.find((team: any) => team.id === activeTeamId);
      setActiveTeam(activeTeam);
    } else {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      const firstTeam = teamsState.data[0];
      setActiveTeam(firstTeam);
      if (!templatesMatch) {
        history.replace(appLink.teamOverview({ teamId: firstTeam.id }));
      }
    }
  }, [activeTeam, activeTeamId, history, setActiveTeam, teamsState, templatesMatch]);

  function renderMain() {
    if (teamsState.isLoading) {
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return <Loading />;
    }

    if (teamsState.error) {
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return <ErrorDragon style={{ margin: "3.5rem 0" }} />;
    }

    if (teamsState.data) {
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <AppContext.Provider value={{ activeTeam: activeTeam, teams: teamsState.data }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Main />
        </AppContext.Provider>
      );
    }

    return null;
  }

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ErrorBoundary errorComponent={ErrorDragon}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <FlagsProvider features={{ standalone: PRODUCT_STANDALONE }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className={styles.container}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Navbar activeTeam={activeTeam} navigationState={navigationState} userState={userState} />
          {renderMain()}
        </div>
      </FlagsProvider>
    </ErrorBoundary>
  );
}

export default App;
