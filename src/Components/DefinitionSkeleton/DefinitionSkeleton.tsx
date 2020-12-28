import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { ButtonSkeleton, SkeletonPlaceholder } from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './definitionSkeleton.module.sc... Remove this comment to see the full error message
import styles from "./definitionSkeleton.module.scss";

const DefinitionSkeleton = () => {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.skeletonContainer}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <SkeletonPlaceholder className={styles.titleSkeleton}/>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <SkeletonPlaceholder className={styles.textSkeleton}/>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ButtonSkeleton className={styles.buttonSkeleton}/>
    </div>
  );
};

export default DefinitionSkeleton;
