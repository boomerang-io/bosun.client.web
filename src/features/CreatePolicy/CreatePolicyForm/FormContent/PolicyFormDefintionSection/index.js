import React, { useState, useContext } from "react";
import { FormContext } from "Features/CreatePolicy";
import { Button, DropdownV2, TextInput, TextArea } from "carbon-components-react";
import styles from "./policyFormDefinitionSection.module.scss";
import uuid from "uuid";
import DeleteIcon from "@carbon/icons-react/lib/delete/16";

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

const TOGGLE_TYPES = {
  boolean: { type: "toggle" }
};

const SELECT_TYPES = {
  select: { type: "select", isMultiselect: false, valueProperty: "value" },
  multiselect: { type: "multiselect", isMultiselect: true, valueProperty: "values" }
};

function determineInput({ formContext, definitionKey, inputData, uuid }) {
  const { inputs, setInput, errors, setError } = formContext;
  const { description, type, label, key, required, options } = inputData;

  if (Object.keys(INPUT_TYPES).includes(type)) {
    const config = INPUT_TYPES[type];
    return (
      <TextInput
        id={key}
        name={`${definitionKey}-${key}-${uuid}`}
        key={key}
        label={label}
        required={required}
        type={config.type}
        onChange={setInput}
        placeholder={label}
        value={inputs[`${definitionKey}-${key}-${uuid}`]}
      />
    );
  }

  if (Object.keys(TEXT_AREA_TYPES).includes(type)) {
    return (
      <TextArea
        name={`${definitionKey}-${key}-${uuid}`}
        key={key}
        label={label}
        required={required}
        onChange={setInput}
        placeholder={description}
        value={inputs[`${definitionKey}-${key}-${uuid}`]}
      />
    );
  }

  if (Object.keys(SELECT_TYPES).includes(type)) {
    return (
      <DropdownV2
        key={key}
        label={label}
        required={required}
        items={options}
        onChange={({ selectedItem }) =>
          setInput({ target: { name: `${definitionKey}-${key}-${uuid}`, value: selectedItem } })
        }
        selectedItem={inputs[`${definitionKey}-${key}-${uuid}`]}
      />
    );
  }

  return null;
}

function PolicyFormDefinitionSection({ definition }) {
  const formContext = useContext(FormContext);
  const [rows, setRows] = useState([]);

  function addRow() {
    const newRows = [...rows, { config: definition.config, uuid: uuid.v4() }];
    setRows(newRows);
  }

  function removeRow(idx) {
    const newRows = [...rows];
    newRows.splice(idx, 1);
    setRows(newRows);
  }

  const addedMetrics = Object.keys(formContext.inputs)
    .filter(input => input.startsWith(`${definition.key}-metric`))
    .map(metric => formContext.inputs[metric]);

  const metricOptions = definition.config.find(config => config.key === "metric").options;
  console.log(rows);
  return (
    <form className={styles.form} onSubmit={e => e.preventDefault()}>
      <section className={styles.section}>
        <h1>{definition.name}</h1>
        <p>{definition.description}</p>
        <div>
          {rows.map((row, index) => {
            return (
              <div className={styles.row} key={row.uuid}>
                {row.config.map(input =>
                  determineInput({ formContext, inputData: input, definitionKey: definition.key, uuid: row.uuid })
                )}
                <button className={styles.delete} onClick={() => removeRow(index)}>
                  <DeleteIcon />
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <Button onClick={addRow} type="submit">
        Add Rule
      </Button>
    </form>
  );
}

export default PolicyFormDefinitionSection;

// <DropdownV2
// label="Rule"
// items={definition.rules.map(rule => rule.key)}
// onChange={({ selectedItem }) =>
//   setInput({ target: { name: `${definition.key}.rule`, value: selectedItem } })
// }
// selectedItem={inputs[`${definition.key}.rule`]}
// />

// <DropdownV2
// label="Operator"
// items={policyOperators.map(operator => operator.name)}
// onChange={({ selectedItem }) =>
//   setInput({ target: { name: `${definition.key}.operator`, value: selectedItem } })
// }
// selectedItem={inputs[`${definition.key}.operator`]}
// />
// <TextInput
// id={`${definition.key}.value`}
// name={`${definition.key}.value`}
// onChange={setInput}
// placeholder="value"
// value={inputs[`${definition.key}.value`]}
// />
