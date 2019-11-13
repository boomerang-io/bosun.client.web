import React from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { TextInput, TextArea } from "@boomerang/carbon-addons-boomerang-react";
import { Tabs, Tab } from "carbon-components-react";
import CreateEditTemplateHeader from "components/CreateEditTemplateHeader";
import TextEditor from "components/TextEditor";
import ValidateFormikOnRender from "components/ValidateFormikOnRender";
import TemplateConfig from "./TemplateConfig";
import styles from "./createTemplate.module.scss";

function validateKey(key) {
  const regexp = new RegExp("[^a-z|^A-Z|^0-9|^_|/.]");
  return !regexp.test(key);
}

function CreateTemplate({ navigateBack, onSubmit, template, type }) {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        id: template?.id ?? "",
        description: template?.description ?? "",
        key: template?.key ?? "",
        name: template?.name ?? "",
        order: template?.order ?? 0,
        rego: template?.rego ?? "",
        config: template?.config ?? []
      }}
      validationSchema={Yup.object().shape({
        key: Yup.string()
          .required("Enter a key")
          .notOneOf(["test"], "Enter a unique key value")
          .test("is-valid-key", "Key cannot contain spaces and special characters", validateKey),
        description: Yup.string().required("Enter a label"),
        name: Yup.string().required("Enter a name"),
        order: Yup.number(),
        rego: Yup.string().required("Enter a Rego OPA policy"),
        config: Yup.array().min(1, "Create at leaset one config")
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
        return (
          <Form onSubmit={handleSubmit}>
            <CreateEditTemplateHeader form={formikProps} navigateBack={navigateBack} type={type} />
            <div className={styles.container}>
              <Tabs>
                <Tab label="General">
                  <div className={styles.generalContainer}>
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
                  </div>
                </Tab>
                <Tab label="Config">
                  <FieldArray
                    name="config"
                    render={arrayHelpers => <TemplateConfig arrayHelpers={arrayHelpers} config={values.config} />}
                  />
                </Tab>
                <Tab label="OPA Policy">
                  <div className={styles.opaPolicyContainer}>
                    <TextEditor onChange={value => setFieldValue("rego", value)} value={values.rego} />
                  </div>
                </Tab>
              </Tabs>
            </div>
            <ValidateFormikOnRender validateForm={validateForm} />
          </Form>
        );
      }}
    </Formik>
  );
}

export default CreateTemplate;
