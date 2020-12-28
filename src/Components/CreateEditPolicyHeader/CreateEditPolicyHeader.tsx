import React, { useState } from "react";
import {
  Button,
  CodeSnippet,
  ComposedModal,
  ConfirmModal,
  FeatureHeader,
  FeatureHeaderTitle,
  ModalForm,
  ModalFooter,
  ModalBody,
  OrderedList,
  ListItem,
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
} from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Utils' or its corresponding ty... Remove this comment to see the full error message
import { formatDateTimeString } from "Utils";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/servicesConfig' or its ... Remove this comment to see the full error message
import { PRODUCT_SERVICE_ENV_URL } from "Config/servicesConfig";
import copy from "copy-to-clipboard";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@car... Remove this comment to see the full error message
import { Add16, TrashCan16, Save16 } from "@carbon/icons-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Constants/' or its correspondi... Remove this comment to see the full error message
import { POLICY_INTERACTION_TYPES } from "Constants/";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './createEditPolicyHeader.modul... Remove this comment to see the full error message
import styles from "./createEditPolicyHeader.module.scss";

const ACTION_TYPE_CONFIG = {
  [POLICY_INTERACTION_TYPES.CREATE]: {
    title: "Create",
    affirmativeActionVerb: "Create",
    isPerformingActionVerb: "Creating...",
    icon: Add16,
  },
  [POLICY_INTERACTION_TYPES.EDIT]: {
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
    policy?: any;
    navigateBack: (...args: any[]) => any;
    type?: any; // TODO: PropTypes.oneOf(Object.values(POLICY_INTERACTION_TYPES))
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'validateInfo' does not exist on type 'Pr... Remove this comment to see the full error message
function CreateEditPolicyHeader({ form, policy = {}, navigateBack, type, validateInfo, isLoading = false, hasError: hasFetchError, }: Props) {
  const config = ACTION_TYPE_CONFIG[type];
  const { name, errors, isPerformingAffirmativeAction, isDeleting, onCancel } = form;
  const hasErrors = Object.values(errors).filter(Boolean).length;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleOnCancel = () => {
    if ((isPerformingAffirmativeAction || isDeleting) && onCancel) onCancel();
    else navigateBack();
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <FeatureHeader
      includeBorder={false}
      style={{ top: "3rem" }}
      isLoading={isLoading}
      header={
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <FeatureHeaderTitle>{`${config.title} Policy`}</FeatureHeaderTitle>
          {policy.createdDate && !hasFetchError && (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.metadataContainer}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p className={styles.metadata}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <span className={styles.metaDataLabel}>Created: </span>{" "}
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <time>{formatDateTimeString(policy.createdDate)}</time>
              </p>
              {type === POLICY_INTERACTION_TYPES.EDIT && (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <button className={styles.validationInfoButton} onClick={() => setIsDetailsModalOpen(true)}>
                  How do I use this?
                </button>
              )}
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
          {type === POLICY_INTERACTION_TYPES.EDIT && policy.id && (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Button
              disabled={isPerformingAffirmativeAction || isDeleting || Boolean(hasFetchError) || isLoading}
              className={styles.button}
              onClick={() => setIsDeleteModalOpen(true)}
              kind="danger"
              renderIcon={TrashCan16}
              iconDescription="Delete"
              size="field"
            >
              {isDeleting ? config.isDeletingActionVerb : config.deleteActionVerb}
            </Button>
          )}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button
            data-testid="policy-header-affirmative-action"
            disabled={isPerformingAffirmativeAction || isDeleting || !name || Boolean(hasErrors)}
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
      }
    >
      {isDeleteModalOpen && (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ConfirmModal
          isOpen
          title={`Delete ${policy.name}?`}
          negativeText="No"
          affirmativeText="Yes"
          onCloseModal={() => {
            setIsDeleteModalOpen(false);
          }}
          affirmativeButtonProps={{ kind: "danger" }}
          affirmativeAction={() => {
            form.deletePolicy();
            setIsDeleteModalOpen(false);
          }}
        />
      )}
      {type === POLICY_INTERACTION_TYPES.EDIT && (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ComposedModal
          isOpen={isDetailsModalOpen}
          composedModalProps={{ shouldCloseOnOverlayClick: true }}
          onCloseModal={() => setIsDetailsModalOpen(false)}
          modalHeaderProps={{ title: "Validation Guide", subtitle: "How to use this policy" }}
        >
          {() => (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ModalForm>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <ModalBody>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <h2 className={styles.modalSectionTitle}>Validation Endpoint</h2>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <p>{`${PRODUCT_SERVICE_ENV_URL}/policy/validate`}</p>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <h2 className={styles.modalSectionTitle}>Sample Payload</h2>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <CodeSnippet
                  copyButtonDescription="Copy annotations to clipboard"
                  onClick={() => copy(JSON.stringify(validateInfo))}
                  type="multi"
                >
                  {JSON.stringify(validateInfo, null, 1)}
                </CodeSnippet>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <h2 className={styles.modalSectionTitle}>Next Steps (things to adjust)</h2>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <OrderedList className={styles.orderedList}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <ListItem>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    Update <code>ReferenceId</code> to a unique identifier to ensure you can track specific xyz
                  </ListItem>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <ListItem>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    Update <code>ReferenceLink</code> a link back to xyz
                  </ListItem>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <ListItem>
                    Supply{" "}
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <a href="https://github.com/boomerang-io/boomerang.docs/blob/stable/content/bosun.md#labels-required">
                      labels
                    </a>{" "}
                    that can be used by the integrations to integrate and retrieve backend information
                  </ListItem>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <ListItem>Call the validation endpoint with the updated data</ListItem>
                </OrderedList>
              </ModalBody>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <ModalFooter>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Button onClick={() => setIsDetailsModalOpen(false)}>Close</Button>
              </ModalFooter>
            </ModalForm>
          )}
        </ComposedModal>
      )}
    </FeatureHeader>
  );
}

export default CreateEditPolicyHeader;
