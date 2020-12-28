import React, { useCallback, useState, useEffect } from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'uuid... Remove this comment to see the full error message
import uuid from "uuid";
import { useQuery, useMutation, queryCache } from "react-query";
import { Helmet } from "react-helmet";
import {
  notify,
  ToastNotification,
  ErrorMessage,
  TextInputSkeleton,
} from "@boomerang-io/carbon-addons-boomerang-react";
import CreateEditPolicyForm from "Components/CreateEditPolicyForm";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/CreateEditPolicyHea... Remove this comment to see the full error message
import CreateEditPolicyHeader from "Components/CreateEditPolicyHeader";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/DefinitionSkeleton'... Remove this comment to see the full error message
import DefinitionSkeleton from "Components/DefinitionSkeleton";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/servicesConfig' or its ... Remove this comment to see the full error message
import { serviceUrl, resolver } from "Config/servicesConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/appConfig' or its corre... Remove this comment to see the full error message
import { appLink } from "Config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Constants' or its correspondin... Remove this comment to see the full error message
import { POLICY_INTERACTION_TYPES } from "Constants";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './editPolicy.module.scss' or i... Remove this comment to see the full error message
import styles from "./editPolicy.module.scss";

type Props = {
    history?: any;
    match?: any;
};

function EditPolicy({ history, match }: Props) {
  const [inputs, setInputs] = useState();
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const cancelRequestRef = React.useRef();

  const definitionsUrl = serviceUrl.getTemplates();
  const policyUrl = serviceUrl.getPolicy({ policyId: match.params.policyId });
  const validateInfoUrl = serviceUrl.getValidateInfo({ policyId: match.params.policyId });

  const { data: definitionsData, isLoading: definitionsIsLoading, error: definitionsError } = useQuery({
    queryKey: definitionsUrl,
    queryFn: resolver.query(definitionsUrl),
  });
  const { data: policyData, isLoading: policyIsLoading, error: policyError } = useQuery({
    queryKey: policyUrl,
    queryFn: resolver.query(policyUrl),
  });
  const { data: validateInfoData, isLoading: validateInfoIsLoading, error: validateInfoError } = useQuery({
    queryKey: validateInfoUrl,
    queryFn: resolver.query(validateInfoUrl),
  });

  /**
   * Transform the policy object into shape that can be read by the child form
   * @param {object} policy - policy to read in and create input state from
   * @param {array} definitionsData - definitionsData referenced in policy
   * @returns {object} - new state object for "inputs" key
   */
  const formatPolicyDataForForm = useCallback((policyData, definitionsData) => {
    const newInputsState = {};
    policyData.definitions.forEach((definition: any) => {
      const policyDefinition = definitionsData.find(
        (policyDefinition: any) => policyDefinition.id === definition.policyTemplateId
      );
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      newInputsState[policyDefinition.key] = {};
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const definitionRows = newInputsState[policyDefinition.key];
      definition.rules.forEach((rule: any) => {
        definitionRows[uuid.v4()] = rule;
      });
    });
    return newInputsState;
  }, []);

  useEffect(() => {
    if (policyData && definitionsData) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message
      setInputs(formatPolicyDataForForm(policyData, definitionsData));
    }
  }, [formatPolicyDataForForm, policyData, definitionsData]);

  const [updatePolicyMutation, { isLoading: isUpdating }] = useMutation(
    (args) => {
      const { promise, cancel } = resolver.patchUpdatePolicy(args);
      cancelRequestRef.current = cancel;
      return promise;
    },
    {
      onSuccess: () => queryCache.invalidateQueries(definitionsUrl),
    }
  );

  const [deletePolicyMutation, { isLoading: isDeleting }] = useMutation(
    (args) => {
      const { promise, cancel } = resolver.deletePolicy(args);
      cancelRequestRef.current = cancel;
      return promise;
    },
    {
      onSuccess: () => queryCache.invalidateQueries(definitionsUrl),
    }
  );

  const updatePolicy = async () => {
    let policyObject = {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      id: policyData.id,
      name: name,
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      teamId: policyData.teamId,
      definitions: [],
    };

    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    definitionsData.forEach((definition: any) => {
      let newDefinition = {
        policyTemplateId: definition.id,
      };
      let rules = [];
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      const definitionRows = inputs[definition.key];
      for (let row in definitionRows) {
        rules.push(definitionRows[row]);
      }
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      newDefinition["rules"] = rules;
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ policyTemplateId: any; }' is n... Remove this comment to see the full error message
      policyObject.definitions.push(newDefinition);
    });

    try {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ body: { id: any; name: string;... Remove this comment to see the full error message
      await updatePolicyMutation({ body: policyObject, policyId: policyData.id });
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      notify(<ToastNotification kind="success" title="Policy Updated" subtitle="Policy successfully updated" />);
      navigateBack();
    } catch (e) {
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      notify(<ToastNotification kind="error" title="Something's Wrong" subtitle="Request to update policy failed" />);
    }
  };

  const deletePolicy = async () => {
    try {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ policyId: any; }' is not assig... Remove this comment to see the full error message
      await deletePolicyMutation({ policyId: policyData.id });
      notify(
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ToastNotification
          kind="success"
          title="Policy Deleted"
          // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
          subtitle={`Policy ${policyData.name} successfully deleted`}
        />
      );
      navigateBack();
    } catch (err) {
      const { data } = err && err.response;
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      notify(<ToastNotification kind="error" title={`${data.status} - ${data.error}`} subtitle={data.message} />, {
        autoClose: 5000,
      });
    }
  };

  // State updates
  const setError = (error: any) => {
    setErrors((prevState) => ({ ...prevState, ...error }));
  };

  const setInput = async ({
    event: e,
    definitionKey,
    uuid
  }: any) => {
    const { name, value } = e.target;
    await setInputs((prevState) => {
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      const prevStateDefinitionRows = prevState[definitionKey] ? prevState[definitionKey][uuid] : {};
      return {
        // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
        ...prevState,
        [definitionKey]: {
          ...prevState[definitionKey],
          [uuid]: { ...prevStateDefinitionRows, [name]: value },
        },
      };
    });
    validateRow(definitionKey);
  };

  const removeRow = async ({
    definitionKey,
    uuid
  }: any) => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    let definitionRows = { ...inputs[definitionKey] };
    if (definitionRows) {
      delete definitionRows[uuid];
      await setInputs((prevState) => ({
        // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
        ...prevState,
        [definitionKey]: definitionRows,
      }));
      validateRow(definitionKey);
    }
  };

  /**
   *
   * @param {definitionKey} - key reference to a definition type e.g. static_code_analysis
   */
  const validateRow = (definitionKey: any) => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const definitionRows = inputs[definitionKey] || {};
    const definitionRowsInputCount = Object.keys(definitionRows).reduce((accum, uuid) => {
      const inputCount = Object.values(definitionRows[uuid]).filter(Boolean).length;
      accum += inputCount;
      return accum;
    }, 0);

    // Each row should have the same number of inputs as the number of inputs in the policy definition rules
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    const matchingDefintion = definitionsData.find((definition: any) => definition.key === definitionKey);
    const isInvalid = Object.keys(definitionRows).length * matchingDefintion.rules.length !== definitionRowsInputCount;
    setErrors((prevState) => ({ ...prevState, [definitionKey]: isInvalid }));
  };

  useEffect(() => {
    return function cleanup() {
      queryCache.removeQueries(policyUrl, { exact: true });
    };
  }, [policyUrl]);
  // Local methods

  const navigateBack = () => {
    history.push(appLink.teamOverview({ teamId: match.params.teamId }));
  };
  const hasError = definitionsError || policyError || validateInfoError;
  const isLoading = definitionsIsLoading || policyIsLoading || validateInfoIsLoading;

  const form = {
    name,
    inputs,
    errors,
    setName,
    setInput,
    setError,
    removeRow,
    validateRow,
    onCancel: cancelRequestRef.current,
    affirmativeAction: updatePolicy,
    deletePolicy,
    isPerformingAffirmativeAction: isUpdating,
    isDeleting,
  };

  const helmetTitle = policyData?.name ? `${policyData.name} - ` : "";
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      <Helmet>
        <title>{`${helmetTitle}Bosun Policies`}</title>
      </Helmet>
      <CreateEditPolicyHeader
        form={form}
        navigateBack={navigateBack}
        policy={policyData}
        type={POLICY_INTERACTION_TYPES.EDIT}
        validateInfo={validateInfoData}
        isLoading={isLoading}
        hasError={hasError}
      />
      {isLoading ? (
        <div className={styles.skeletonsContainer}>
          <TextInputSkeleton className={styles.textInputSkeleton} />
          <DefinitionSkeleton />
          <DefinitionSkeleton />
          <DefinitionSkeleton />
        </div>
      ) : hasError ? (
        <div style={{ marginTop: "2rem" }}>
          <ErrorMessage />
        </div>
      ) : (
        <CreateEditPolicyForm form={form} definitions={definitionsData} />
      )}
    </div>
  );
}

export default EditPolicy;
