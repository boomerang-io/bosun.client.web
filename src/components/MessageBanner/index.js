import React from "react";
import classnames from "classnames";
import { Link } from "carbon-components-react";
import { Close16 } from "@carbon/icons-react";
import styles from "./MessageBanner.module.scss";

const SLACK_TEAM_ID = "T27TLPNS1";
const SLACK_BRMG_USERS_CHANNEL_ID = "C4AANAGTS";

function NotificationBanner() {
  const [isOpen, setIsOpen] = React.useState(true);

  const closeBanner = () => {
    setIsOpen(false);
  };

  return (
    <section className={classnames(styles.container, { [styles.hidden]: !isOpen })} role="alert">
      <p className={styles.text}>
        Welcome to Boomerang Bosun! We're excited to have an alpha release and hope you enjoy using it. You may notice a
        bug or two. Please don't hesitate to reach out to us on Slack in{" "}
        <Link href={`slack://channel?team=${SLACK_TEAM_ID}&id=${SLACK_BRMG_USERS_CHANNEL_ID}`}>@bmrg-users</Link>.
        Thanks!
      </p>
      <button className={styles.button} onClick={closeBanner}>
        <Close16 className={styles.closeIcon} alt="Close message banner" />
      </button>
    </section>
  );
}

export default NotificationBanner;
