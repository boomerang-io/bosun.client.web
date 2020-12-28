import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { ConfirmModal } from "@boomerang-io/carbon-addons-boomerang-react";
import TemplateRulesModal from "./TemplateRulesModal";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/CloseButton' or its... Remove this comment to see the full error message
import CloseButton from "Components/CloseButton";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './templateRules.module.scss' o... Remove this comment to see the full error message
import styles from "./templateRules.module.scss";

function RulePropertyRow({
  title,
  value
}: any) {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <dl className={styles.fieldContainer}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <dt className={styles.fieldKey}>{title}</dt>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <dd className={styles.fieldValue}>{value}</dd>
    </dl>
  );
}

function RulePropertyHeader({
  label,
  description
}: any) {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.headerContainer}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <h1 className={styles.label}>{label}</h1>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <p className={styles.description}>{description}</p>
    </div>
  );
}

function formatDefaultValue(value: any) {
  if (!value) {
    return "---";
  }
  return value;
}

type TemplateRulesProps = {
    arrayHelpers: any;
    inputs?: any[];
    rules?: any[];
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'inputsKeys' does not exist on type 'Temp... Remove this comment to see the full error message
export default function TemplateRules({ arrayHelpers, rules = [], inputsKeys = [] }: TemplateRulesProps) {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.propertyList}>
      {rules.length > 0 &&
        rules.map((input, index) => (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <section key={`${input.id}-${index}`} className={styles.property}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <RulePropertyHeader label={input.label} description={input.description} />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <RulePropertyRow title="Key" value={input.key} />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <RulePropertyRow title="Type" value={input.type} />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <RulePropertyRow title="Default value" value={formatDefaultValue(input.defaultValue)} />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <RulePropertyRow title="Options" value={formatDefaultValue(input.options?.join(", "))} />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <TemplateRulesModal
              isEdit
              inputsKeys={inputsKeys.filter((inputName: any) => inputName !== input.key)}
              input={input}
              updateConfig={(values: any) => arrayHelpers.replace(index, values)}
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ConfirmModal
              affirmativeAction={() => {
                arrayHelpers.remove(index);
              }}
              affirmativeButtonProps={{ kind: "danger" }}
              children="It will be gone once you save."
              title="Delete This Property?"
              modalTrigger={({
                openModal
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              }: any) => <CloseButton className={styles.deleteProperty} onClick={openModal} />}
            />
          </section>
        ))}
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <TemplateRulesModal isEdit={false} inputsKeys={inputsKeys} createConfig={arrayHelpers.push} />
    </div>
  );
}
