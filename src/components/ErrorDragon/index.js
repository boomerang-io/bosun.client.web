import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import ErrorGraphic from "./ErrorGraphic.js";
import styles from "./errorDragon.module.scss";

const ErrorDragon = ({ className, style, statusUrl, ...rest }) => {
  return (
    <div className={cx(styles.container, className)} style={style} {...rest}>
      <ErrorGraphic className={styles.graphic} alt="dragon" />
      <h1 className={styles.title}>Don’t lose your daks</h1>
      <p className={styles.text}>Cheers! You found an error. Try reloading the page.</p>
      <p className={styles.text}>And if you could be so kind, please send us a bug report.</p>
    </div>
  );
};

ErrorDragon.defaultProps = {
  className: ""
};

ErrorDragon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  statusUrl: PropTypes.string.isRequired
};

export default ErrorDragon;
