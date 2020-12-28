import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { Tile } from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './info.module.scss' or its cor... Remove this comment to see the full error message
import styles from "./info.module.scss";

type Props = {
    info?: any;
};
export function Info({ info }: Props) {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Tile
      style={{
        display: "flex",
        width: "100%",
        height: "10rem",
        alignItems: "center",
        padding: "0",
        marginBottom: "1rem",
        marginLeft: info.type === "gates" ? "0" : "1rem",
      }}
      data-testid="tile-info"
    >
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className={styles.counter} style={{ color: info.type === "gates" ? "#047cc0" : "#ffaa9d" }}>
        {info.count}
      </div>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className={styles.divider} />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className={styles.text}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <h3 className={styles.title}>{info.title}</h3>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <p className={styles.content}>{info.content}</p>
      </div>
    </Tile>
  );
}

export default Info;
