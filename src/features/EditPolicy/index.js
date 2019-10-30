import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import uuid from "uuid";
import { ToastNotification } from "carbon-components-react";
import { toast } from "react-toastify";
import CreateEditPolicyForm from "components/CreateEditPolicyForm";
import CreateEditPolicyHeader from "components/CreateEditPolicyHeader";
import ErrorDragon from "components/ErrorDragon";
import LoadingAnimation from "components/Loading";
import {
  SERVICE_PRODUCT_DEFINITIONS_PATH,
  SERVICE_PRODUCT_POLICIES_PATH,
  SERVICE_REQUEST_STATUSES
} from "config/servicesConfig";
import { POLICY_INTERACTION_TYPES } from "../../constants";
import styles from "./editPolicy.module.scss";

class EditPolicy extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
  };

  state = {
    error: null,
    isFetching: false,
    isUpdating: false,
    isDeleting: false,
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

  async fetchPolicyData() {
    this.setState({
      isFetching: true
    });
    try {
      const definitionsResponse = await axios.get(SERVICE_PRODUCT_DEFINITIONS_PATH);
      const policyResponse = await axios.get(`${SERVICE_PRODUCT_POLICIES_PATH}/${this.props.match.params.policyId}`);
      this.setState({
        definitions: definitionsResponse.data,
        policy: policyResponse.data,
        name: policyResponse.data.name,
        inputs: this.formatPolicyDataForForm(policyResponse.data, definitionsResponse.data),
        isFetching: false,
        status: SERVICE_REQUEST_STATUSES.SUCCESS
      });
    } catch (e) {
      this.setState({
        error: e,
        isFetching: false,
        status: SERVICE_REQUEST_STATUSES.FAILURE
      });
    }
  }

  updatePolicy = async () => {
    this.setState({
      isUpdating: true
    });
    const { name, inputs, definitions, policy } = this.state;
    let policyObject = {
      id: policy.id,
      name: name,
      teamId: policy.teamId,
      definitions: []
    };

    definitions.forEach(definition => {
      let newDefinition = {
        policyDefinitionId: definition.id
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
      await axios.patch(`${SERVICE_PRODUCT_POLICIES_PATH}/${this.props.match.params.policyId}`, policyObject);
      this.setState({
        isUpdating: false
      });
      toast(
        <ToastNotification kind="success" title="Policy Updated" subtitle="Policy successfully updated" caption="" />
      );
      this.navigateBack();
    } catch (e) {
      this.setState({
        isUpdating: false
      });
      toast(
        <ToastNotification
          kind="error"
          title="Something's Wrong"
          subtitle="Request to update policy failed"
          caption=""
        />
      );
    }
  };

  deletePolicy = async () => {
    this.setState({
      isDeleting: true
    });
    const { policy } = this.state;

    try {
      await axios.delete(`${SERVICE_PRODUCT_POLICIES_PATH}/${policy.id}`);
      this.setState({
        isDeleting: false
      });
      toast(
        <ToastNotification
          kind="success"
          title="Policy deleted"
          subtitle={`Policy ${policy.name} successfully deleted`}
          caption=""
        />
      );
      this.navigateBack();
    } catch (err) {
      this.setState({
        isDeleting: false
      });
      const { data } = err && err.response;
      toast(
        <ToastNotification kind="error" title={`${data.status} - ${data.error}`} subtitle={data.message} caption="" />,
        {
          autoClose: 5000
        }
      );
    }
  };

  // State updates
  setError = error => {
    this.setState(prevState => ({ errors: { ...prevState.errors, ...error } }));
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

  setName = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
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

  /**
   *
   * @param {definitionKey} - key reference to a definition type e.g. static_code_analysis
   */
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
  /**
   * Transform the policy object into shape that can be read by the child form
   * @param {object} policy - policy to read in and create input state from
   * @param {array} definitions - definitions referenced in policy
   * @returns {object} - new state object for "inputs" key
   */
  formatPolicyDataForForm(policy, definitions) {
    const newInputsState = {};
    policy.definitions.forEach(definition => {
      const policyDefinition = definitions.find(
        policyDefinition => policyDefinition.id === definition.policyDefinitionId
      );
      newInputsState[policyDefinition.key] = {};
      const definitionRows = newInputsState[policyDefinition.key];
      definition.rules.forEach(rule => {
        definitionRows[uuid.v4()] = rule;
      });
    });

    return newInputsState;
  }

  navigateBack = () => {
    this.props.history.push(`/${this.props.match.params.teamName}`);
  };

  render() {
    const { name, error, isFetching, isUpdating, isDeleting, status, definitions, inputs, errors } = this.state;
    const form = {
      name,
      inputs,
      errors,
      setName: this.setName,
      setInput: this.setInput,
      setError: this.setError,
      removeRow: this.removeRow,
      validateRow: this.validateRow,
      affirmativeAction: this.updatePolicy,
      deletePolicy: this.deletePolicy,
      isPerformingAffirmativeAction: isUpdating,
      isDeleting
    };

    if (isFetching) {
      return <LoadingAnimation />;
    }

    if (error) {
      return <ErrorDragon />;
    }

    if (status === SERVICE_REQUEST_STATUSES.SUCCESS) {
      return (
        <div className={styles.container}>
          <CreateEditPolicyHeader
            form={form}
            navigateBack={this.navigateBack}
            policy={this.state.policy}
            type={POLICY_INTERACTION_TYPES.EDIT}
          />
          <CreateEditPolicyForm form={form} definitions={definitions} />
        </div>
      );
    }

    return null;
  }
}

export default EditPolicy;
