import React from 'react';
import { render } from 'react-dom';
import configureStore, { history } from './store/configureStore';
import 'Styles/index.scss';
import Root from './Root';
import 'Config/axiosGlobalConfig';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

// Setup hot module reloading to improve dev experience
render(
  <Root store={store} history={history} />,
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
