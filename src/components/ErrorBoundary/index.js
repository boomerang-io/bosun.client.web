import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./errorBoundary.module.scss";

class ErrorBoundary extends Component {
  state = {
    error: {},
    hasError: false
  };

  static defaultProps = {
    errorComponent: () => <div>Something went wrong</div>,
    className: styles.container
  };

  static propTypes = {
    className: PropTypes.string,
    errorProps: PropTypes.object,
    style: PropTypes.string
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.error(error, info); //eslint-disable-line
  }

  render() {
    const ErrorComponent = this.props.errorComponent;
    if (this.state.hasError) {
      return (
        <div className={this.props.className} style={this.props.style} {...this.props}>
          <ErrorComponent {...this.props.errorProps} />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
