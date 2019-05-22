import React from "react";
import NoDisplayComponent from "@boomerang/boomerang-components/lib/NoDisplay";
import styles from "./noDisplay.module.scss";

export default function NoDisplay({ message, style }) {
  return (
    <div className={styles.container}>
      <NoDisplayComponent text="" style={style} />
      <p className={styles.message}>{message}</p>
    </div>
  );
}
