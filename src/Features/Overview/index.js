import React from "react";
import { useHistory } from "react-router-dom";
import { ErrorDragon, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import Welcome from "Components/Welcome";
import Insights from "./Insights";
import Policies from "./Policies";
import TeamSelector from "./TeamSelector";
import Violations from "./Violations";
import {
  SERVICE_PRODUCT_INSIGHTS_PATH,
  SERVICE_PRODUCT_POLICIES_PATH,
  SERVICE_PRODUCT_VIOLATIONS_PATH
} from "Config/servicesConfig";

import useAxiosFetch from "Utils/hooks/useAxios";
import AppContext from "State/context/appContext";
import styles from "./overview.module.scss";

export function Overview() {
  const history = useHistory();
  const { activeTeam, teams } = React.useContext(AppContext);
  const activeTeamId = activeTeam?.id;

  const policiesState = useAxiosFetch(`${SERVICE_PRODUCT_POLICIES_PATH}?teamId=${activeTeamId}`);
  const insightsState = useAxiosFetch(`${SERVICE_PRODUCT_INSIGHTS_PATH}?teamId=${activeTeamId}`);
  const violationsState = useAxiosFetch(`${SERVICE_PRODUCT_VIOLATIONS_PATH}?teamId=${activeTeamId}`);

  const handleChangeTeam = ({ selectedItem }) => {
    if (selectedItem?.id) {
      history.push(`/teams/${selectedItem.id}`);
    }
  };

  function renderContent() {
    if (!activeTeam) {
      return <Welcome />;
    }

    if (policiesState.isLoading || insightsState.isLoading || violationsState.isLoading) return <Loading />;

    if (policiesState.error && insightsState.error && violationsState.error) {
      return <ErrorDragon />;
    }
    return (
      <>
        {insightsState.data && (
          <Insights insights={insightsState.data} policies={policiesState.data} violations={violationsState.data} />
        )}
        {policiesState.data && <Policies policies={policiesState.data} />}
        {violationsState.data && (
          <Violations hasPolicies={policiesState?.data.length} violations={violationsState.data} />
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
