import React from "react";
import "./styles.scss";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Assets/svg/undraw_yacht.svg' o... Remove this comment to see the full error message
import CastleDrawbridgeGraphic from "Assets/svg/undraw_yacht.svg";

function Welcome() {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="c-welcome">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="b-welcome">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <img className="b-welcome__img" src={CastleDrawbridgeGraphic} alt="Castle Drawbridge" />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <h1 className="b-welcome__title">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          Welcome to <span style={{ fontStyle: "italic" }}>Boomerang Bosun</span>
        </h1>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <p className="b-welcome__text">Select a team to get started</p>
      </div>
    </div>
  );
}

export default Welcome;
