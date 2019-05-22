import React from "react";
import styles from "./fullPageHeader.module.scss";

export default function FullPageHeader({ children, style }) {
  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
}
