import React from "react";
import axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Error } from "@boomerang/carbon-addons-boomerang-react";
import { ToastNotification } from "carbon-components-react";
import useAxiosFetch from "utils/hooks/useAxios";
import CreateEditTemplateForm from "components/CreateEditTemplateForm";
import Loading from "components/Loading";
import NoDisplay from "components/NoDisplay";
import { TEMPLATE_INTERACTION_TYPES } from "../../constants";
import { SERVICE_PRODUCT_TEMPLATES_PATH } from "config/servicesConfig";

function EditTemplate(props) {
  const history = useHistory();
  function navigateBack() {
    history.push("/templates");
  }

  function getTakenNamesAndKeys() {
    const templateNames = [];
    const templateKeys = [];
    templatesState.data.forEach(template => {
      if (template.id !== templateId) {
        templateNames.push(template.name);
        templateKeys.push(template.key);
      }
    });

    return { templateNames, templateKeys };
  }

  const { templateId } = useParams();

  const templatesState = useAxiosFetch(SERVICE_PRODUCT_TEMPLATES_PATH);

  async function updateTemplate(values) {
    const valuesToSave = { ...values, rego: btoa(values.rego), id: templateId };
    try {
      await axios.patch(`${SERVICE_PRODUCT_TEMPLATES_PATH}/${templateId}`, valuesToSave);
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
  if (templatesState.isLoading) {
    return <Loading centered />;
  }

  if (templatesState.error) {
    return (
      <>
        <Error />
        <Link to="/templates">Go to Templates</Link>
      </>
    );
  }

  if (templatesState.data) {
    const template = templatesState.data.find(template => template.id === templateId);

    if (template) {
      const validationData = getTakenNamesAndKeys(templatesState.data);

      return (
        <CreateEditTemplateForm
          onSubmit={updateTemplate}
          navigateBack={navigateBack}
          template={template}
          validationData={validationData}
          type={TEMPLATE_INTERACTION_TYPES.EDIT}
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
