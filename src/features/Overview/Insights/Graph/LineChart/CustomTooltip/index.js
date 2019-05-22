import React, { Component } from "react";
import PropTypes from "prop-types";
// import moment from "moment";
// import getHumanizedDuration from "@boomerang/boomerang-utilities/lib/getHumanizedDuration";
import "./styles.scss";

class CustomTooltip extends Component {
  renderTooltip = tooltipFields => {
    return tooltipFields.map((field, index) => {
      return (
        <p key={`${field}-${index}`} className="b-tooltip--data">
          {" "}
          <span className="b-tooltip--field">{`${
            field === "passRate" ? "pass rate" : field === "criticalViolations" ? "critical violations" : field
          }: `}</span>
          {`${this.props.payload[0].payload[field]}`}
        </p>
      );
    });
  };
  render() {
    const tooltipFields = this.props.payload.length > 0 ? Object.keys(this.props.payload[0].payload) : null;
    return (
      <div className="c-tooltip">
        {this.props.payload.length > 0 ? (
          <div>{this.renderTooltip(tooltipFields)}</div>
        ) : null}
      </div>
    );
  }
}

CustomTooltip.propTypes = {
  payload: PropTypes.array
};

export default CustomTooltip;
