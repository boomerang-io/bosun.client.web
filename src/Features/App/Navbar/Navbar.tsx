import React from "react";
import { useFeature } from "flagged";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { NavLink, useLocation } from "react-router-dom";
import {
  LeftSideNav,
  UIShell,
  SideNavLink,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
} from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'carb... Remove this comment to see the full error message
import { SideNav } from "carbon-components-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/platformUrlConfig' or i... Remove this comment to see the full error message
import { BASE_LAUNCH_ENV_URL } from "Config/platformUrlConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/servicesConfig' or its ... Remove this comment to see the full error message
import { BASE_SERVICE_ENV_URL } from "Config/servicesConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/appConfig' or its corre... Remove this comment to see the full error message
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
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@car... Remove this comment to see the full error message
} from "@carbon/icons-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/appConfig' or its corre... Remove this comment to see the full error message
import { FeatureFlag } from "Config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './navbar.module.scss' or its c... Remove this comment to see the full error message
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

type Props = {
    navigationState: any;
    userState: any;
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'activeTeam' does not exist on type 'Prop... Remove this comment to see the full error message
function Navbar({ activeTeam, navigationState, userState }: Props) {
  const isStandaloneMode = useFeature(FeatureFlag.Standalone);
  const location = useLocation();
  const activeTeamId = activeTeam?.id;
  return isStandaloneMode ? (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <UIShell
      {...defaultUIShellProps}
      productName="Bosun"
      headerConfig={navigationState?.data ?? {}}
      onMenuClick={({
        isOpen,
        onMenuClose
      }: any) => (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <LeftSideNav isOpen={isOpen}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <SideNav expanded={isOpen} isChildOfHeader={true}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <SideNavItems large>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <UIShell
      {...defaultUIShellProps}
      headerConfig={navigationState?.data ?? {}}
      onMenuClick={({
        isOpen,
        onMenuClose
      }: any) => (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <LeftSideNav isOpen={isOpen}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <SideNav aria-label="Navigation" expanded={isOpen} isChildOfHeader={true}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <SideNavItems>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <SideNavLink large href={appLink.home({ activeTeamId })} renderIcon={Home16}>
                Home
              </SideNavLink>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <div className={styles.divider} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <SideNavLink large href={appLink.components({ activeTeamId })} renderIcon={Apps16}>
                Components
              </SideNavLink>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <SideNavLink large href={appLink.pipelines({ activeTeamId })} renderIcon={Rocket16}>
                Pipelines
              </SideNavLink>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <SideNavLink large href={appLink.scorecard({ activeTeamId })} renderIcon={ReportData16}>
                Scorecard
              </SideNavLink>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <SideNavLink large href={appLink.insights({ activeTeamId })} renderIcon={Analytics16}>
                Insights
              </SideNavLink>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <SideNavLink large href={appLink.lib()} renderIcon={Document16}>
                Lib
              </SideNavLink>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <SideNavMenu large title="Manage" renderIcon={SettingsAdjust16}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <SideNavMenuItem
                  activeClassName={ACTIVE_CLASS_NAME}
                  element={NavLink}
                  onClick={onMenuClose}
                  to={appLink.policyTemplates()}
                >
                  Policy Templates
                </SideNavMenuItem>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <SideNavMenuItem href={appLink.teamConfiguration({ activeTeamId })}>Team Configuration</SideNavMenuItem>
              </SideNavMenu>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <SideNavMenu large title="Administer" renderIcon={Settings16}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <SideNavMenuItem href={appLink.componentModes()}>Component Modes</SideNavMenuItem>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <SideNavMenuItem href={appLink.properties()}>Properties</SideNavMenuItem>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <SideNavMenuItem href={appLink.scmRepositories()}>SCM Repositories</SideNavMenuItem>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <SideNavMenuItem href={appLink.settings()}>Settings</SideNavMenuItem>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <SideNavMenuItem href={appLink.teamProperties({ activeTeamId })}>Team Properties</SideNavMenuItem>
              </SideNavMenu>
            </SideNavItems>
          </SideNav>
        </LeftSideNav>
      )}
      user={userState?.data ?? {}}
      skipToContentProps={skipToContentProps}
    />
  );
}

export default Navbar;
