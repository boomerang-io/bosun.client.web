import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import cx from "classnames";
// @ts-expect-error ts-migrate(6142) FIXME: Module './CloseButtonSvg' was resolved to 'C:/User... Remove this comment to see the full error message
import CloseButton from "./CloseButtonSvg";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { isAccessibleEvent } from "@boomerang-io/utils";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './WorkflowCloseButton.module.s... Remove this comment to see the full error message
import styles from "./WorkflowCloseButton.module.scss";

type Props = {
    alt?: string;
    className?: string;
    onClick: (...args: any[]) => any;
};

export default function WorkflowCloseButton({ alt = "Workflow close button", className, onClick, ...rest }: Props) {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <CloseButton
      alt={alt}
      className={cx(styles.button, className)}
      onClick={onClick}
      onKeyDown={(e: any) => isAccessibleEvent(e) && onClick(e)}
      role="button"
      tabIndex={0}
      {...rest}
    />
  );
}
