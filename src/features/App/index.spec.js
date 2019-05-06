import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';

jest.mock('react-router-dom/Route', () => () => <div />);
jest.mock('react-router-dom/NavLink', () => () => <div />);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
