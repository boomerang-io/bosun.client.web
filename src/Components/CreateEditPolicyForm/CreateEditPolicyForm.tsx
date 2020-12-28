import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { TextInput } from "@boomerang-io/carbon-addons-boomerang-react";
import PolicyFormDefinitionSection from "./PolicyFormDefinitionSection";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import sortBy from "lodash/sortBy";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/KingJellyGraphic' o... Remove this comment to see the full error message
import KingJellyGraphic from "Components/KingJellyGraphic";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './createEditPolicyForm.module.... Remove this comment to see the full error message
import styles from "./createEditPolicyForm.module.scss";

type Props = {
    definitions: any[];
    form: any;
};

export default function CreateEditPolicyForm({ definitions, form }: Props) {
  const sortedDefinitions = React.useMemo(() => sortBy(definitions, "order"), [definitions]);
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className={styles.content}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <TextInput
          labelText="Name"
          name="name"
          id="name"
          onChange={(e: any) => form.setName(e.target.value)}
          placeholder="Name"
          value={form.name}
          type="text"
        />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {sortedDefinitions.map((definition: any) => <PolicyFormDefinitionSection key={definition.id + definition.key} definition={definition} form={form} />)}
      </div>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className={styles.containerGraphics}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <KingJellyGraphic className={styles.graphic} />
        {/* <ThanksRoosGraphic className={styles.graphic} /> */}
      </div>
    </div>
  );
}
