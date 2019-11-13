import React from "react";
import { Link } from "react-router-dom";
import {
  HeaderContainer,
  Header,
  HeaderGlobalBar,
  //HeaderGlobalAction,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  SkipToContent
} from "carbon-components-react";
//import { Home16 } from "@carbon/icons-react";

function Navbar() {
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="Boomerang">
          <SkipToContent />

          <HeaderName element={Link} to="/" prefix="Boomerang">
            Bosun
          </HeaderName>
          <HeaderNavigation>
            <HeaderMenuItem element={Link} to="/">
              Overview
            </HeaderMenuItem>
            <HeaderMenuItem element={Link} to="/templates">
              Templates
            </HeaderMenuItem>
          </HeaderNavigation>
          <HeaderGlobalBar></HeaderGlobalBar>
        </Header>
      )}
    />
  );
}

export default Navbar;
