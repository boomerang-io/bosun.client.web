import React from "react";
import { useMutation, queryCache } from "react-query";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { notify, ToastNotification } from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/CreateEditTemplateF... Remove this comment to see the full error message
import CreateEditTemplateForm from "Components/CreateEditTemplateForm";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Constants' or its correspondin... Remove this comment to see the full error message
import { TEMPLATE_INTERACTION_TYPES } from "Constants";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/appConfig' or its corre... Remove this comment to see the full error message
import { appLink } from "Config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/servicesConfig' or its ... Remove this comment to see the full error message
import { resolver, serviceUrl } from "Config/servicesConfig";

function CreateTemplate(props: any) {
  function navigateBack() {
    props.history.push(appLink.policyTemplates());
  }
  const cancelRequestRef = React.useRef();

  const [createPolicyTemplateMutation] = useMutation(
    (args) => {
      const { promise, cancel } = resolver.postCreatePolicyTemplate(args);
      cancelRequestRef.current = cancel;
      return promise;
    },
    {
      onSuccess: () => queryCache.invalidateQueries(serviceUrl.getTemplates()),
    }
  );

  async function createTemplate(values: any) {
    const valuesToSave = { ...values, rego: btoa(values.rego) };
    try {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ body: any; }' is not assignabl... Remove this comment to see the full error message
      await createPolicyTemplateMutation({body: valuesToSave});
      notify(
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ToastNotification
          kind="success"
          title="Template Created"
          subtitle="Template was successfully created"
        />
      );
      navigateBack();
    } catch (e) {
      notify(
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ToastNotification
          kind="error"
          title="Something's Wrong"
          subtitle="Request to create template failed"
        />
      );
    }

    return false;
  }

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <CreateEditTemplateForm
      navigateBack={navigateBack}
      onSubmit={createTemplate}
      type={TEMPLATE_INTERACTION_TYPES.CREATE}
      onCancel={cancelRequestRef.current}
    />
  );
}

export default CreateTemplate;
