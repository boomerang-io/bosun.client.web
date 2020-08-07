import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tile } from "carbon-components-react";
import LineChart from "./LineChart";
import styles from "./graph.module.scss";

export class Graph extends Component {
  static propTypes = {
    formatedData: PropTypes.object
  };

  state = {
    fromDate: {},
    standard: {},
    toDate: {}
  };

  render() {
    const { formatedData } = this.props;

    return (
      <Tile
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "spaceBetween",
          minHeight: "10rem"
        }}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>Violations Trend</h3>
          <div className={styles.filters}></div>
        </div>
        <div className={styles.container} data-testid="insights-graph">
          {formatedData.chartData.length > 0 ? (
            <LineChart
              chartData={formatedData.chartData}
              lines={formatedData.lines}
              higherValue={formatedData.higherValue}
            />
          ) : (
            <p>No violations data to be found</p>
          )}
        </div>
      </Tile>
    );
  }
}

export default Graph;
