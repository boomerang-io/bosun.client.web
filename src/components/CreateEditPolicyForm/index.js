import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "@boomerang/carbon-addons-boomerang-react";
import PolicyFormDefinitionSection from "./PolicyFormDefinitionSection";
import KingJellyGraphic from "components/KingJellyGraphic";
//import ThanksRoosGraphic from "components/ThanksRoosGraphic";
import styles from "./createEditPolicyForm.module.scss";

CreateEditPolicyForm.propTypes = {
  definitions: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired
};

export default function CreateEditPolicyForm({ definitions, form }) {
  console.log(definitions, form, "WHAAT" );
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TextInput
          labelText="Name"
          name="name"
          id="name"
          onChange={form.setName}
          placeholder="Name"
          value={form.name}
          type="text"
        />
        {definitions.map(definition => (
          <PolicyFormDefinitionSection key={definition.id + definition.key} definition={definition} form={form} />
        ))}
      </div>
      <div className={styles.containerGraphics}>
        <KingJellyGraphic className={styles.graphic} />
        {/* <ThanksRoosGraphic className={styles.graphic} /> */}
      </div>
    </div>
  );
}
