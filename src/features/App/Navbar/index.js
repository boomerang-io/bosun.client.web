import React from "react";
import PropTypes from "prop-types";
import {
  UIShell,
  InteriorLeftNav,
  InteriorLeftNavItem,
  InteriorLeftNavList
} from "@boomerang/carbon-addons-boomerang-react";
import { BASE_APPS_ENV_URL, BASE_LAUNCH_ENV_URL } from "Config/platformUrlConfig";
import { BASE_SERVICE_ENV_URL, SERVICE_REQUEST_STATUSES } from "Config/servicesConfig";

const defaultUIShellProps = {
  baseLaunchEnvUrl: BASE_LAUNCH_ENV_URL,
  baseServiceUrl: BASE_SERVICE_ENV_URL,
  renderLogo: true,
};

const baseLaunchUrl = new URL(BASE_LAUNCH_ENV_URL);
const baseURL = baseLaunchUrl.origin;
const onMenuClick = ({ isOpen }) => (
  <InteriorLeftNav isOpen={isOpen}>
    <InteriorLeftNavItem href={`${BASE_APPS_ENV_URL}/ci/`} label="CI" baseURL={baseURL} />
    <InteriorLeftNavItem href={`${BASE_APPS_ENV_URL}/scorecard/`} label="Scorecard" baseURL={baseURL} />
    <InteriorLeftNavItem href={`${BASE_APPS_ENV_URL}/insights/`} label="Insights" baseURL={baseURL} />
    <InteriorLeftNavItem href={`${BASE_APPS_ENV_URL}/lib/`} label="Lib" baseURL={baseURL} />
    <InteriorLeftNavItem href={`${BASE_APPS_ENV_URL}/citadel/`} label="Citadel" baseURL={baseURL} />
    <InteriorLeftNavList title="Manage">
      <InteriorLeftNavItem href={`${BASE_APPS_ENV_URL}/ci/properties`} label="Properties" baseURL={baseURL} />
      <InteriorLeftNavItem href={`${BASE_APPS_ENV_URL}/ci/team-properties`} label="Team Properties" baseURL={baseURL} />
      <InteriorLeftNavItem href={`${BASE_APPS_ENV_URL}/ci/repositories`} label="Repositories" baseURL={baseURL} />
      <InteriorLeftNavItem href={`${BASE_APPS_ENV_URL}/ci/component-modes`} label="Modes" baseURL={baseURL} />
    </InteriorLeftNavList>
  </InteriorLeftNav>
);

Navbar.propTypes = {
  navigation: PropTypes.object.isRequired,
  handleOnTutorialClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

function Navbar(props) {
  const { handleOnTutorialClick, navigation, user } = props;

  if (navigation.status === SERVICE_REQUEST_STATUSES.SUCCESS) {
    return (
      <UIShell
        {...defaultUIShellProps}
        headerConfig={navigation.data}
        onMenuClick={onMenuClick}
        onTutorialClick={handleOnTutorialClick}
        user={user}
      />
    );
  }

  return <UIShell {...defaultUIShellProps} onMenuClick={onMenuClick} />;
}

export default Navbar;
