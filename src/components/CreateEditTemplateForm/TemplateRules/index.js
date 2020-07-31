import React from "react";
import PropTypes from "prop-types";
import { ConfirmModal } from "@boomerang-io/carbon-addons-boomerang-react";
import TemplateRulesModal from "./TemplateRulesModal";
import CloseButton from "components/CloseButton";
import styles from "./templateRules.module.scss";

TemplateRules.propTypes = {
  arrayHelpers: PropTypes.object.isRequired,
  inputs: PropTypes.array,
  rules: PropTypes.array
};

function RulePropertyRow({ title, value }) {
  return (
    <dl className={styles.fieldContainer}>
      <dt className={styles.fieldKey}>{title}</dt>
      <dd className={styles.fieldValue}>{value}</dd>
    </dl>
  );
}

function RulePropertyHeader({ label, description }) {
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

export default function TemplateRules({ arrayHelpers, rules = [], inputsKeys = [] }) {
  return (
    <div className={styles.propertyList}>
      {rules.length > 0 &&
        rules.map((input, index) => (
          <section key={`${input.id}-${index}`} className={styles.property}>
            <RulePropertyHeader label={input.label} description={input.description} />
            <RulePropertyRow title="Key" value={input.key} />
            <RulePropertyRow title="Type" value={input.type} />
            <RulePropertyRow title="Default value" value={formatDefaultValue(input.defaultValue)} />
            <RulePropertyRow title="Options" value={formatDefaultValue(input.options?.join(", "))} />
            <TemplateRulesModal
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
      <TemplateRulesModal isEdit={false} inputsKeys={inputsKeys} createConfig={arrayHelpers.push} />
    </div>
  );
}
