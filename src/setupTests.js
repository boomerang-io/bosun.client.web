import React from "react";
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { render as rtlRender } from "@testing-library/react";
import "jest-dom/extend-expect";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Mock browser storage
const storageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
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

// Custom render function with Provider for redux-connected components
global.renderWithProvider = (ui, { initialState = {}, store = configureStore(initialState), ...options } = {}) => {
  return rtlRender(<Provider store={store}>{ui}</Provider>, options);
};

// Custom render function with Router for components that needs Router
global.renderWithRouter = (
  ui,
  { route = "/", memoryHistory = createMemoryHistory({ initialEntries: [route] }), ...options } = {}
) => {
  return {
    ...rtlRender(<Router history={memoryHistory}>{ui}</Router>, options),
    memoryHistory
  };
};

global.renderWithProviderAndRouter = (
  ui,
  { initialState = {}, route = "/", memoryHistory = createMemoryHistory({ initialEntries: [route] }), ...options } = {}
) => {
  let { store } = options;
  if (!store) {
    store = configureStore(initialState);
  }

  return {
    ...rtlRender(
      <Provider store={store}>
        <Router history={memoryHistory}>{ui}</Router>
      </Provider>,
      options
    ),
    memoryHistory,
    store
  };
};
