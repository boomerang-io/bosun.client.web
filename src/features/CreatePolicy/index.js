import React, { useState } from "react";
import axios from "axios";
import Loading from "Components/Loading";
import CreatePolicyForm from "./CreatePolicyForm";
import { SERVICE_REQUEST_STATUSES } from "Config/servicesConfig";

export const PolicyDefinitionsContext = React.createContext([]);
export const FormContext = React.createContext({});

export const PolicyDefinitionsProvider = ({ value, children }) => {
  return <PolicyDefinitionsContext.Provider value={value}>{children}</PolicyDefinitionsContext.Provider>;
};

export const FormProvider = ({ value, children }) => {
  const [inputs, setInputs] = useState(value);
  const [errors, setErrors] = useState({});
  const setInput = e => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const setError = error => setErrors({ ...errors, error });

  return <FormContext.Provider value={{ inputs, setInput, errors, setError }}>{children}</FormContext.Provider>;
};

export default class CreatePolicy extends React.Component {
  state = {
    error: null,
    isFetching: false,
    policyDefintions: null,
    status: null
  };

  componentDidMount() {
    this.fetchPolicyData();
  }

  async fetchPolicyData() {
    this.setState({
      isFetching: true
    });
    try {
      const response = await axios.get("/citadel/policies/definitions");
      this.setState({
        policyDefintions: response.data.reduce((accum, definition) => {
          accum[definition.key] = definition;
          return accum;
        }, {}),
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

  render() {
    const { isFetching, status, policyDefintions, error } = this.state;
    if (isFetching) {
      return <Loading />;
    }

    if (error) {
      return <div>Error</div>;
    }

    if (status === SERVICE_REQUEST_STATUSES.SUCCESS) {
      return (
        <FormProvider value={{}}>
          <PolicyDefinitionsProvider value={policyDefintions}>
            <CreatePolicyForm />
          </PolicyDefinitionsProvider>
        </FormProvider>
      );
    }

    return null;
  }
}
