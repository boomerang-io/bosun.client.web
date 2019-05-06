import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import BlogPosts from '../../features/BlogPosts';
import Docs from '../../features/Docs';
import logo from './logo.svg';
import './styles.scss';

class App extends Component {
  render() {
    return (
      <div className="c-app">
        <header className="b-app-header">
          <h1 style={{ marginTop: '4rem' }}>Welcome to Boomerang React</h1>
          <img src={logo} className="b-app-header__logo" alt="Boomerang logo" />
        </header>
        <nav className="c-nav">
          <ul className="b-nav-items">
            <NavLink
              to="/"
              className="b-nav-items__link"
              activeClassName="--active"
              exact
            >
              Home
            </NavLink>
            <NavLink
              to="/blog"
              className="b-nav-items__link"
              activeClassName="--active"
            >
              Blog
            </NavLink>
            <NavLink
              to="/docs"
              className="b-nav-items__link"
              activeClassName="--active"
            >
              Docs
            </NavLink>
          </ul>
        </nav>
        <Route path="/blog" component={BlogPosts} />
        <Route path="/docs" component={Docs} />
      </div>
    );
  }
}

export default App;
