import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import cx from "classnames";
// @ts-expect-error ts-migrate(6142) FIXME: Module './NoGraphic.js' was resolved to 'C:/Users/... Remove this comment to see the full error message
import NoGraphic from "./NoGraphic.js";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './noDisplay.module.scss' or it... Remove this comment to see the full error message
import styles from "./noDisplay.module.scss";

const TEXT_LOCATIONS = {
  ABOVE: "above",
  BELOW: "below"
};

type OwnProps = {
    className?: string;
    style?: any;
    text?: string;
    textLocation?: "above" | "below";
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof NoDisplay.defaultProps;

// @ts-expect-error ts-migrate(7022) FIXME: 'NoDisplay' implicitly has type 'any' because it d... Remove this comment to see the full error message
const NoDisplay = ({ className, text, textLocation = TEXT_LOCATIONS.BELOW, style, ...rest }: Props) => {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={cx(styles.container, className)} style={style} {...rest}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {textLocation === TEXT_LOCATIONS.ABOVE && <p className={cx(styles.text, styles.above)}>{text}</p>}
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <NoGraphic className={styles.graphic} alt="No content to display" />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {textLocation === TEXT_LOCATIONS.BELOW && <p className={cx(styles.text, styles.below)}>{text}</p>}
    </div>
  );
};

NoDisplay.defaultProps = {
  text: "Nothing to display here"
};

export default NoDisplay;
