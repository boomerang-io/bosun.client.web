import React, { Component } from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { ComposedModal } from "@boomerang-io/carbon-addons-boomerang-react";
import TemplateRulesModalContent from "./TemplateRulesModalContent";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/EditButton' or its ... Remove this comment to see the full error message
import EditButton from "Components/EditButton";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@car... Remove this comment to see the full error message
import { Add32 } from "@carbon/icons-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './templateRulesModal.module.sc... Remove this comment to see the full error message
import styles from "./templateRulesModal.module.scss";
type Props = {
    input?: any;
    inputsKeys?: any[];
    isEdit: boolean;
};
class WorkflowProperties extends Component<Props> {
    editTrigger = ({ openModal }: any) => {
        if (this.props.isEdit) {
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return (<EditButton className={styles.editContainer} onClick={openModal} aria-label="Edit" data-testid="edit-property-trigger"/>);
        }
        else {
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return (<button className={styles.createPropertyCard} onClick={openModal} data-testid="create-new-workflow-input-button" type="button">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className={styles.createContainer}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Add32 className={styles.createIcon} aria-label="Add"/>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p className={styles.createText}>Create a new rule</p>
          </div>
        </button>);
        }
    };
    render() {
        const { isEdit } = this.props;
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return (<ComposedModal modalHeaderProps={{
            title: isEdit ? "Update Rule" : "Create Rule",
            subtitle: isEdit ? "Let's update it" : "Let's create a new one",
        }} modalTrigger={this.editTrigger}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {({ closeModal }: any) => (<TemplateRulesModalContent createConfig={(this.props as any).createConfig} updateConfig={(this.props as any).updateConfig} closeModal={closeModal} {...this.props}/>)}
      </ComposedModal>);
    }
}
export default WorkflowProperties;
