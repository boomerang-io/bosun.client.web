import React, { Component } from "react";
import "./styles.scss";
import CastleDrawbridgeGraphic from "Assets/svg/castle_drawbridge.svg";

class Welcome extends Component {
  render() {
    return (
      <div className="c-welcome">
        <div className="b-welcome">
          <img className="b-welcome__img" src={CastleDrawbridgeGraphic} alt="Castle Drawbridge" />
          <h1 className="b-welcome__title">
            Welcome to <i>Boomerang Bosun</i>
          </h1>
          <p className="b-welcome__text">Select a team to get started</p>
        </div>
      </div>
    );
  }
}

export default Welcome;
