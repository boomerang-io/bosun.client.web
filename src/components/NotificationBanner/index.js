import React, { Component } from "react";
import classnames from "classnames";
import Link from "@boomerang/boomerang-components/lib/Link";
import close from "Assets/svg/close.svg";
import "./styles.scss";

const SLACK_TEAM_ID = "T27TLPNS1";
const SLACK_BRMG_USERS_CHANNEL_ID = "C4AANAGTS";

class NotificationBanner extends Component {
  state = {
    isOpen: true
  };

  closeBanner = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <div className={classnames("b-notification-banner", { "--hidden": !this.state.isOpen })}>
        <div className="b-notification-banner__text">
          Welcome to Boomerang Citadel! We're excited to have an alpha release and hope you enjoy using it. You may
          notice a bug or two. Please don't hesitate to reach out to us on Slack in{" "}
          {<Link href={`slack://channel?team=${SLACK_TEAM_ID}&id=${SLACK_BRMG_USERS_CHANNEL_ID}`}>@bmrg-users</Link>}.
          Thanks!
        </div>
        <button className="b-notification-banner__button" onClick={this.closeBanner}>
          <img src={close} className="b-notification-banner__close-icon" alt="Close" />
        </button>
      </div>
    );
  }
}

export default NotificationBanner;
