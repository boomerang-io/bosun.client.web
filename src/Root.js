import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "Features/App";
import { APP_ROOT } from "Config/appConfig";

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <BrowserRouter basename={APP_ROOT}>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
}
