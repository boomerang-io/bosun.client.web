import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import ShipSharks from "./ShipSharks.js";
import styles from "./noDisplay.module.scss";

const TEXT_LOCATIONS = {
  ABOVE: "above",
  BELOW: "below"
};

const NoDisplay = ({ className, text, textLocation = TEXT_LOCATIONS.ABOVE, style, ...rest }) => {
  return (
    <div className={cx(styles.container, className)} style={style} {...rest}>
      {textLocation === TEXT_LOCATIONS.ABOVE && <p className={cx(styles.text, styles.above)}>{text}</p>}
      <ShipSharks className={styles.graphic} alt="No content to display" />
      {textLocation === TEXT_LOCATIONS.BELOW && <p className={cx(styles.text, styles.below)}>{text}</p>}
    </div>
  );
};

NoDisplay.defaultProps = {
  text: "Nothing to display here"
};

NoDisplay.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.string,
  textLocation: PropTypes.oneOf(["above", "below"])
};

export default NoDisplay;
