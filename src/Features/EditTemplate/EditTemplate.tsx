import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useParams, useHistory, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { notify, ToastNotification } from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/CreateEditTemplateF... Remove this comment to see the full error message
import CreateEditTemplateForm from "Components/CreateEditTemplateForm";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/NoDisplay' or its c... Remove this comment to see the full error message
import NoDisplay from "Components/NoDisplay";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Constants' or its correspondin... Remove this comment to see the full error message
import { TEMPLATE_INTERACTION_TYPES } from "Constants";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/servicesConfig' or its ... Remove this comment to see the full error message
import { serviceUrl, resolver } from "Config/servicesConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/appConfig' or its corre... Remove this comment to see the full error message
import { appLink } from "Config/appConfig";

function EditTemplate(props: any) {
  const history = useHistory();
  function navigateBack() {
    history.push(appLink.policyTemplates());
  }
  const cancelRequestRef = React.useRef();

  function getTakenNamesAndKeys() {
    const templateNames: any = [];
    const templateKeys: any = [];
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    templatesData.forEach((template: any) => {
      if (template.id !== templateId) {
        templateNames.push(template.name);
        templateKeys.push(template.key);
      }
    });

    return { templateNames, templateKeys };
  }

  const { templateId } = useParams();

  const getTemplatesUrl = serviceUrl.getTemplates();
  const { data: templatesData, isLoading, error } = useQuery({
    queryKey: getTemplatesUrl,
    queryFn: resolver.query(getTemplatesUrl)
  });

  const [updatePolicyTemplateMutation] = useMutation(
    (args) => {
      const { promise, cancel } = resolver.patchUpdatePolicyTemplate(args);
      cancelRequestRef.current = cancel;
      return promise;
    },
    {
      onSuccess: () => queryCache.invalidateQueries(serviceUrl.getTemplates()),
    }
  );

  async function updateTemplate(values: any) {
    const valuesToSave = { ...values, rego: btoa(values.rego), id: templateId };
    try {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ templateId: any; body: any; }'... Remove this comment to see the full error message
      await updatePolicyTemplateMutation({templateId, body: valuesToSave});
      notify(
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ToastNotification
          kind="success"
          title="Template Updated"
          subtitle="Template was successfully updated"
        />
      );
      navigateBack();
    } catch (e) {
      notify(
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ToastNotification
          kind="error"
          title="Something's Wrong"
          subtitle="Request to update template failed"
        />
      );
    }

    return false;
  }
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    const template = templatesData?.find((template: any) => template.id === templateId);

    if (template) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
      const validationData = getTakenNamesAndKeys(templatesData);

      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <CreateEditTemplateForm
          onSubmit={updateTemplate}
          navigateBack={navigateBack}
          template={template}
          validationData={validationData}
          type={TEMPLATE_INTERACTION_TYPES.EDIT}
          onCancel={cancelRequestRef.current}
          isLoading={isLoading}
          hasError={error}
        />
      );
    } else if (templatesData) {
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div style={{ textAlign: "center" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <NoDisplay
            text="No matching template found. Are you sure you have the right link?"
            style={{ width: "30rem", marginTop: "10rem" }}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Link to={appLink.policyTemplates()}>Go to Templates</Link>
        </div>
      );
    }
  return null;
}

export default EditTemplate;
