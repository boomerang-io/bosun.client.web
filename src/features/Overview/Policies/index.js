import React from "react";
import PropTypes from "prop-types";
import NoDisplay from "components/NoDisplay";
import { Button } from "carbon-components-react";
import { useHistory, useLocation } from "react-router-dom";
import PoliciesTable from "./PoliciesTable";
import { Add16 } from "@carbon/icons-react";
import styles from "./policies.module.scss";

Policies.propTypes = {
  policies: PropTypes.array
};

export function Policies({ policies }) {
  let history = useHistory();
  let location = useLocation();
  return (
    <section className={styles.container} data-testid="policies-container" id="policies-container">
      <h2 className={styles.title}>{`Policies (${policies.length})`}</h2>
      <p className={styles.message}>
        All of your teams policies can be found here. Go forth and define rules to enforce your standards!
      </p>
      <div className={styles.button}>
        <Button
          data-testid="add-policy-button"
          iconDescription="Add Policy"
          onClick={() => history.push(`${location.pathname}/policy/create`)}
          renderIcon={Add16}
          size="field"
        >
          Add Policy
        </Button>
      </div>
      {policies.length > 0 ? (
        <PoliciesTable policies={policies} />
      ) : (
        <NoDisplay message="No policies to be found. Add some!" style={{ width: "20rem" }} />
      )}
    </section>
  );
}

export default Policies;
