import React, { Component } from "react";
import PropTypes from "prop-types";
import ViolationsTable from "./ViolationsTable";
import "./styles.scss";

export class Violations extends Component {
  static propTypes = {
    violations: PropTypes.array
  };

  render() {
    const { hasPolicies, violations } = this.props;
    if (hasPolicies) {
      return (
        <div className="c-violations">
          <div className="b-violations-header">
            <h2 className="b-violations-header__title">{`Violations (${violations.reduce(
              (acc, violation) => (acc += violation.violations),
              0
            )})`}</h2>
            <p className="b-violations-header__message">
              Compliance is logged for the latest version of a component in a specific stage per policy.
            </p>
          </div>
          <ViolationsTable violations={violations} />
        </div>
      );
    }

    return null;
  }
}

export default Violations;
