import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { ErrorDragon, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import Welcome from "Components/Welcome";
import Insights from "./Insights";
import Policies from "./Policies";
import TeamSelector from "./TeamSelector";
import Violations from "./Violations";
import { serviceUrl, resolver } from "Config/servicesConfig";
import AppContext from "State/context/appContext";
import styles from "./overview.module.scss";

export function Overview() {
  const history = useHistory();
  const { activeTeam, teams } = React.useContext(AppContext);
  const activeTeamId = activeTeam?.id;

  const policiesUrl = serviceUrl.getTeamPolicies({teamId: activeTeamId});
  const insightsUrl = serviceUrl.getInsights({teamId: activeTeamId});
  const violationsUrl = serviceUrl.getViolations({teamId: activeTeamId});

  const { data: policiesData, isLoading: policiesIsLoading, error: policiesError } = useQuery({
    queryKey: policiesUrl,
    queryFn: resolver.query(policiesUrl)
  });

  const { data: insightsData, isLoading: insightsIsLoading, error: insightsError } = useQuery({
    queryKey: insightsUrl,
    queryFn: resolver.query(insightsUrl)
  });

  const { data: violationsData, isLoading: violationsIsLoading, error: violationsError } = useQuery({
    queryKey: violationsUrl,
    queryFn: resolver.query(violationsUrl)
  });

  const handleChangeTeam = ({ selectedItem }) => {
    if (selectedItem?.id) {
      history.push(`/teams/${selectedItem.id}`);
    }
  };

  function renderContent() {
    if (!activeTeam) {
      return <Welcome />;
    }

    if (policiesIsLoading || insightsIsLoading || violationsIsLoading) return <Loading />;

    if (policiesError && insightsError && violationsError) {
      return <ErrorDragon />;
    }
    return (
      <>
        {insightsData && (
          <Insights insights={insightsData} policies={policiesData} violations={violationsData} />
        )}
        {policiesData && <Policies policies={policiesData} />}
        {violationsData && (
          <Violations hasPolicies={policiesData?.length} violations={violationsData} />
        )}
      </>
    );
  }

  return (
    <div className={styles.container}>
      <TeamSelector activeTeam={activeTeam} handleChangeTeam={handleChangeTeam} teams={teams} />
      {renderContent()}
    </div>
  );
}

export default Overview;
