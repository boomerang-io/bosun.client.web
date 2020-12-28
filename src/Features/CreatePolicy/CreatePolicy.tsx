import React, { useState } from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Hooks' or its corresponding ty... Remove this comment to see the full error message
import { useAppContext } from "Hooks";
import { useQuery, useMutation, queryCache } from "react-query";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { notify, ToastNotification, ErrorMessage, TextInputSkeleton } from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/CreateEditPolicyFor... Remove this comment to see the full error message
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
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './createPolicy.module.scss' or... Remove this comment to see the full error message
import styles from "./createPolicy.module.scss";

type Props = {
    history: any;
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Props'.
export function CreatePolicy({ history, match }: Props) {
  const { activeTeam } = useAppContext();

  const definitionsUrl = serviceUrl.getTemplates();
  const { params } = match;

  const [ errors, setErrors ] = useState({});
  const [ inputs, setInputs ] = useState({});
  const [ name, setName ] = useState("");
  const cancelRequestRef = React.useRef();
  
  const { data: definitionsData, isLoading, error } = useQuery({
    queryKey: definitionsUrl,
    queryFn: resolver.query(definitionsUrl)
  });
  
  const [createPolicyMutation, { isLoading: createIsLoading }] = useMutation(
    (args) => {
      const { promise, cancel } = resolver.postCreatePolicy(args);
      cancelRequestRef.current = cancel;
      return promise;
    },
    {
      onSuccess: () => queryCache.invalidateQueries(definitionsUrl),
    }
  );
  const createPolicy = async () => {
    let policyObject = {
      name: name,
      teamId: activeTeam.id,
      definitions: [],
    };

    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    definitionsData.forEach((definition: any) => {
      let newDefinition = {
        policyTemplateId: definition.id,
      };
      let rules = [];
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ body: { name: string; teamId: ... Remove this comment to see the full error message
      await createPolicyMutation({body: policyObject});
      notify(
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ToastNotification
          kind="success"
          title="Policy Created"
          subtitle="Policy was successfully created"
        />
      );
      navigateBack();
    } catch (e) {
      notify(
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ToastNotification
          kind="error"
          title="Something's Wrong"
          subtitle="Request to create policy failed"
        />
      );
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
    await setInputs(
      (prevState) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const prevStateDefinitionRows = prevState[definitionKey] ? prevState[definitionKey][uuid] : {};
        return {
          ...prevState,
          [definitionKey]: {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            ...prevState[definitionKey],
            [uuid]: { ...prevStateDefinitionRows, [name]: value },
          },
        };
      }
    );
    validateRow(definitionKey);
  };

 const removeRow = async ({
   definitionKey,
   uuid
 }: any) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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

const validateRow = (definitionKey: any) => {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
  setErrors((prevState) => ({  ...prevState, [definitionKey]: isInvalid }));
};

  // Local methods

  const navigateBack = () => {
    history.push(appLink.teamOverview({teamId: params.teamId}));
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
      onCancel: cancelRequestRef.current,
      affirmativeAction: createPolicy,
      isPerformingAffirmativeAction: createIsLoading,
    };

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.container}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <CreateEditPolicyHeader form={form} navigateBack={navigateBack} type={POLICY_INTERACTION_TYPES.CREATE} hasError={error}/>
        {isLoading ? 
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.skeletonsContainer}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <TextInputSkeleton className={styles.textInputSkeleton}/>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <DefinitionSkeleton/>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <DefinitionSkeleton/>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <DefinitionSkeleton/>
          </div>
        :
        error ?
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div style={{marginTop: "2rem"}}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ErrorMessage />
          </div>
        :
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <CreateEditPolicyForm form={form} definitions={definitionsData} />
        }
      </div>
    );
  }


export default CreatePolicy;
