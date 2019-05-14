import React, { useContext } from "react";
import { FormContext, PolicyDefinitionsContext } from "Features/CreatePolicy";
import { TextInput } from "carbon-components-react";
import PolicyFormDefintionSection from "./PolicyFormDefintionSection";
import styles from "./formContent.module.scss";

export default function CreatePolicyFormContent() {
  const policyDefintions = useContext(PolicyDefinitionsContext);
  const { inputs, setInput } = useContext(FormContext);
  return (
    <div className={styles.container}>
      <TextInput name="name" onChange={setInput} placeholder="Name" labelText="Name" />
      {Object.values(policyDefintions).map(definition => (
        <PolicyFormDefintionSection definition={definition} inputs={inputs} setInput={setInput} />
      ))}
    </div>
  );
}
