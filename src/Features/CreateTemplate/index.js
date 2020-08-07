import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastNotification } from "carbon-components-react";
import CreateEditTemplateForm from "Components/CreateEditTemplateForm";
import { TEMPLATE_INTERACTION_TYPES } from "Constants";
import { SERVICE_PRODUCT_TEMPLATES_PATH } from "Config/servicesConfig";

function CreateTemplate(props) {
  function navigateBack() {
    props.history.push("/templates");
  }

  //const [status, setStatus] = React.useState();

  async function createTemplate(values) {
    //setStatus("pending");
    const valuesToSave = { ...values, rego: btoa(values.rego) };
    try {
      await axios.post(SERVICE_PRODUCT_TEMPLATES_PATH, valuesToSave);
      //setStatus("resolved");
      toast(
        <ToastNotification
          kind="success"
          title="Template Created"
          subtitle="Template was successfully created"
          caption=""
        />
      );
      navigateBack();
    } catch (e) {
      //setStatus("rejected");
      toast(
        <ToastNotification
          kind="error"
          title="Something's Wrong"
          subtitle="Request to create template failed"
          caption=""
        />
      );
    }

    return false;
  }

  return (
    <CreateEditTemplateForm
      navigateBack={navigateBack}
      onSubmit={createTemplate}
      type={TEMPLATE_INTERACTION_TYPES.CREATE}
    />
  );
}

export default CreateTemplate;
