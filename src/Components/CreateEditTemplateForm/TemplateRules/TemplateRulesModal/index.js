import React, { Component } from "react";
import PropTypes from "prop-types";
import { ModalFlow } from "@boomerang-io/carbon-addons-boomerang-react";
import TemplateRulesModalContent from "./TemplateRulesModalContent";
import EditButton from "Components/EditButton";
import { Add32 } from "@carbon/icons-react";
import styles from "./templateRulesModal.module.scss";

class WorkflowProperties extends Component {
  static propTypes = {
    input: PropTypes.object,
    inputsKeys: PropTypes.array,
    isEdit: PropTypes.bool.isRequired
  };

  editTrigger = ({ openModal }) => {
    let output = null;
    this.props.isEdit
      ? (output = <EditButton className={styles.editContainer} onClick={openModal} aria-label="Edit" data-testid="edit-property-trigger" />)
      : (output = (
          <button
            className={styles.createPropertyCard}
            onClick={openModal}
            data-testid="create-new-workflow-input-button"
            type="button"
          >
            <div className={styles.createContainer}>
              <Add32 className={styles.createIcon} aria-label="Add" />
              <p className={styles.createText}>Create a new rule</p>
            </div>
          </button>
        ));
    return output;
  };

  render() {
    const { isEdit } = this.props;

    return (
      <ModalFlow
        confirmModalProps={{
          title: "Are you sure?",
          children: "Your rule will not be saved"
        }}
        modalHeaderProps={{
          title: isEdit ? "Update Rule" : "Create Rule",
          subtitle: isEdit ? "Let's update it" : "Let's create a new one"
        }}
        modalTrigger={this.editTrigger}
      >
        <TemplateRulesModalContent
          createConfig={this.props.createConfig}
          updateConfig={this.props.updateConfig}
          {...this.props}
        />
      </ModalFlow>
    );
  }
}

export default WorkflowProperties;