import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import cx from "classnames";
// @ts-expect-error ts-migrate(6142) FIXME: Module './EditButtonSvg' was resolved to 'C:/Users... Remove this comment to see the full error message
import EditButton from "./EditButtonSvg";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { isAccessibleEvent } from "@boomerang-io/utils";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './WorkflowEditButton.module.sc... Remove this comment to see the full error message
import styles from "./WorkflowEditButton.module.scss";

type Props = {
    alt?: string;
    className?: string;
    onClick?: (...args: any[]) => any;
};

export default function WorkflowEditButton({ alt = "Workflow edit button", className, onClick, ...rest }: Props) {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <EditButton
      alt={alt}
      className={cx(styles.button, className)}
      onClick={onClick}
      // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      onKeyDown={(e: any) => isAccessibleEvent(e) && onClick(e)}
      role="button"
      tabIndex="0"
      style={{ willChange: "auto" }}
      {...rest}
    />
  );
}
