import React from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import { LeftSideNav, UIShell } from "@boomerang/carbon-addons-boomerang-react";
import { BASE_LAUNCH_ENV_URL } from "config/platformUrlConfig";
import { BASE_SERVICE_ENV_URL } from "config/servicesConfig";
import {
  Apps16,
  Analytics16,
  Home16,
  Locked16,
  Rocket16,
  Document16,
  ReportData16,
  Settings16
} from "@carbon/icons-react";
import { SideNav, SideNavLink, SideNavItems, SideNavMenu, SideNavMenuItem } from "carbon-components-react";
import styles from "./navbar.module.scss";

const ACTIVE_CLASS_NAME = "bx--side-nav__link--current";

const defaultUIShellProps = {
  baseLaunchEnvUrl: BASE_LAUNCH_ENV_URL,
  baseServiceUrl: BASE_SERVICE_ENV_URL,
  renderLogo: true
};

Navbar.propTypes = {
  navigationState: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired
};

function Navbar({ activeTeam, navigationState, userState }) {
  const location = useLocation();
  const activeTeamId = activeTeam?.id;
  return (
    <UIShell
      {...defaultUIShellProps}
      headerConfig={navigationState?.data ?? {}}
      onMenuClick={({ isOpen, onMenuClose }) => (
        <LeftSideNav isOpen={isOpen}>
          <SideNav expanded={isOpen} isChildOfHeader={true}>
            <SideNavItems>
              <SideNavLink large href={`${BASE_LAUNCH_ENV_URL}/cicd/apps/teams/${activeTeamId}`} renderIcon={Home16}>
                Home
              </SideNavLink>
              <div className={styles.divider} />
              <SideNavLink
                large
                href={`${BASE_LAUNCH_ENV_URL}/cicd/apps/teams/${activeTeamId}/components`}
                renderIcon={Apps16}
              >
                Components
              </SideNavLink>
              <SideNavLink
                large
                href={`${BASE_LAUNCH_ENV_URL}/cicd/apps/teams/${activeTeamId}/pipelines`}
                renderIcon={Rocket16}
              >
                Pipelines
              </SideNavLink>
              <SideNavLink
                large
                href={`${BASE_LAUNCH_ENV_URL}/cicd/apps/teams/${activeTeamId}/scorecard`}
                renderIcon={ReportData16}
              >
                Scorecard
              </SideNavLink>
              <SideNavLink
                large
                href={`${BASE_LAUNCH_ENV_URL}/cicd/apps/teams/${activeTeamId}/insights`}
                renderIcon={Analytics16}
              >
                Insights
              </SideNavLink>
              <SideNavLink large href={`${BASE_LAUNCH_ENV_URL}/cicd/apps/lib`} renderIcon={Document16}>
                Lib
              </SideNavLink>
              <SideNavLink
                exact
                large
                activeClassName={ACTIVE_CLASS_NAME}
                element={NavLink}
                isActive={!location.pathname.startsWith("/templates")}
                onClick={onMenuClose}
                renderIcon={Locked16}
                to="/"
              >
                Policies
              </SideNavLink>
              <SideNavMenu large title="Manage" renderIcon={Settings16}>
                <SideNavMenuItem large href={`${BASE_LAUNCH_ENV_URL}/cicd/apps/properties`}>
                  Properties
                </SideNavMenuItem>
                <SideNavMenuItem large href={`${BASE_LAUNCH_ENV_URL}/cicd/apps/teams/${activeTeamId}/team-properties`}>
                  Team Properties
                </SideNavMenuItem>
                <SideNavMenuItem
                  large
                  href={`${BASE_LAUNCH_ENV_URL}/cicd/apps/teams/${activeTeamId}/team-configuration`}
                >
                  Team Configuration
                </SideNavMenuItem>
                <SideNavMenuItem large href={`${BASE_LAUNCH_ENV_URL}/cicd/apps/repositories`}>
                  Repositories
                </SideNavMenuItem>
                <SideNavMenuItem large href={`${BASE_LAUNCH_ENV_URL}/cicd/apps/component-modes`}>
                  Modes
                </SideNavMenuItem>
                <SideNavMenuItem
                  large
                  activeClassName={ACTIVE_CLASS_NAME}
                  element={NavLink}
                  onClick={onMenuClose}
                  to={`/templates`}
                >
                  Policy Templates
                </SideNavMenuItem>
              </SideNavMenu>
            </SideNavItems>
          </SideNav>
        </LeftSideNav>
      )}
      user={userState?.data ?? {}}
    />
  );
}

export default Navbar;
