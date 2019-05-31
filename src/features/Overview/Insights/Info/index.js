import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tile } from "carbon-components-react";
import styles from "./info.module.scss";

export class Info extends Component {
  static propTypes = {
    info: PropTypes.object
  };

  render() {
    const { info } = this.props;
    return (
      <Tile
        style={{
          display: "flex",
          width: "100%",
          height: "10rem",
          alignItems: "center",
          padding: "0"
        }}
        data-testid="tile-info"
      >
        <div className={styles.counter} style={{ color: info.type === "gates" ? "#047cc0" : "#ffaa9d" }}>
          {info.count}
        </div>
        <div className={styles.divider}  />
        <div className={styles.text} >
          <h3 className={styles.title} >{info.title}</h3>
          <p className={styles.content} >{info.content}</p>
        </div>
      </Tile>
    );
  }
}

export default Info;
