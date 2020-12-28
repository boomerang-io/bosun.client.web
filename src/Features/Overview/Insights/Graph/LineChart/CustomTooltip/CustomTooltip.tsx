import React, { Component } from "react";
import "./styles.scss";

type Props = {
    payload?: any[];
};

class CustomTooltip extends Component<Props> {

  renderTooltip = (tooltipFields: any) => {
    return tooltipFields.map((field: any, index: any) => {
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <p key={`${field}-${index}`} className="b-tooltip--data">
          {" "}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <span className="b-tooltip--field">{`${
            field === "passRate" ? "pass rate" : field === "criticalViolations" ? "critical violations" : field
          }: `}</span>
          {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
          {`${this.props.payload[0].payload[field]}`}
        </p>
      );
    });
  };
  render() {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const tooltipFields = this.props.payload.length > 0 ? Object.keys(this.props.payload[0].payload) : null;
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="c-tooltip">
        {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
        {this.props.payload.length > 0 ? <div>{this.renderTooltip(tooltipFields)}</div> : null}
      </div>
    );
  }
}

export default CustomTooltip;
