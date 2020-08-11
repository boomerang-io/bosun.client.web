import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAppContext } from "Hooks";
import { useQuery, useMutation, queryCache } from "react-query";
import { ErrorDragon, Loading, notify, ToastNotification } from "@boomerang-io/carbon-addons-boomerang-react";
import CreateEditPolicyForm from "Components/CreateEditPolicyForm";
import CreateEditPolicyHeader from "Components/CreateEditPolicyHeader";
import { serviceUrl, resolver } from "Config/servicesConfig";
import { POLICY_INTERACTION_TYPES } from "Constants";
import styles from "./createPolicy.module.scss";

CreatePolicy.propTypes = {
  history: PropTypes.object.isRequired,
};

export function CreatePolicy({history, match}) {
  const { activeTeam } = useAppContext();

  const policiesUrl = serviceUrl.getPolicies();
  const { params } = match;

  const [ errors, setErrors ] = useState({});
  const [ inputs, setInputs ] = useState({});
  const [ name, setName ] = useState("");
  
  const { data: definitionsData, isLoading, error } = useQuery({
    queryKey: policiesUrl,
    queryFn: resolver.query(policiesUrl)
  });
  
  const [createPolicyMutation, { isLoading: createIsLoading }] = useMutation(
    resolver.postCreatePolicy,
    {
      onSuccess: () => queryCache.invalidateQueries(policiesUrl),
    }
  );
  const createPolicy = async () => {
    let policyObject = {
      name: name,
      teamId: activeTeam.id,
      definitions: [],
    };

    definitionsData.forEach((definition) => {
      let newDefinition = {
        policyTemplateId: definition.id,
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
      await createPolicyMutation({body: policyObject});
      notify(
        <ToastNotification
          kind="success"
          title="Policy Created"
          subtitle="Policy was successfully created"
        />
      );
      navigateBack();
    } catch (e) {
      notify(
        <ToastNotification
          kind="error"
          title="Something's Wrong"
          subtitle="Request to create policy failed"
        />
      );
    }
  };

  // State updates

 const setError = (error) => {
    setErrors((prevState) => ({ ...prevState, ...error }));
  };

 const setInput = async ({ event: e, definitionKey, uuid }) => {
    const { name, value } = e.target;
    await setInputs(
      (prevState) => {
        const prevStateDefinitionRows = prevState[definitionKey] ? prevState[definitionKey][uuid] : {};
        return {
          ...prevState,
          [definitionKey]: {
            ...prevState[definitionKey],
            [uuid]: { ...prevStateDefinitionRows, [name]: value },
          },
        };
      }
    );
    validateRow(definitionKey);
  };

 const removeRow = async ({ definitionKey, uuid }) => {
    let definitionRows = { ...inputs[definitionKey] };
    if (definitionRows) {
      delete definitionRows[uuid];
      await setInputs(
        (prevState) => ({
           ...prevState, [definitionKey]: definitionRows
        })
      );
      validateRow(definitionKey);
    }
  };

const validateRow = (definitionKey) => {
  const definitionRows = inputs[definitionKey] || {};
  const definitionRowsInputCount = Object.keys(definitionRows).reduce((accum, uuid) => {
    const inputCount = Object.values(definitionRows[uuid]).filter(Boolean).length;
    accum += inputCount;
    return accum;
  }, 0);

  // Each row should have the same number of inputs as the number of inputs in the policy definition rules
  const matchingDefintion = definitionsData.find((definition) => definition.key === definitionKey);
  const isInvalid = Object.keys(definitionRows).length * matchingDefintion.rules.length !== definitionRowsInputCount;
  setErrors((prevState) => ({  ...prevState, [definitionKey]: isInvalid }));
};

  // Local methods

  const navigateBack = () => {
    history.push(`/teams/${params.teamId}`);
  };

    const form = {
      name,
      inputs,
      errors,
      setName,
      setInput: setInput,
      setError: setError,
      removeRow,
      validateRow,
      affirmativeAction: createPolicy,
      isPerformingAffirmativeAction: createIsLoading,
    };

    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorDragon />;
    }

    if (definitionsData) {
      return (
        <div className={styles.container}>
          {createIsLoading && <Loading />}
          <CreateEditPolicyHeader form={form} navigateBack={navigateBack} type={POLICY_INTERACTION_TYPES.CREATE} />
          <CreateEditPolicyForm form={form} definitions={definitionsData} />
        </div>
      );
    }

    return null;
  }


export default CreatePolicy;
