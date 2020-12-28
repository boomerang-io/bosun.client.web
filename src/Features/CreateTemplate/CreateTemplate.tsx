import React from "react";
import { useMutation, queryCache } from "react-query";
import { Helmet } from "react-helmet";
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
      await createPolicyTemplateMutation({ body: valuesToSave });
      notify(
        <ToastNotification kind="success" title="Template Created" subtitle="Template was successfully created" />
      );
      navigateBack();
    } catch (e) {
      notify(<ToastNotification kind="error" title="Something's Wrong" subtitle="Request to create template failed" />);
    }

    return false;
  }

  return (
    <>
      <Helmet>
        <title>Create Template - Bosun Policy Templates</title>
      </Helmet>
      <CreateEditTemplateForm
        navigateBack={navigateBack}
        onSubmit={createTemplate}
        type={TEMPLATE_INTERACTION_TYPES.CREATE}
        onCancel={cancelRequestRef.current}
      />
    </>
  );
}

export default CreateTemplate;
