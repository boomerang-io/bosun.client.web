import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Loading } from "carbon-components-react";

/** Loading animation with integrated loading svg, and messages to be randomly selected by default and
 * configurable time to wait to render to prevent flickering on quickly resolved requests */
const LoadingAnimation = ({ centered, className, loading, wait, ...rest }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, wait);

    return () => clearTimeout(timer);
  });

  if (shouldRender && loading) {
    return <Loading {...rest} />;
  }

  return null;
};

LoadingAnimation.defaultProps = {
  centered: false,
  loading: true,
  wait: 200
};

LoadingAnimation.propTypes = {
  centered: PropTypes.bool,
  /** Message to display when loading */
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  loading: PropTypes.bool,
  /** Time to wait in milliseconds before rendering the component */
  wait: PropTypes.number
};

export default LoadingAnimation;
