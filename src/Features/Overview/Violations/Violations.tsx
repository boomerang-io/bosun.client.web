import React from "react";
import ViolationsTable from "./ViolationsTable";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './violations.module.scss' or i... Remove this comment to see the full error message
import styles from "./violations.module.scss";

type Props = {
    violations?: any[];
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'hasPolicies' does not exist on type 'Pro... Remove this comment to see the full error message
export function Violations({ hasPolicies, violations }: Props) {
  if (hasPolicies) {
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <section className={styles.container} data-testid="violations-container" id="violations-container">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <h2 className={styles.title}>{`Violations (${violations.reduce(
          (acc, violation) => (acc += violation.nbrViolations),
          0
        )})`}</h2>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <p className={styles.message}>
          Compliance is logged for the latest version of a component in a specific stage per policy.
        </p>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ViolationsTable violations={violations} />
      </section>
    );
  }

  return null;
}

export default Violations;
