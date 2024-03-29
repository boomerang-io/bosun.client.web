import React from "react";
import { useFeature } from "flagged";
import { NavLink, useLocation } from "react-router-dom";
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
import { appPath } from "Config/appConfig";
import {
  Apps16,
  Analytics16,
  FlowData16,
  Home16,
  Locked16,
  Rocket16,
  Document16,
  ReportData16,
  Settings16,
  SettingsAdjust16,
} from "@carbon/icons-react";
import { FeatureFlag } from "Config/appConfig";
import { PolicyTeam, CICDUser, PlatformNavigation, CICDNavigationItem } from "Types";
import styles from "./navbar.module.scss";

const ACTIVE_CLASS_NAME = "bx--side-nav__link--current";

const navigationIconMap: {
  [k: string]: React.ReactNode;
} = {
  Apps16,
  Home16,
  Rocket16,
  ReportData16,
  Analytics16,
  Document16,
  Locked16,
  SettingsAdjust16,
  FlowData16,
  Settings16,
};

const defaultUIShellProps = {
  appName: "Bosun",
  baseLaunchEnvUrl: BASE_LAUNCH_ENV_URL,
  baseServiceUrl: BASE_SERVICE_ENV_URL,
  renderLogo: true,
};

const skipToContentProps = {
  href: "#content",
};


type Props = {
  activeTeam: PolicyTeam | undefined;
  platformNavigationState: PlatformNavigation | undefined;
  cicdNavigationState: CICDNavigationItem[] | undefined;
  userState: CICDUser | undefined;
};

function Navbar({ activeTeam, platformNavigationState, cicdNavigationState, userState }: Props) {
  const isStandaloneMode = useFeature(FeatureFlag.Standalone);
  const location = useLocation();

  return isStandaloneMode ? (
    <UIShell
      {...defaultUIShellProps}
      productName="Bosun"
      headerConfig={platformNavigationState ?? {}}
        onMenuClick={({ isOpen, onMenuClose }: {isOpen: boolean; onMenuClose: () => void;}) => (
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
      user={userState ?? {}}
      skipToContentProps={skipToContentProps}
    />
  ) : (
    <UIShell
      {...defaultUIShellProps}
      headerConfig={platformNavigationState ?? {}}
      onMenuClick={({ isOpen, onMenuClose }:{isOpen: boolean; onMenuClose: () => void;}) => (
        <LeftSideNav isOpen={isOpen}>
          <SideNav aria-label="Navigation" expanded={isOpen} isChildOfHeader={true}>
            <SideNavItems>
              {Boolean(cicdNavigationState) && <LocalSideNav cicdNavigation={cicdNavigationState} onMenuClose={onMenuClose} />}
            </SideNavItems>
          </SideNav>
        </LeftSideNav>
      )}
    />
  );
}

function LocalSideNav({ onMenuClose, cicdNavigation }:{cicdNavigation?: CICDNavigationItem[] | undefined; onMenuClose: () => void;}) {
  if (!cicdNavigation) {
    return null;
  }

  const sidenav = cicdNavigation.map((item, idx) => {
    const navigationIcon = item?.icon ? navigationIconMap[item.icon] : undefined;
    if (item.childLinks) {
      return (
        <SideNavMenu large title={item.name} renderIcon={navigationIcon}>
          {item.childLinks.map((item: CICDNavigationItem) => {
            const linkTypeProps = getSideNavLinkType(item, onMenuClose);
            return (
              <SideNavMenuItem large renderIcon={navigationIcon} {...linkTypeProps}>
                {item.name}
              </SideNavMenuItem>
            );
          })}
        </SideNavMenu>
      );
    } else {
      const linkTypeProps = getSideNavLinkType(item, onMenuClose);
      const isHomeLink = idx === 0;
      return (
        <>
          <SideNavLink large exact={isHomeLink} renderIcon={navigationIcon} {...linkTypeProps}>
            {item.name}
          </SideNavLink>
          {isHomeLink && <Divider />}
        </>
      );
    }
  });

  return <>{sidenav}</>;
}

interface NavLinkProps {
  activeClassName?: string;
  element?: React.ReactNode;
  href?: string;
  to?: string;
  onClick?(): void;
}

function getSideNavLinkType(navItem: any, onClick: any) {
  let navLinkProps: NavLinkProps = {};

  try {
    const parsedUrl = new URL(navItem.link);
    if (parsedUrl.pathname.startsWith(appPath.root)) {
      navLinkProps.activeClassName = ACTIVE_CLASS_NAME;
      navLinkProps.to = parsedUrl.pathname.replace(appPath.root, "");
      navLinkProps.element = NavLink;
      navLinkProps.onClick = onClick;
    } else {
      navLinkProps.href = navItem.link;
    }
  } catch (e) {
    //no-op
  }

  return navLinkProps;
}

function Divider() {
  return <div className={styles.divider} />;
}

export default Navbar;
