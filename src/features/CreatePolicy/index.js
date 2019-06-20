import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { notify, Notification } from "@boomerang/boomerang-components/lib/Notifications";
import LoadingAnimation from "Components/Loading";
import ErrorDragon from "Components/ErrorDragon";
import CreateEditPolicyHeader from "Components/CreateEditPolicyHeader";
import CreateEditPolicyForm from "Components/CreateEditPolicyForm";
import {
  SERVICE_PRODUCT_DEFINITIONS_PATH,
  SERVICE_PRODUCT_POLICIES_PATH,
  SERVICE_REQUEST_STATUSES
} from "Config/servicesConfig";
import styles from "./createPolicy.module.scss";

class CreatePolicy extends React.Component {
  state = {
    error: null,
    isFetching: false,
    isCreating: false,
    policy: null,
    definitions: null,
    status: null,
    errors: {},
    inputs: {},
    name: ""
  };

  componentDidMount() {
    this.fetchPolicyData();
  }

  // Network requests

  async fetchPolicyData() {
    this.setState({
      isFetching: true
    });
    try {
      const response = await axios.get(SERVICE_PRODUCT_DEFINITIONS_PATH);
      this.setState({
        definitions: response.data,
        isFetching: false,
        status: SERVICE_REQUEST_STATUSES.SUCCESS
      });
    } catch (e) {
      console.log(e);
      this.setState({
        error: e,
        isFetching: false,
        status: SERVICE_REQUEST_STATUSES.FAILURE
      });
    }
  }

  createPolicy = async () => {
    this.setState({
      isCreating: true
    });
    const { name, inputs, definitions } = this.state;
    let policyObject = {
      name: name,
      teamId: this.props.appState.activeTeam.id,
      definitions: []
    };

    definitions.forEach(definition => {
      let newDefinition = {
        ciPolicyDefinitionId: definition.id
      };
      let rules = [];
      const definitionRows = inputs[definition.key];
      for (let row in definitionRows) {
        rules.push(definitionRows[row]);
      }
      newDefinition["rules"] = rules;
      policyObject.definitions.push(newDefinition);
    });

    try {
      await axios.post(SERVICE_PRODUCT_POLICIES_PATH, policyObject);
      this.setState({
        isCreating: false
      });
      notify(<Notification type="success" title="Policy Created" message="Policy was successfully created" />);
    } catch (e) {
      console.log(e);
      this.setState({
        isCreating: false
      });
      notify(<Notification type="error" title="Something's Wrong" message="Request to create policy failed" />);
    }
  };

  // State updates

  setError = error => {
    this.setState(prevState => ({ errors: { ...prevState.errors, ...error } }));
  };

  setName = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  setInput = ({ event: e, definitionKey, uuid }) => {
    const { name, value } = e.target;
    this.setState(
      prevState => {
        const prevStateDefinitionRows = prevState.inputs[definitionKey] ? prevState.inputs[definitionKey][uuid] : {};
        return {
          inputs: {
            ...prevState.inputs,
            [definitionKey]: {
              ...prevState.inputs[definitionKey],
              [uuid]: { ...prevStateDefinitionRows, [name]: value }
            }
          }
        };
      },
      () => this.validateRow(definitionKey)
    );
  };

  removeRow = ({ definitionKey, uuid }) => {
    let definitionRows = { ...this.state.inputs[definitionKey] };
    if (definitionRows) {
      delete definitionRows[uuid];
      this.setState(
        prevState => ({
          inputs: { ...prevState.inputs, [definitionKey]: definitionRows }
        }),
        () => this.validateRow(definitionKey)
      );
    }
  };

  validateRow = definitionKey => {
    const { definitions, inputs } = this.state;
    const definitionRows = inputs[definitionKey] || {};
    const definitionRowsInputCount = Object.keys(definitionRows).reduce((accum, uuid) => {
      const inputCount = Object.values(definitionRows[uuid]).filter(Boolean).length;
      accum += inputCount;
      return accum;
    }, 0);

    // Each row should have the same number of inputs as the number of inputs in the policy definition config
    const matchingDefintion = definitions.find(definition => definition.key === definitionKey);
    const isInvalid = Object.keys(definitionRows).length * matchingDefintion.config.length !== definitionRowsInputCount;
    this.setState(prevState => ({ errors: { ...prevState.errors, [definitionKey]: isInvalid } }));
  };

  // Local methods

  navigateBack = () => {
    this.props.history.push(`/${this.props.match.params.teamName}`);
  };

  render() {
    const { name, error, isFetching, isCreating, status, definitions, inputs, errors } = this.state;
    const form = {
      name,
      inputs,
      errors,
      setName: this.setName,
      setInput: this.setInput,
      setError: this.setError,
      removeRow: this.removeRow,
      validateRow: this.validateRow,
      affirmativeAction: this.createPolicy,
      isPerformingAffirmativeAction: isCreating
    };

    if (isFetching) {
      return <LoadingAnimation theme="bmrg-white" />;
    }

    if (error) {
      return <ErrorDragon />;
    }

    if (status === SERVICE_REQUEST_STATUSES.SUCCESS) {
      return (
        <div className={styles.container}>
          <CreateEditPolicyHeader form={form} navigateBack={this.navigateBack} type="create" />
          <CreateEditPolicyForm form={form} definitions={definitions} />
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  appState: state.app
});

export default connect(
  mapStateToProps,
  null
)(CreatePolicy);
