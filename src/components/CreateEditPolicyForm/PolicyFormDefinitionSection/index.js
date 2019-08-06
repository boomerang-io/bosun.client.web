import React, { useState } from "react";
import { Button, ComboBox, TextInput, TextArea } from "carbon-components-react";
import styles from "./policyFormDefinitionSection.module.scss";
import uuid from "uuid";
import DeleteIcon from "@carbon/icons-react/lib/delete/16";
//import { shouldFilterItem } from "Utils";

const INPUT_TYPES = {
  text: { type: "text" },
  password: { type: "password" },
  number: { type: "number" },
  url: { type: "url" },
  email: { type: "email" }
};

const TEXT_AREA_TYPES = {
  textarea: { type: "textarea" }
};

const SELECT_TYPES = {
  select: { type: "select", isMultiselect: false, valueProperty: "value" },
  multiselect: { type: "multiselect", isMultiselect: true, valueProperty: "values" }
};

function determineInput({ onChange, inputs, inputData, uuid }) {
  const { type, label, key, required, options } = inputData;

  if (Object.keys(INPUT_TYPES).includes(type)) {
    const config = INPUT_TYPES[type];
    return (
      <TextInput
        id={key}
        key={key}
        label={label}
        name={key}
        onChange={e => onChange(e, uuid)}
        placeholder={label}
        required={required}
        type={config.type}
        value={inputs[key]}
      />
    );
  }

  if (Object.keys(TEXT_AREA_TYPES).includes(type)) {
    return (
      <TextArea
        name={key}
        key={key}
        label={label}
        onChange={e => onChange(e, uuid)}
        placeholder={label}
        required={required}
        value={inputs[key]}
      />
    );
  }

  if (Object.keys(SELECT_TYPES).includes(type)) {
    return (
      <ComboBox
        key={key}
        label={label}
        initialSelectedItem={inputs[key]}
        items={options}
        onChange={({ selectedItem }) => onChange({ target: { name: `${key}`, value: selectedItem } }, uuid)}
        placeholder={label}
        required={required}
        selectedItem={inputs[key]}
        //shouldFilterItem={shouldFilterItem}
      />
    );
  }

  return null;
}

function determineInitialState(definition, inputs) {
  let initialRowsState = [];
  for (let row in inputs) {
    initialRowsState.push({ config: definition.config, uuid: row });
  }

  return initialRowsState;
}

function PolicyFormDefinitionSection({ definition, form }) {
  const inputs = form.inputs[definition.key] || {};
  const [rows, setRows] = useState(determineInitialState(definition, inputs));

  function addRow() {
    const newRows = [...rows, { config: definition.config, uuid: uuid.v4() }];
    setRows(newRows);
    form.validateRow(definition.key);
  }

  function removeRow(index) {
    const rowToRemove = rows[index];
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
    form.removeRow({ definitionKey: definition.key, uuid: rowToRemove.uuid });
  }

  function onChange(e, uuid) {
    form.setInput({ event: e, definitionKey: definition.key, uuid: uuid });
  }

  return (
    <section className={styles.section}>
      <h2>{definition.name}</h2>
      <p>{definition.description}</p>
      <div>
        {rows.map((row, index) => {
          return (
            <div className={styles.row} key={row.uuid}>
              {row.config.map(input =>
                determineInput({
                  onChange,
                  inputs: inputs[row.uuid] || {},
                  inputData: input,
                  definitionKey: definition.key,
                  uuid: row.uuid
                })
              )}
              <button className={styles.delete} onClick={() => removeRow(index)}>
                <DeleteIcon />
              </button>
            </div>
          );
        })}
      </div>
      <Button onClick={addRow}>Add Rule</Button>
    </section>
  );
}

export default PolicyFormDefinitionSection;
