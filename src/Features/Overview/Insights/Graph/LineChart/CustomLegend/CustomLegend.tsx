import React, { Component } from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { isAccessibleEvent } from "@boomerang-io/utils";
// @ts-expect-error ts-migrate(6142) FIXME: Module './LegendIcon' was resolved to 'C:/Users/Is... Remove this comment to see the full error message
import LegendIcon from "./LegendIcon";
import "./styles.scss";

type Props = {
    payload?: any[];
    toggleItem?: (...args: any[]) => any;
    toggledItems?: any[];
    lastDots?: any[];
};

class CustomLegend extends Component<Props> {

  toggleWithIsAccessibleEventCheck = (e: any, data: any) => {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    isAccessibleEvent(e) && this.props.toggleItem(data);
  };
  render() {
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="c-legend">
        {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
        {this.props.payload.map((data, index) => {
          // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
          let isToggled = this.props.toggledItems.find((item) => data.payload.name === item);
          // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
          let lastDot = this.props.lastDots.find((dot) => dot.key === data.payload.dataKey);
          return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div
              key={`${data.payload.name}-${index}`}
              className="c-legend-icon"
              onClick={(e) => this.toggleWithIsAccessibleEventCheck(e, data)}
              onKeyDown={(e) => this.toggleWithIsAccessibleEventCheck(e, data)}
              role="button"
              // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
              tabIndex="0"
              style={{
                position: "relative",
                left: "2rem",
                top: lastDot ? lastDot.y : "",
                marginTop: "-1.75rem",
                padding: "0.25rem",
              }}
            >
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <LegendIcon className="b-legend-icon" strokeColor={data.payload.stroke} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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

export default CustomLegend;
