import React from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Creatable, TextInput, TextArea } from "@boomerang-io/carbon-addons-boomerang-react";
import { Tabs, Tab } from "carbon-components-react";
import CreateEditTemplateHeader from "components/CreateEditTemplateHeader";
import TextEditor from "components/TextEditor";
import ValidateFormikOnRender from "components/ValidateFormikOnRender";
import TemplateRules from "./TemplateRules";
import styles from "./createTemplate.module.scss";

function validateKey(key) {
  const regexp = new RegExp("[^a-z|^A-Z|^0-9|^_|/.]");
  return !regexp.test(key);
}

function CreateTemplate({ navigateBack, onSubmit, template, type, validationData }) {
  const codeMirrorEditor = React.useRef(null);

  function setCodeMirroEditor(codeMirroEditor) {
    codeMirrorEditor.current = codeMirroEditor;
  }
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        description: template?.description ?? "",
        key: template?.key ?? "",
        name: template?.name ?? "",
        order: template?.order ?? 0,
        rego: template?.rego ? atob(template.rego) : "",
        rules: template?.rules ?? [],
        // integration: template?.integration ?? "integrated",
        labels: template?.labels ?? [],
      }}
      validationSchema={Yup.object().shape({
        key: Yup.string()
          .required("Enter a key")
          .notOneOf(validationData?.templateKeys ?? [], "Enter a unique key value")
          .max(64, "Enter no more than 64 character")
          .test("is-valid-key", "Key cannot contain spaces and special characters", validateKey),
        description: Yup.string().max(128, "Enter no more than 128 character"),
        name: Yup.string()
          .required("Enter a name")
          .notOneOf(validationData?.templateNames ?? [], "Enter a unique name")
          .max(64, "Enter no more than 64 character"),
        order: Yup.number().min(0, "Enter a positive number"),
        rego: Yup.string().required("Enter a Rego OPA policy"),
        rules: Yup.array().min(1, "Create at least one rule").max(20, "Really, more than 20 rules?"),
        labels: Yup.array().max(50, "Really, more than 50 labels?"),
      })}
    >
      {(formikProps) => {
        const {
          errors,
          values,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          validateForm,
        } = formikProps;
        return (
          <Form onSubmit={handleSubmit}>
            <CreateEditTemplateHeader form={formikProps} navigateBack={navigateBack} type={type} />
            <section className={styles.container}>
              <Tabs>
                <Tab label="About">
                  <div className={styles.generalContainer}>
                    <section className={styles.generalSection}>
                      <h1 className={styles.sectionTitle}>General</h1>
                      <TextInput
                        id="name"
                        name="name"
                        key="name"
                        label="Name"
                        placeholder="Name"
                        invalid={errors.name && touched.name}
                        invalidText={errors.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      <TextInput
                        id="key"
                        name="key"
                        key="key"
                        label="Key"
                        placeholder="Key"
                        helperText="Must match the OPA Rego package declaration"
                        invalid={errors.key && touched.key}
                        invalidText={errors.key}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.key}
                      />
                      <TextArea
                        id="description"
                        name="description"
                        key="description"
                        label="Description (optional)"
                        placeholder="Description"
                        invalid={errors.description && touched.description}
                        invalidText={errors.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                      />
                      <TextInput
                        id="order"
                        name="order"
                        type="number"
                        key="order"
                        label="Order (optional)"
                        placeholder="0"
                        helperText="Specify presentation order in Create Policy feature"
                        invalid={errors.order && touched.order}
                        invalidText={errors.order}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.order}
                      />
                    </section>
                    <section className={styles.generalSection}>
                      <h1 className={styles.sectionTitle}>Validation</h1>
                      {/* <Dropdown
                        id="integration"
                        titleText="Integration"
                        label="integration"
                        items={["integration", "custom"]}
                        onChange={({ selectedItem }) => setFieldValue("integration", selectedItem)}
                        selectedItem={values.integration}
                      /> */}
                      <Creatable
                        id="labels"
                        name="labels"
                        label="Labels (optional)"
                        helperText="Metadata to pass information into the pre-integrated repositories"
                        onChange={(values) => setFieldValue("labels", values)}
                        values={values.labels}
                        placeholder="Create labels"
                        type="text"
                        textInputProps={{ maxLength: 64 }}
                      />
                    </section>
                  </div>
                </Tab>
                <Tab label="Rules">
                  <FieldArray
                    name="rules"
                    render={(arrayHelpers) => <TemplateRules arrayHelpers={arrayHelpers} rules={values.rules} />}
                  />
                </Tab>
                <Tab label="OPA Rego" onClick={() => codeMirrorEditor.current.refresh()}>
                  <section className={styles.opaPolicyContainer}>
                    <TextEditor
                      onChange={(value) => setFieldValue("rego", value)}
                      setCodeMirroEditor={setCodeMirroEditor}
                      value={values.rego}
                    />
                  </section>
                </Tab>
              </Tabs>
            </section>
            <ValidateFormikOnRender validateForm={validateForm} />
          </Form>
        );
      }}
    </Formik>
  );
}

export default CreateTemplate;
