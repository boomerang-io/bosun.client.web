import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classnames from "classnames";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { Link } from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@car... Remove this comment to see the full error message
import { Close16 } from "@carbon/icons-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './MessageBanner.module.scss' o... Remove this comment to see the full error message
import styles from "./MessageBanner.module.scss";

function NotificationBanner() {
  const [isOpen, setIsOpen] = React.useState(true);

  const closeBanner = () => {
    setIsOpen(false);
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <section className={classnames(styles.container, { [styles.hidden]: !isOpen })} role="alert">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <p className={styles.text}>
        Welcome to Boomerang Bosun! We're excited to have an open source release and hope you enjoy using it. You may
        notice a bug or two. Please don't hesitate to reach out to us on GitHub in the{" "}
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Link href={`https://github.com/boomerang-io`}>boomerang-io</Link> org. Thanks!
      </p>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <button className={styles.button} onClick={closeBanner}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Close16 className={styles.closeIcon} alt="Close message banner" />
      </button>
    </section>
  );
}

export default NotificationBanner;
