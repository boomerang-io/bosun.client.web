import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "carbon-components-react";
import FullPageHeader from "components/FullPageHeader";
import { formatDateTimeString } from "utils";
import { Add16, Delete16, Save16 } from "@carbon/icons-react";
import { TEMPLATE_INTERACTION_TYPES } from "../../constants";
import styles from "./createEditPolicyHeader.module.scss";

const ACTION_TYPE_CONFIG = {
  [TEMPLATE_INTERACTION_TYPES.CREATE]: {
    title: "Create",
    affirmativeActionVerb: "Create",
    isPerformingActionVerb: "Creating...",
    icon: Add16
  },
  [TEMPLATE_INTERACTION_TYPES.EDIT]: {
    title: "Edit",
    affirmativeActionVerb: "Save",
    isPerformingActionVerb: "Saving...",
    deleteActionVerb: "Delete",
    isDeletingActionVerb: "Deleting...",
    icon: Save16
  }
};

CreateEditPolicyHeader.propTypes = {
  form: PropTypes.object.isRequired,
  policy: PropTypes.object,
  navigateBack: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.values(TEMPLATE_INTERACTION_TYPES))
};

function CreateEditPolicyHeader({ form, policy = {}, navigateBack, type }) {
  const config = ACTION_TYPE_CONFIG[type];
  const { isSubmitting, isValid } = form;

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  return (
    <FullPageHeader>
      <div className={styles.content}>
        <div className={styles.info}>
          <h1 className={styles.title}>{`${config.title} Template`}</h1>
          {policy.createdDate && (
            <div>
              <p className={styles.metaData}>
                <span className={styles.metaDataLabel}>Created: </span>
                {formatDateTimeString(policy.createdDate)}
              </p>
            </div>
          )}
        </div>
        <section className={styles.buttons}>
          <Button className={styles.button} kind="secondary" onClick={navigateBack} size="field">
            Cancel
          </Button>
          {type === TEMPLATE_INTERACTION_TYPES.EDIT && policy.id && (
            <Button
              disabled={isSubmitting}
              className={styles.button}
              onClick={() => setDeleteModalIsOpen(true)}
              kind="danger"
              renderIcon={Delete16}
              iconDescription="Delete"
              size="field"
            >
              {isSubmitting ? config.isDeletingActionVerb : config.deleteActionVerb}
            </Button>
          )}
          <Button
            data-testid="policy-header-affirmative-action"
            disabled={isSubmitting || !isValid}
            className={styles.button}
            iconDescription={config.title}
            onClick={form.affirmativeAction}
            renderIcon={config.icon}
            type="submit"
            size="field"
          >
            {isSubmitting ? config.isPerformingActionVerb : config.affirmativeActionVerb}
          </Button>
        </section>
      </div>
      {deleteModalIsOpen && (
        <Modal
          danger
          open
          shouldSubmitOnEnter
          className={styles.deleteConfirmModal}
          modalHeading={`Delete ${policy.name}?`}
          primaryButtonText="Yes"
          secondaryButtonText="No"
          onRequestClose={() => setDeleteModalIsOpen(false)}
          onSecondarySubmit={() => setDeleteModalIsOpen(false)}
          onRequestSubmit={() => {
            form.deletePolicy();
            setDeleteModalIsOpen(false);
          }}
        />
      )}
    </FullPageHeader>
  );
}

export default CreateEditPolicyHeader;
