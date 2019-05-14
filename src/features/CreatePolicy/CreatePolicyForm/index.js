import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import FormContent from "./FormContent";
import styles from "./policyForm.module.scss";

export default function CreatePolicyForm() {
  return (
    <div className={styles.container}>
      <Header />
      <FormContent />
    </div>
  );
}
