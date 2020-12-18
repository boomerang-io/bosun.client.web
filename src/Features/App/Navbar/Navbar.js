import React from "react";
import PropTypes from "prop-types";
import { useFeature } from "flagged";
import { NavLink, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  LeftSideNav,
  UIShell,
  SideNavLink,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from "@boomerang-io/carbon-addons-boomerang-react";
import { SideNav } from "carbon-components-react";
import { BASE_LAUNCH_ENV_URL } from "Config/platformUrlConfig";
import { BASE_SERVICE_ENV_URL } from "Config/servicesConfig";
import { appLink, appPath } from "Config/appConfig";
import {
  Apps16,
  Analytics16,
  Home16,
  Locked16,
  Rocket16,
  Document16,
  ReportData16,
  Settings16,
  SettingsAdjust16,
} from "@carbon/icons-react";
import { FeatureFlag } from "Config/appConfig";
import styles from "./navbar.module.scss";

const ACTIVE_CLASS_NAME = "bx--side-nav__link--current";

const defaultUIShellProps = {
  baseLaunchEnvUrl: BASE_LAUNCH_ENV_URL,
  baseServiceUrl: BASE_SERVICE_ENV_URL,
  renderLogo: true,
};

const skipToContentProps = {
  href: "#content",
};

Navbar.propTypes = {
  navigationState: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired,
};

function Navbar({ activeTeam, navigationState, userState }) {
  const isStandaloneMode = useFeature(FeatureFlag.Standalone);
  const location = useLocation();
  const activeTeamId = activeTeam?.id;

  const platformName = navigationState.data?.platform?.platformName ?? "Boomerang";

  return (
    <>
      <Helmet defaultTitle={`Bosun - ${platformName}`} titleTemplate={`%s - ${platformName}`} />
      {isStandaloneMode ? (
        <UIShell
          {...defaultUIShellProps}
          productName="Bosun"
          headerConfig={navigationState.data ?? {}}
          onMenuClick={({ isOpen, onMenuClose }) => (
            <LeftSideNav isOpen={isOpen}>
              <SideNav expanded={isOpen} isChildOfHeader={true}>
                <SideNavItems large>
                  <SideNavLink
                    exact
                    activeClassName={ACTIVE_CLASS_NAME}
                    element={NavLink}
                    isActive={!location.pathname.startsWith(appPath.templates)}
                    onClick={onMenuClose}
                    renderIcon={Rocket16}
                    to="/"
                  >
                    Policies
                  </SideNavLink>
                  <SideNavLink
                    activeClassName={ACTIVE_CLASS_NAME}
                    element={NavLink}
                    onClick={onMenuClose}
                    to={`/templates`}
                    renderIcon={Document16}
                  >
                    Policy Templates
                  </SideNavLink>
                </SideNavItems>
              </SideNav>
            </LeftSideNav>
          )}
          user={userState?.data ?? {}}
          skipToContentProps={skipToContentProps}
        />
      ) : (
        <UIShell
          {...defaultUIShellProps}
          headerConfig={navigationState?.data ?? {}}
          onMenuClick={({ isOpen, onMenuClose }) => (
            <LeftSideNav isOpen={isOpen}>
              <SideNav aria-label="Navigation" expanded={isOpen} isChildOfHeader={true}>
                <SideNavItems>
                  <SideNavLink large href={appLink.home({ activeTeamId })} renderIcon={Home16}>
                    Home
                  </SideNavLink>
                  <div className={styles.divider} />
                  <SideNavLink large href={appLink.components({ activeTeamId })} renderIcon={Apps16}>
                    Components
                  </SideNavLink>
                  <SideNavLink large href={appLink.pipelines({ activeTeamId })} renderIcon={Rocket16}>
                    Pipelines
                  </SideNavLink>
                  <SideNavLink large href={appLink.scorecard({ activeTeamId })} renderIcon={ReportData16}>
                    Scorecard
                  </SideNavLink>
                  <SideNavLink large href={appLink.insights({ activeTeamId })} renderIcon={Analytics16}>
                    Insights
                  </SideNavLink>
                  <SideNavLink large href={appLink.lib()} renderIcon={Document16}>
                    Lib
                  </SideNavLink>
                  <SideNavLink
                    exact
                    large
                    activeClassName={ACTIVE_CLASS_NAME}
                    element={NavLink}
                    isActive={!location.pathname.startsWith(appPath.templates)}
                    onClick={onMenuClose}
                    renderIcon={Locked16}
                    to="/"
                  >
                    Policies
                  </SideNavLink>
                  <SideNavMenu large title="Manage" renderIcon={SettingsAdjust16}>
                    <SideNavMenuItem
                      activeClassName={ACTIVE_CLASS_NAME}
                      element={NavLink}
                      onClick={onMenuClose}
                      to={appLink.policyTemplates()}
                    >
                      Policy Templates
                    </SideNavMenuItem>
                    <SideNavMenuItem href={appLink.teamConfiguration({ activeTeamId })}>
                      Team Configuration
                    </SideNavMenuItem>
                  </SideNavMenu>
                  <SideNavMenu large title="Administer" renderIcon={Settings16}>
                    <SideNavMenuItem href={appLink.componentModes()}>Component Modes</SideNavMenuItem>
                    <SideNavMenuItem href={appLink.properties()}>Properties</SideNavMenuItem>
                    <SideNavMenuItem href={appLink.scmRepositories()}>SCM Repositories</SideNavMenuItem>
                    <SideNavMenuItem href={appLink.settings()}>Settings</SideNavMenuItem>
                    <SideNavMenuItem href={appLink.teamProperties({ activeTeamId })}>Team Properties</SideNavMenuItem>
                  </SideNavMenu>
                </SideNavItems>
              </SideNav>
            </LeftSideNav>
          )}
          user={userState?.data ?? {}}
          skipToContentProps={skipToContentProps}
        />
      )}
    </>
  );
}

export default Navbar;
