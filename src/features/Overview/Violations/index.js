import React, { Component } from "react";
import PropTypes from "prop-types";
import ViolationsTable from "./ViolationsTable";
import styles from "./violations.module.scss";

export class Violations extends Component {
  static propTypes = {
    violations: PropTypes.array
  };

  render() {
    const { hasPolicies, violations } = this.props;
    if (hasPolicies) {
      return (
        <section className={styles.container} data-testid="violations-container" id="violations-container">
          <h2 className={styles.title}>{`Violations (${violations.reduce(
            (acc, violation) => (acc += violation.nbrViolations),
            0
          )})`}</h2>
          <p className={styles.message}>
            Compliance is logged for the latest version of a component in a specific stage per policy.
          </p>
          <ViolationsTable violations={violations} />
        </section>
      );
    }

    return null;
  }
}

export default Violations;
