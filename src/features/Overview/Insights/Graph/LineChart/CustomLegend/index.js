import React, { Component } from "react";
import PropTypes from "prop-types";
import { isAccessibleEvent } from "utils";
import LegendIcon from "./LegendIcon";
import "./styles.scss";

class CustomLegend extends Component {
  toggleWithIsAccessibleEventCheck = (e, data) => {
    isAccessibleEvent(e) && this.props.toggleItem(data);
  };
  render() {
    return (
      <div className="c-legend">
        {this.props.payload.map((data, index) => {
          let isToggled = this.props.toggledItems.find(item => data.payload.name === item);
          let lastDot = this.props.lastDots.find(dot => dot.key === data.payload.dataKey);
          return (
            <div
              key={`${data.payload.name}-${index}`}
              className="c-legend-icon"
              onClick={e => this.toggleWithIsAccessibleEventCheck(e, data)}
              onKeyDown={e => this.toggleWithIsAccessibleEventCheck(e, data)}
              role="button"
              tabIndex="0"
              style={{
                position: "relative",
                left: "2rem",
                top: lastDot ? lastDot.y : "",
                marginTop: "-1.75rem",
                padding: "0.25rem"
              }}
            >
              <LegendIcon className="b-legend-icon" strokeColor={data.payload.stroke} />
              <span className={`b-legend-label${isToggled ? " --toggled" : ""}`} key={data.dataKey}>
                {data.payload.name}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

CustomLegend.propTypes = {
  payload: PropTypes.array,
  toggleItem: PropTypes.func,
  toggledItems: PropTypes.array,
  lastDots: PropTypes.array
};

export default CustomLegend;
