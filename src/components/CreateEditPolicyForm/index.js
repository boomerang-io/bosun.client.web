import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "carbon-components-react";
import PolicyFormDefinitionSection from "./PolicyFormDefinitionSection";
import KingJellyGraphic from "Components/KingJellyGraphic";
import ThanksRoosGraphic from "Components/ThanksRoosGraphic";
import styles from "./createEditPolicyForm.module.scss";

CreateEditPolicyForm.propTypes = {
  definitions: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired
};

export default function CreateEditPolicyForm({ definitions, form }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TextInput labelText="Name" name="name" onChange={form.setName} placeholder="Name" value={form.name} />
        {definitions.map(definition => (
          <PolicyFormDefinitionSection definition={definition} form={form} />
        ))}
      </div>
      <div className={styles.containerGraphics}>
        <KingJellyGraphic className={styles.graphic} />
        {/* <ThanksRoosGraphic className={styles.graphic} /> */}
      </div>
    </div>
  );
}
