import React, { Component } from "react";
import PropTypes from "prop-types";
import NoDisplay from "Components/NoDisplay";
import { Button } from "carbon-components-react";
import { withRouter } from "react-router-dom";
import PoliciesTable from "./PoliciesTable";
import "./styles.scss";

export class Policies extends Component {
  static propTypes = {
    policies: PropTypes.array
  };

  render() {
    const { policies } = this.props;
    
    return (
      <div className="c-policies">
        <div className="b-policies-header">
          <h2 className="b-policies-header__title">{`Policies (${policies.length})`}</h2>
          <p className="b-policies-header__message">
            All of your teams policies can be found here. Go forth and define rules to enforce your standards!
          </p>
          <Button
            onClick={() => this.props.history.push(`${this.props.location.pathname}/policy/create`)}
            className="b-policies-header__button"
          >
            Add Policy
          </Button>
        </div>
        {policies.length > 0 ? (
          <PoliciesTable policies={policies} />
        ) : (
          <NoDisplay message="No policies to be found. Add some!" style={{ width: "20rem" }} />
        )}
      </div>
    );
  }
}

export default withRouter(Policies);
