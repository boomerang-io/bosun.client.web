import React from "react";
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { render as rtlRender } from "react-testing-library";
import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

/**
 * Setup store w/ same config we use for the app so things like thunks work
 * The entire store  w/ the root reducer gets created, but its is relatively lightweight if there is no data in it
 * The alternative is passing in the reducer to this function for each test. I prefer this simpler setup.
 */
function rtlReduxRender(ui, { initialState = {} } = {}) {
  const store = configureStore(initialState);
  return {
    ...rtlRender(<Provider store={store}>{ui}</Provider>),
    store
  };
}

function rtlRouterRender(
  ui,
  { route = "/", history = createMemoryHistory({ initialEntries: [route] }), ...options } = {}
) {
  return {
    ...rtlRender(<Router history={history}>{ui}</Router>, options),
    history
  };
}

function rtlReduxRouterRender(
  ui,
  { initialState = {}, route = "/", history = createMemoryHistory({ initialEntries: [route] }), ...options } = {}
) {
  let { store } = options;
  if (!store) {
    store = configureStore(initialState, history);
  }

  return {
    ...rtlRender(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>,
      options
    ),
    history,
    store
  };
}

// RTL globals
// Open question if we want to attach these to the global or required users to import
global.rtlReduxRender = rtlReduxRender;
global.rtlRouterRender = rtlRouterRender;
global.rtlReduxRouterRender = rtlReduxRouterRender;

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Mock browser storage
const storageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = storageMock;
global.sessionStorage = storageMock;

//Dates
const DATE_TO_USE = new Date("Jan 1 2019 00:00:00 UTC");
const _Date = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.UTC = _Date.UTC;
global.Date.parse = _Date.parse;
global.Date.now = _Date.now;

const moment = require.requireActual("moment-timezone");
jest.doMock("moment", () => {
  moment.tz.setDefault("UTC");
  return moment;
});
