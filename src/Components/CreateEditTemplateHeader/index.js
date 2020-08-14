import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, ConfirmModal } from "@boomerang-io/carbon-addons-boomerang-react";
import FullPageHeader from "Components/FullPageHeader";
import { formatDateTimeString } from "Utils";
import { Add16, Delete16, Save16 } from "@carbon/icons-react";
import { TEMPLATE_INTERACTION_TYPES } from "Constants/";
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
  template: PropTypes.object,
  navigateBack: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.values(TEMPLATE_INTERACTION_TYPES))
};

function CreateEditPolicyHeader({ form, template = {}, navigateBack, type, onCancel }) {
  const config = ACTION_TYPE_CONFIG[type];
  const { isSubmitting, isValid } = form;

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const handleOnCancel = () => {
    if(isSubmitting  && onCancel)
      onCancel();
    else
      navigateBack();
  };

  return (
    <FullPageHeader>
      <div className={styles.content}>
        <div className={styles.info}>
          <h1 className={styles.title}>{`${config.title} Template`}</h1>
          {template.createdDate && (
            <div>
              <p className={styles.metaData}>
                <span className={styles.metaDataLabel}>Created: </span>
                {formatDateTimeString(template.createdDate)}
              </p>
            </div>
          )}
        </div>
        <section className={styles.buttons}>
          <Button className={styles.button} kind="secondary" onClick={handleOnCancel} size="field">
            Cancel
          </Button>
          {type === TEMPLATE_INTERACTION_TYPES.EDIT && template.id && (
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
        <ConfirmModal
          isOpen
          title={`Delete ${template.name}?`}
          negativeText="No"
          affirmativeText="Yes"
          onCloseModal={() => {
            setDeleteModalIsOpen(false);
          }}
          affirmativeButtonProps={{ kind: "danger" }}
          affirmativeAction={() => {
            form.deletePolicy();
            setDeleteModalIsOpen(false);
          }}
        />
      )}
    </FullPageHeader>
  );
}

export default CreateEditPolicyHeader;
