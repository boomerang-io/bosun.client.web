import React from "react";
import PropTypes from "prop-types";
import { HeaderContainer, Header, HeaderName, SkipToContent } from "carbon-components-react";

Navbar.propTypes = {
  navigation: PropTypes.object.isRequired,
  handleOnTutorialClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

function Navbar(props) {
  //const { handleOnTutorialClick, navigation, user } = props;

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="Boomerang">
          <SkipToContent />
          <HeaderName href="/" prefix="Boomerang">
            Bosun
          </HeaderName>
        </Header>
      )}
    />
  );
}

export default Navbar;
