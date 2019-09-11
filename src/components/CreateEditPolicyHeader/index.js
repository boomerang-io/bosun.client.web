import React, { useState } from "react";
import { Button } from "carbon-components-react";
import ConfirmModal from "@boomerang/boomerang-components/lib/ConfirmModal";
import AlertModalWrapper from "@boomerang/boomerang-components/lib/AlertModal";
import FullPageHeader from "Components/FullPageHeader";
import { formatDateTimestamp } from "Utils";
import { Add16, Delete16, Save16 } from "@carbon/icons-react";
import styles from "./createEditPolicyHeader.module.scss";

const ACTION_TYPE_CONFIG = {
  create: {
    title: "Create",
    affirmativeActionVerb: "Create",
    isPerformingActionVerb: "Creating...",
    icon: Add16
  },
  edit: {
    title: "Edit",
    affirmativeActionVerb: "Save",
    isPerformingActionVerb: "Saving...",
    deleteActionVerb: "Delete",
    isDeletingActionVerb: "Deleting...",
    icon: Save16
  }
};

function CreateEditPolicyHeader({ form, policy = {}, navigateBack, type }) {
  const config = ACTION_TYPE_CONFIG[type];
  const { name, errors, isPerformingAffirmativeAction, isDeleting } = form;
  const hasErrors = Object.values(errors).filter(Boolean).length;

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

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
          {type === "edit" && policy.id && (
            <Button
              disabled={isPerformingAffirmativeAction || isDeleting}
              className={styles.button}
              onClick={() => setDeleteModalIsOpen(true)}
              kind="danger"
              renderIcon={Delete16}
              iconDescription="Delete"
              size="field"
            >
              {isDeleting ? config.isDeletingActionVerb : config.deleteActionVerb}
            </Button>
          )}
          <Button className={styles.button} kind="secondary" onClick={navigateBack} size="field">
            Cancel
          </Button>
          <Button
            data-testid="policy-header-affirmative-action"
            disabled={isPerformingAffirmativeAction || isDeleting || !name || !!hasErrors}
            className={styles.button}
            iconDescription={config.title}
            onClick={form.affirmativeAction}
            renderIcon={config.icon}
            type="submit"
            size="field"
          >
            {isPerformingAffirmativeAction ? config.isPerformingActionVerb : config.affirmativeActionVerb}
          </Button>
        </section>
      </div>
      {deleteModalIsOpen && (
        <AlertModalWrapper
          isOpen
          modalProps={{ariaHideApp:false}}
          modalContent={(closeModal, rest) => (
            <ConfirmModal
              closeModal={() => setDeleteModalIsOpen(false)}
              affirmativeAction={() => {
                form.deletePolicy();
                setDeleteModalIsOpen(false);
              }}
              title={`DELETE ${policy.name.toUpperCase()}?`}
              subTitleTop="It will be gone. Forever."
              cancelText="NO"
              affirmativeText="YES"
              theme="bmrg-white"
              {...rest}
            />
          )}
        />
      )}
    </FullPageHeader>
  );
}

export default CreateEditPolicyHeader;
