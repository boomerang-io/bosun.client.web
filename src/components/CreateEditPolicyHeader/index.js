import React from "react";
import { Button } from "carbon-components-react";
import FullPageHeader from "Components/FullPageHeader";
import { formatDateTimestamp } from "Utils";
import styles from "./createEditPolicyHeader.module.scss";

const ACTION_TYPE_CONFIG = {
  create: {
    title: "Create",
    affirmativeActionVerb: "Create",
    inPerformingActionVerb: "Creating..."
  },
  edit: {
    title: "Edit",
    affirmativeActionVerb: "Save",
    inPerformingActionVerb: "Saving..."
  }
};

function CreateEditPolicyHeader({ form, policy = {}, navigateBack, type }) {
  const config = ACTION_TYPE_CONFIG[type];
  const { name, errors, isPerformingAffirmativeAction } = form;
  const hasErrors = Object.values(errors).filter(Boolean).length;

  return (
    <FullPageHeader>
      <button role="link" className={styles.back} onClick={navigateBack}>
        &#x2190; Back to Policies
      </button>
      <div className={styles.content}>
        <div className={styles.info}>
          <h1 className={styles.title}>{`${config.title} Policy Definitions`}</h1>
          {policy.createdDate && (
            <div>
              <p className={styles.metaData}>
                <span className={styles.metaDataLabel}>Created: </span>
                {formatDateTimestamp(policy.createdDate)}
              </p>
            </div>
          )}
        </div>
        <section className={styles.buttons}>
          <Button className={styles.button} kind="secondary" onClick={navigateBack}>
            Cancel
          </Button>
          <Button
            disabled={isPerformingAffirmativeAction || !name || hasErrors}
            className={styles.button}
            onClick={form.affirmativeAction}
            type="submit"
          >
            {isPerformingAffirmativeAction ? config.inPerformingActionVerb : config.affirmativeActionVerb}
          </Button>
        </section>
      </div>
    </FullPageHeader>
  );
}

export default CreateEditPolicyHeader;
