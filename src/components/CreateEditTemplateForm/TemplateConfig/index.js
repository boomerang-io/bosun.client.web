import React from "react";
import PropTypes from "prop-types";
import { ConfirmModal } from "@boomerang/carbon-addons-boomerang-react";
import TemplateConfigModal from "./TemplateConfigModal";
import CloseButton from "components/CloseButton";
import styles from "./templateConfig.module.scss";

TemplateConfig.propTypes = {
  inputs: PropTypes.array.isRequired,
  updateWorkflowProperties: PropTypes.func.isRequired,
  workflowActions: PropTypes.object.isRequired
};

function WorkflowPropertyRow({ title, value }) {
  return (
    <dl className={styles.fieldContainer}>
      <dt className={styles.fieldKey}>{title}</dt>
      <dd className={styles.fieldValue}>{value}</dd>
    </dl>
  );
}

function WorkflowPropertyHeader({ label, description }) {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.label}>{label}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

function formatDefaultValue(value) {
  if (!value) {
    return "---";
  }
  return value;
}

export default function TemplateConfig({ arrayHelpers, config, inputsKeys = [] }) {
  return (
    <div className={styles.propertyList}>
      {config.length > 0 &&
        config.map((input, index) => (
          <section key={`${input.id}-${index}`} className={styles.property}>
            <WorkflowPropertyHeader label={input.label} description={input.description} />
            <WorkflowPropertyRow title="Key" value={input.key} />
            <WorkflowPropertyRow title="Type" value={input.type} />
            <WorkflowPropertyRow title="Default value" value={formatDefaultValue(input.defaultValue)} />
            <WorkflowPropertyRow title="Options" value={formatDefaultValue(input.options?.join(", "))} />
            {input.required ? (
              <p className={styles.required}>Required</p>
            ) : (
              <p className={styles.notRequired}>Not required</p>
            )}
            <TemplateConfigModal
              isEdit
              inputsKeys={inputsKeys.filter(inputName => inputName !== input.key)}
              input={input}
              updateConfig={arrayHelpers.replace}
            />
            <ConfirmModal
              affirmativeAction={() => {
                arrayHelpers.remove(index);
              }}
              children="It will be gone once you save."
              title="Delete This Property?"
              modalTrigger={({ openModal }) => <CloseButton className={styles.deleteProperty} onClick={openModal} />}
            />
          </section>
        ))}
      <TemplateConfigModal isEdit={false} inputsKeys={inputsKeys} createConfig={arrayHelpers.push} />
    </div>
  );
}
