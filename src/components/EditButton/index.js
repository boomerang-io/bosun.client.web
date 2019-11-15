import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import EditButton from "./EditButton";
import { isAccessibleEvent } from "utils";
import styles from "./WorkflowEditButton.module.scss";

WorkflowEditButton.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default function WorkflowEditButton({ alt = "Workflow edit button", className, onClick, ...rest }) {
  return (
    <EditButton
      alt={alt}
      className={cx(styles.button, className)}
      onClick={onClick}
      onKeyDown={e => isAccessibleEvent(e) && onClick(e)}
      role="button"
      tabIndex="0"
      style={{ willChange: "auto" }}
      {...rest}
    />
  );
}
