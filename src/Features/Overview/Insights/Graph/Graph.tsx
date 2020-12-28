import React, { Component } from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { Tile } from "@boomerang-io/carbon-addons-boomerang-react";
import LineChart from "./LineChart";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './graph.module.scss' or its co... Remove this comment to see the full error message
import styles from "./graph.module.scss";

type Props = {
    formatedData?: any;
};

export class Graph extends Component<Props> {

  state = {
    fromDate: {},
    standard: {},
    toDate: {},
  };

  render() {
    const { formatedData } = this.props;

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Tile
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "spaceBetween",
          minHeight: "10rem",
        }}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className={styles.header}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <h3 className={styles.title}>Violations Trend</h3>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className={styles.filters}></div>
        </div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className={styles.container} data-testid="insights-graph">
          {formatedData.chartData.length > 0 ? (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <LineChart
              chartData={formatedData.chartData}
              lines={formatedData.lines}
              higherValue={formatedData.higherValue}
            />
          ) : (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p>No violations data to be found</p>
          )}
        </div>
      </Tile>
    );
  }
}

export default Graph;
