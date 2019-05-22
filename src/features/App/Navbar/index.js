import React from "react";
import PropTypes from "prop-types";
import { UIShell } from "@boomerang/carbon-addons-boomerang-react";
import { BASE_LAUNCH_ENV_URL } from "Config/platformUrlConfig";
import { BASE_SERVICE_ENV_URL, SERVICE_REQUEST_STATUSES } from "Config/servicesConfig";

const defaultUIShellProps = {
  baseServiceUrl: BASE_SERVICE_ENV_URL,
  renderLogo: true
};

Navbar.propTypes = {
  navigation: PropTypes.object.isRequired,
  handleOnTutorialClick: PropTypes.func.isRequired
};

function Navbar(props) {
  const { handleOnTutorialClick, navigation } = props;

  if (navigation.status === SERVICE_REQUEST_STATUSES.SUCCESS) {
    const navbarLinks = navigation.data.navigation.map(link => {
      // eslint-disable-next-line
      if (link.url) return { ...link, url: link.url.replace("${BASE_LAUNCH_ENV_URL}", BASE_LAUNCH_ENV_URL) };
      else return link;
    });
    const headerConfig = { ...navigation.data, navigation: navbarLinks };
    return <UIShell {...defaultUIShellProps} headerConfig={headerConfig} onTutorialClick={handleOnTutorialClick} />;
  }

  return <UIShell {...defaultUIShellProps} />;
}

export default Navbar;
