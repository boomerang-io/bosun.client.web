import React from "react";
import { HeaderContainer, Header, HeaderName, SkipToContent } from "carbon-components-react";

function Navbar() {
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="Boomerang">
          <SkipToContent />
          <HeaderName href="" prefix="Boomerang">
            Bosun
          </HeaderName>
        </Header>
      )}
    />
  );
}

export default Navbar;
