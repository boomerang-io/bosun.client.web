import React, { Component } from "react";
import PropTypes from "prop-types";
// import moment from "moment";
import { Tile } from "carbon-components-react";
import LineChart from "./LineChart";
// import VisLineChart from "./VisLineChart";
// import FilterDropdown from "./FilterDropdown";
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
    // const initialDate = moment("jan, 01 2018");
    // const finalDate = moment();
    // const mockFilterData = [
    //   {value:"all", label:"All"},
    //   {value:"standard", label:"Standard"},
    //   {value:"option1", label:"Option1"},
    //   {value:"option2", label:"Option2"}
    // ];
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
          <div className={styles.filters}>
            {/* <FilterDropdown options={mockFilterData} onChange={()=>console.log("selected")} label="Standards" selectedItem={{}} />
            <FilterDropdown options={mockFilterData} onChange={()=>console.log("selected")} label="From" selectedItem={{}} />
            <FilterDropdown options={mockFilterData} onChange={()=>console.log("selected")} label="To" selectedItem={{}} /> */}
          </div>
        </div>
        <div className={styles.container} data-testid="insights-graph">
          {formatedData.chartData.length > 0 ? (
            <LineChart
              chartData={formatedData.chartData}
              lines={formatedData.lines}
              higherValue={formatedData.higherValue}
            />
          ) : (
            <p>No violations data to de displayed.</p>
          )}
          {/* <VisLineChart /> */}
        </div>
      </Tile>
    );
  }
}

export default Graph;
