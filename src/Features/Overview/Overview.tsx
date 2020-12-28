import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import cx from "classnames";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'carb... Remove this comment to see the full error message
import { settings } from "carbon-components";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { ErrorMessage, SkeletonPlaceholder, DataTableSkeleton, ErrorDragon } from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/Welcome' or its cor... Remove this comment to see the full error message
import Welcome from "Components/Welcome";
import Insights from "./Insights";
import Policies from "./Policies";
import TeamSelector from "./TeamSelector";
import Violations from "./Violations";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/servicesConfig' or its ... Remove this comment to see the full error message
import { serviceUrl, resolver } from "Config/servicesConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/appConfig' or its corre... Remove this comment to see the full error message
import { appLink } from "Config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'State/context/appContext' or i... Remove this comment to see the full error message
import AppContext from "State/context/appContext";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './overview.module.scss' or its... Remove this comment to see the full error message
import styles from "./overview.module.scss";

const { prefix } = settings;

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

  const handleChangeTeam = ({
    selectedItem
  }: any) => {
    if (selectedItem?.id) {
      history.push(appLink.teamOverview({teamId: selectedItem.id}));
    }
  };

  const RenderInsights = () => {
    if(insightsIsLoading || policiesIsLoading || violationsIsLoading)
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.skeletonContainer}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className={styles.dataSkeleton}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <SkeletonPlaceholder className={styles.tileSkeleton}/>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <SkeletonPlaceholder className={styles.tileSkeleton}/>
          </div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <SkeletonPlaceholder className={styles.chartTileSkeleton}/>
        </div>
      );
    if(insightsError || policiesError || violationsError)
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ErrorMessage />
      );
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Insights insights={insightsData} policies={policiesData} violations={violationsData} />
    );
  };

  const RenderPolicies = () => {
    if(policiesIsLoading)
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.tableSkeleton}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <SkeletonPlaceholder className={styles.titleSkeleton}/>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <DataTableSkeleton 
          data-testid="policies-loading-skeleton"
          className={cx(`${prefix}--skeleton`, `${prefix}--data-table`, styles.policiesTableSkeleton)}
          rowCount={10}
          columnCount={4}
        />
      </div>
    );
    if(policiesError)
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ErrorMessage />
      );
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Policies policies={policiesData} activeTeamId={activeTeam.id}/>
    );
  };

  const RenderViolations = () => {
    if(violationsIsLoading)
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.tableSkeleton}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <SkeletonPlaceholder className={styles.titleSkeleton}/>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <DataTableSkeleton
            data-testid="policies-loading-skeleton"
            className={cx(`${prefix}--skeleton`, `${prefix}--data-table`, styles.violationsTableSkeleton)}
            rowCount={10}
            columnCount={5}
          />
        </div>
      );

    if(violationsError)
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ErrorMessage />
      );

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Violations hasPolicies={policiesData?.length} violations={violationsData??[]} />
    );
  };

  function renderContent() {
    if (!activeTeam) {
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return <Welcome />;
    }

    if (policiesError && insightsError && violationsError) {
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return <ErrorDragon />;
    }
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <RenderInsights />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <RenderPolicies />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <RenderViolations />
      </>
    );
  }

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <TeamSelector activeTeam={activeTeam} handleChangeTeam={handleChangeTeam} teams={teams} />
      {renderContent()}
    </div>
  );
}

export default Overview;
