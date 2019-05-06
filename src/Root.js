import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import App from 'Features/App';

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function Root(props) {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
}

export default hot(Root);
