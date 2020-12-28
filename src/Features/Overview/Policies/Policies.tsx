import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/NoDisplay' or its c... Remove this comment to see the full error message
import NoDisplay from "Components/NoDisplay";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { Button } from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useHistory } from "react-router-dom";
import PoliciesTable from "./PoliciesTable";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/appConfig' or its corre... Remove this comment to see the full error message
import { appLink } from "Config/appConfig";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@car... Remove this comment to see the full error message
import { Add16 } from "@carbon/icons-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './policies.module.scss' or its... Remove this comment to see the full error message
import styles from "./policies.module.scss";

type Props = {
    policies?: any[];
    activeTeamId?: string;
};

export function Policies({ policies, activeTeamId }: Props) {
  let history = useHistory();
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <section className={styles.container} data-testid="policies-container" id="policies-container">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <h2 className={styles.title}>{`Policies (${policies.length})`}</h2>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <p className={styles.message}>
        All of your teams policies can be found here. Go forth and define rules to enforce your standards!
      </p>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className={styles.button}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button
          data-testid="add-policy-button"
          iconDescription="Create Policy"
          onClick={() => history.push(appLink.createPolicy({teamId: activeTeamId}))}
          renderIcon={Add16}
          size="field"
        >
          Create Policy
        </Button>
      </div>
      {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
      {policies.length > 0 ? (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <PoliciesTable policies={policies} />
      ) : (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <NoDisplay text="No policies found. Go forth and create one or two why don't you?" style={{ width: "20rem" }} />
      )}
    </section>
  );
}

export default Policies;
