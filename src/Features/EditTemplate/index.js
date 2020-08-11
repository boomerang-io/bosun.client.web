import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import { toast } from "react-toastify";
import { Error, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import { ToastNotification } from "carbon-components-react";
import CreateEditTemplateForm from "Components/CreateEditTemplateForm";
import NoDisplay from "Components/NoDisplay";
import { TEMPLATE_INTERACTION_TYPES } from "Constants";
import { serviceUrl, resolver } from "Config/servicesConfig";

function EditTemplate(props) {
  const history = useHistory();
  function navigateBack() {
    history.push("/templates");
  }

  function getTakenNamesAndKeys() {
    const templateNames = [];
    const templateKeys = [];
    templatesData.forEach(template => {
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

  const [updatePolicyTemplateMutation, { isLoading: isUpdating }] = useMutation(
    resolver.patchUpdatePolicyTemplate,
    {
      onSuccess: () => queryCache.invalidateQueries(serviceUrl.getTemplates()),
    }
  );

  async function updateTemplate(values) {
    const valuesToSave = { ...values, rego: btoa(values.rego), id: templateId };
    try {
      await updatePolicyTemplateMutation({templateId, body: valuesToSave});
      toast(
        <ToastNotification
          kind="success"
          title="Template Updated"
          subtitle="Template was successfully updated"
          caption=""
        />
      );
      navigateBack();
    } catch (e) {
      toast(
        <ToastNotification
          kind="error"
          title="Something's Wrong"
          subtitle="Request to update template failed"
          caption=""
        />
      );
    }

    return false;
  }
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <>
        <Error />
        <Link to="/templates">Go to Templates</Link>
      </>
    );
  }

  if (templatesData) {
    const template = templatesData.find(template => template.id === templateId);

    if (template) {
      const validationData = getTakenNamesAndKeys(templatesData);

      return (
        <CreateEditTemplateForm
          onSubmit={updateTemplate}
          navigateBack={navigateBack}
          template={template}
          validationData={validationData}
          type={TEMPLATE_INTERACTION_TYPES.EDIT}
          isLoading={isUpdating}
        />
      );
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          <NoDisplay
            text="No matching template found. Are you sure you have the right link?"
            style={{ width: "30rem", marginTop: "10rem" }}
          />
          <Link to="/templates">Go to Templates</Link>
        </div>
      );
    }
  }
  return null;
}

export default EditTemplate;
