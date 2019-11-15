import React from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Creatable, TextInput, TextArea } from "@boomerang/carbon-addons-boomerang-react";
import { Dropdown, Tabs, Tab } from "carbon-components-react";
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
        integration: template?.integration ?? "integrated",
        labels: template?.labels ?? []
      }}
      validationSchema={Yup.object().shape({
        key: Yup.string()
          .required("Enter a key")
          .notOneOf(validationData?.templateKeys ?? [], "Enter a unique key value")
          .test("is-valid-key", "Key cannot contain spaces and special characters", validateKey),
        description: Yup.string().required("Enter a label"),
        name: Yup.string()
          .required("Enter a name")
          .notOneOf(validationData?.templateNames ?? [], "Enter a unique name"),
        order: Yup.number(),
        rego: Yup.string().required("Enter a Rego OPA policy"),
        rules: Yup.array().min(1, "Create at leaset one rule"),
        labels: Yup.array()
      })}
    >
      {formikProps => {
        const {
          errors,
          values,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          validateForm
        } = formikProps;
        console.log(values);
        return (
          <Form onSubmit={handleSubmit}>
            <CreateEditTemplateHeader form={formikProps} navigateBack={navigateBack} type={type} />
            <main className={styles.container}>
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
                      <TextArea
                        id="description"
                        name="description"
                        key="description"
                        label="Description"
                        placeholder="Description"
                        invalid={errors.description && touched.description}
                        invalidText={errors.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                      />
                      <TextInput
                        id="key"
                        name="key"
                        key="key"
                        label="Key"
                        placeholder="Key"
                        invalid={errors.key && touched.key}
                        invalidText={errors.key}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.key}
                      />
                      <TextInput
                        id="order"
                        name="order"
                        type="number"
                        key="order"
                        label="Order"
                        placeholder="0"
                        invalid={errors.order && touched.order}
                        invalidText={errors.order}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.order}
                      />
                    </section>
                    <section className={styles.generalSection}>
                      <h1 className={styles.sectionTitle}>Validation</h1>
                      <Dropdown
                        id="integration"
                        titleText="Integration"
                        label="integration"
                        items={["integration", "custom"]}
                        onChange={({ selectedItem }) => setFieldValue("integration", selectedItem)}
                        selectedItem={values.integration}
                      />
                      <Creatable
                        id="labels"
                        name="labels"
                        label="Labels"
                        onChange={values => setFieldValue("labels", values)}
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
                    render={arrayHelpers => <TemplateRules arrayHelpers={arrayHelpers} rules={values.rules} />}
                  />
                </Tab>
                <Tab label="OPA Rego">
                  <section className={styles.opaPolicyContainer}>
                    <TextEditor onChange={value => setFieldValue("rego", value)} value={values.rego} />
                  </section>
                </Tab>
              </Tabs>
            </main>
            <ValidateFormikOnRender validateForm={validateForm} />
          </Form>
        );
      }}
    </Formik>
  );
}

export default CreateTemplate;