import React from "react";
import { FormContext } from "Features/CreatePolicy";
import { Link } from "react-router-dom";
import { Button } from "carbon-components-react";
import styles from "./createPolicyHeader.module.scss";

function Header() {
  const { errors } = React.useContext(FormContext);
  const hasErrors = !!Object.keys(errors).filter(key => !!errors[key]).length;
  return (
    <div className={styles.container}>
      <Link to="/">&#x2190; Back to Policies</Link>
      <div className={styles.content}>
        <h1>Create Policy Definition</h1>
        <section className={styles.buttons}>
          <Button className={styles.button} kind="secondary">
            Cancel
          </Button>
          <Button className={styles.button} kind="danger">
            Delete
          </Button>
          <Button disabled={hasErrors} className={styles.button}>
            Save
          </Button>
        </section>
      </div>
    </div>
  );
}

export default Header;
