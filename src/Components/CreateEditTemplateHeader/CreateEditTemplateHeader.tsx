import React, { useState } from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { Button, ConfirmModal, FeatureHeader, FeatureHeaderTitle } from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Utils' or its corresponding ty... Remove this comment to see the full error message
import { formatDateTimeString } from "Utils";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@car... Remove this comment to see the full error message
import { Add16, TrashCan16, Save16 } from "@carbon/icons-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Constants/' or its correspondi... Remove this comment to see the full error message
import { TEMPLATE_INTERACTION_TYPES } from "Constants/";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './createEditPolicyHeader.modul... Remove this comment to see the full error message
import styles from "./createEditPolicyHeader.module.scss";

const ACTION_TYPE_CONFIG = {
  [TEMPLATE_INTERACTION_TYPES.CREATE]: {
    title: "Create",
    affirmativeActionVerb: "Create",
    isPerformingActionVerb: "Creating...",
    icon: Add16,
  },
  [TEMPLATE_INTERACTION_TYPES.EDIT]: {
    title: "Edit",
    affirmativeActionVerb: "Save",
    isPerformingActionVerb: "Saving...",
    deleteActionVerb: "Delete",
    isDeletingActionVerb: "Deleting...",
    icon: Save16,
  },
};

type Props = {
    form: any;
    template?: any;
    navigateBack: (...args: any[]) => any;
    type?: any; // TODO: PropTypes.oneOf(Object.values(TEMPLATE_INTERACTION_TYPES))
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'onCancel' does not exist on type 'Props'... Remove this comment to see the full error message
function CreateEditPolicyHeader({ form = { isSubmitting: false, isValid: false, affirmativeAction: null }, template = {}, navigateBack, type, onCancel, isLoading = false, hasError = false }: Props) {
  const config = ACTION_TYPE_CONFIG[type];
  const { isSubmitting, isValid } = form;

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const handleOnCancel = () => {
    if (isSubmitting && onCancel) onCancel();
    else navigateBack();
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <FeatureHeader
      includeBorder={false}
      header={
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <FeatureHeaderTitle>{`${config.title} Template`}</FeatureHeaderTitle>
          {template.createdDate && (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p className={styles.metaData}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <span className={styles.metaDataLabel}>Created: </span>
                {formatDateTimeString(template.createdDate)}
              </p>
            </div>
          )}
        </>
      }
      actions={
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <section className={styles.buttons}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button className={styles.button} kind="secondary" onClick={handleOnCancel} size="field">
            Cancel
          </Button>
          {type === TEMPLATE_INTERACTION_TYPES.EDIT && template.id && (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Button
              disabled={isSubmitting}
              className={styles.button}
              onClick={() => setDeleteModalIsOpen(true)}
              kind="danger"
              renderIcon={TrashCan16}
              iconDescription="Delete"
              size="field"
            >
              {isSubmitting ? config.isDeletingActionVerb : config.deleteActionVerb}
            </Button>
          )}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button
            data-testid="policy-header-affirmative-action"
            disabled={isSubmitting || !isValid || isLoading || hasError}
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
      }
    >
      {deleteModalIsOpen && (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
    </FeatureHeader>
  );
}

export default CreateEditPolicyHeader;
