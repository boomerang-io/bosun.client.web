import React, { useState } from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { ComboBox, TextInput, TextArea, Button } from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './policyFormDefinitionSection.... Remove this comment to see the full error message
import styles from "./policyFormDefinitionSection.module.scss";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'uuid... Remove this comment to see the full error message
import uuid from "uuid";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@car... Remove this comment to see the full error message
import { Add16, TrashCan16 } from "@carbon/icons-react";

const INPUT_TYPES = {
  text: { type: "text" },
  password: { type: "password" },
  number: { type: "number" },
  url: { type: "url" },
  email: { type: "email" },
};

const TEXT_AREA_TYPES = {
  textarea: { type: "textarea" },
};

const SELECT_TYPES = {
  select: { type: "select", isMultiselect: false, valueProperty: "value" },
  multiselect: { type: "multiselect", isMultiselect: true, valueProperty: "values" },
};

function determineInput({
  onChange,
  inputs,
  inputData,
  uuid
}: any) {
  const { type, label, key, required, options } = inputData;
  if (Object.keys(INPUT_TYPES).includes(type)) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const config = INPUT_TYPES[type];
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <TextInput
        autoComplete="off"
        id={`${key}-${uuid}`}
        key={key}
        labelText={label}
        name={key}
        onChange={(e: any) => onChange(e, uuid)}
        required={required}
        type={config.type}
        value={inputs[key]}
      />
    );
  }

  if (Object.keys(TEXT_AREA_TYPES).includes(type)) {
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <TextArea
        autoComplete="off"
        id={`${key}-${uuid}`}
        key={key}
        labelText={label}
        name={key}
        onChange={(e: any) => onChange(e, uuid)}
        required={required}
        value={inputs[key]}
      />
    );
  }

  if (Object.keys(SELECT_TYPES).includes(type)) {
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ComboBox
        autoComplete="off"
        id={`${key}-${uuid}`}
        key={key}
        titleText={label}
        initialSelectedItem={inputs[key]}
        items={options}
        onChange={({
          selectedItem
        }: any) => onChange({ target: { name: key, value: selectedItem } }, uuid)}
        required={required}
        type="text"
      />
    );
  }

  return null;
}

function determineInitialState(definition: any, inputs: any) {
  let initialRowsState = [];
  for (let row in inputs) {
    initialRowsState.push({ rules: definition.rules, uuid: row });
  }

  return initialRowsState;
}

function PolicyFormDefinitionSection({
  definition,
  form
}: any) {
  const inputs = form?.inputs?.[definition.key] || {};
  const [rows, setRows] = useState(determineInitialState(definition, inputs));

  function addRow() {
    const newRows = [...rows, { rules: definition.rules, uuid: uuid.v4() }];
    setRows(newRows);
    form.validateRow(definition.key);
  }

  function removeRow(index: any) {
    const rowToRemove = rows[index];
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
    form.removeRow({ definitionKey: definition.key, uuid: rowToRemove.uuid });
  }

  function onChange(e: any, uuid: any) {
    form.setInput({ event: e, definitionKey: definition.key, uuid: uuid });
  }

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <section className={styles.section}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <h2>{definition.name}</h2>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <p>{definition.description}</p>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className={styles.rowsContainer}>
        {rows.map((row, index) => {
          return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.row} key={row.uuid}>
              {row.rules?.map((input: any) => determineInput({
                onChange,
                inputs: inputs[row.uuid] || {},
                inputData: input,
                definitionKey: definition.key,
                uuid: row.uuid,
              })
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              ) ?? <p>No rules found. Check the policy template.</p>}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <button className={styles.delete} onClick={() => removeRow(index)}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <TrashCan16 />
              </button>
            </div>
          );
        })}
      </div>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Button
        kind="ghost"
        iconDescription={"Add Rule"}
        onClick={addRow}
        renderIcon={Add16}
        size="field"
        style={{ marginLeft: "-0.625rem" }}
      >
        Add Rule
      </Button>
    </section>
  );
}

export default PolicyFormDefinitionSection;
