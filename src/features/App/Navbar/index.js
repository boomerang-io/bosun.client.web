import React from "react";
import PropTypes from "prop-types";
import {
  UIShell,
  InteriorLeftNav,
  InteriorLeftNavItem,
  InteriorLeftNavList
} from "@boomerang/carbon-addons-boomerang-react";
import { BASE_APPS_ENV_URL, BASE_LAUNCH_ENV_URL, BASE_WWW_ENV_URL } from "Config/platformUrlConfig";
import { BASE_SERVICE_ENV_URL, SERVICE_REQUEST_STATUSES } from "Config/servicesConfig";

const defaultUIShellProps = {
  baseServiceUrl: BASE_SERVICE_ENV_URL,
  renderLogo: true
};

const onMenuClick = ({ isOpen }) => (
  <InteriorLeftNav isOpen={isOpen}>
    <InteriorLeftNavItem
      href={`${BASE_APPS_ENV_URL}/ci/`}
      label="CI"
      baseURL={BASE_LAUNCH_ENV_URL.replace("/stage", "").replace("/dev", "")}
    />
    <InteriorLeftNavItem
      href={`${BASE_APPS_ENV_URL}/scorecard/`}
      label="Scorecard"
      baseURL={BASE_LAUNCH_ENV_URL.replace("/stage", "").replace("/dev", "")}
    />
    <InteriorLeftNavItem
      href={`${BASE_APPS_ENV_URL}/insights/`}
      label="Insights"
      baseURL={BASE_LAUNCH_ENV_URL.replace("/stage", "").replace("/dev", "")}
    />
    <InteriorLeftNavItem
      href={`${BASE_APPS_ENV_URL}/lib/`}
      label="Lib"
      baseURL={BASE_LAUNCH_ENV_URL.replace("/stage", "").replace("/dev", "")}
    />
    <InteriorLeftNavItem
      href={`${BASE_APPS_ENV_URL}/citadel/`}
      label="Citadel"
      baseURL={BASE_LAUNCH_ENV_URL.replace("/stage", "").replace("/dev", "")}
    />
    <InteriorLeftNavList title="Manage">
      <InteriorLeftNavItem
        href={`${BASE_APPS_ENV_URL}/ci/configuration`}
        label="Configurations"
        baseURL={BASE_LAUNCH_ENV_URL.replace("/stage", "").replace("/dev", "")}
      />
      <InteriorLeftNavItem
        href={`${BASE_APPS_ENV_URL}/ci/repositories`}
        label="Repositories"
        baseURL={BASE_LAUNCH_ENV_URL.replace("/stage", "").replace("/dev", "")}
      />
      <InteriorLeftNavItem
        href={`${BASE_APPS_ENV_URL}/ci/component-modes`}
        label="Modes"
        baseURL={BASE_LAUNCH_ENV_URL.replace("/stage", "").replace("/dev", "")}
      />
    </InteriorLeftNavList>
  </InteriorLeftNav>
);

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
    return (
      <UIShell
        {...defaultUIShellProps}
        headerConfig={headerConfig}
        onTutorialClick={handleOnTutorialClick}
        onMenuClick={onMenuClick}
      />
    );
  }

  return <UIShell {...defaultUIShellProps} onMenuClick={onMenuClick} />;
}

export default Navbar;
