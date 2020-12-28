import React from "react";
import Graph from "./Graph";
import Info from "./Info";
import { getLineChartData } from "./helpers/formatLineChartData";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './insights.module.scss' or its... Remove this comment to see the full error message
import styles from "./insights.module.scss";

type Props = {
    insights?: any[];
    policies?: any[];
    violations?: any[];
};

function Insights({ insights, violations, policies }: Props) {
  const formatedData = getLineChartData(insights);
  let gatesCount = 0;

  const gatesData = {
    type: "gates",
    title: "Current Gates",
    content: "Software never is perfect and it won’t be. But is that a license to create garbage?",
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    count: policies.reduce((acc, policy) => (gatesCount += policy.stages?.length ?? 0), 0),
  };
  const violationsData = {
    type: "violations",
    title: "Current Violations",
    content: "Code will set you free. Think of this as an opportunity for better code. Drive towards zero.",
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    count: violations.reduce((acc, violation) => (acc += violation?.nbrViolations ?? 0), 0),
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <section className={styles.container}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <h2 className={styles.title}>Insights</h2>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className={styles.contentContainer}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className={styles.tilesContainer}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Info info={gatesData} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Info info={violationsData} />
        </div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className={styles.graphsContainer}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Graph formatedData={formatedData} />
        </div>
      </div>
    </section>
  );
}

export default Insights;
