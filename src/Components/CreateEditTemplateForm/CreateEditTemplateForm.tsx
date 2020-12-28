import React from "react";
import { Formik, Form, FieldArray } from "formik";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'yup'... Remove this comment to see the full error message
import * as Yup from "yup";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { Creatable, ErrorMessage, TextInput, TextArea, Tabs, Tab, SkeletonPlaceholder, TabsSkeleton } from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/CreateEditTemplateH... Remove this comment to see the full error message
import CreateEditTemplateHeader from "Components/CreateEditTemplateHeader";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/TextEditor' or its ... Remove this comment to see the full error message
import TextEditor from "Components/TextEditor";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/ValidateFormikOnRen... Remove this comment to see the full error message
import ValidateFormikOnRender from "Components/ValidateFormikOnRender";
import TemplateRules from "./TemplateRules";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './createTemplate.module.scss' ... Remove this comment to see the full error message
import styles from "./createTemplate.module.scss";

function validateKey(key: any) {
  const regexp = new RegExp("[^a-z|^A-Z|^0-9|^_|/.]");
  return !regexp.test(key);
}

const FeatureLayout = ({
  children,
  navigateBack,
  type,
  onCancel,
  formikProps,
  isLoading,
  hasError
}: any) => {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <CreateEditTemplateHeader form={formikProps} navigateBack={navigateBack} type={type} onCancel={onCancel} isLoading={isLoading} hasError={hasError}/>
      {children}
    </>
  );
}

function CreateTemplate({
  navigateBack,
  onSubmit,
  template,
  type,
  validationData,
  onCancel,
  isLoading=false,
  hasError=false
}: any) {
  const codeMirrorEditor = React.useRef(null);

  function setCodeMirroEditor(codeMirroEditor: any) {
    codeMirrorEditor.current = codeMirroEditor;
  }

  if(isLoading) {
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <FeatureLayout isLoading={true} navigateBack={navigateBack} type={type}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div style={{padding: "2rem"}}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <TabsSkeleton className={styles.tabsSkeleton}/>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <SkeletonPlaceholder className={styles.inputsSkeleton} />
        </div>
      </FeatureLayout>
    );
  }

  if(hasError) {
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <FeatureLayout hasError={true} navigateBack={navigateBack} type={type}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div style={{padding: "2rem"}}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <ErrorMessage />
        </div>
      </FeatureLayout>
    );
  }

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
        description: Yup.string().max(250, "Enter 250 or less character"),
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
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Form onSubmit={handleSubmit}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <FeatureLayout formikProps={formikProps} navigateBack={navigateBack} type={type} onCancel={onCancel}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <section className={styles.container}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Tabs>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Tab label="About">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className={styles.generalContainer}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <section className={styles.generalSection}>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <h1 className={styles.sectionTitle}>General</h1>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <section className={styles.generalSection}>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <h1 className={styles.sectionTitle}>Validation</h1>
                        {/* <Dropdown
                          id="integration"
                          titleText="Integration"
                          label="integration"
                          items={["integration", "custom"]}
                          onChange={({ selectedItem }) => setFieldValue("integration", selectedItem)}
                          selectedItem={values.integration}
                        /> */}
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Creatable
                          id="labels"
                          name="labels"
                          label="Labels (optional)"
                          helperText="Metadata to pass information into the pre-integrated repositories"
                          onChange={(values: any) => setFieldValue("labels", values)}
                          values={values.labels}
                          placeholder="Create labels"
                          type="text"
                          textInputProps={{ maxLength: 64 }}
                        />
                      </section>
                    </div>
                  </Tab>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Tab label="Rules">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p>Create at least one</p>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <FieldArray
                      name="rules"
                      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      render={(arrayHelpers) => <TemplateRules arrayHelpers={arrayHelpers} rules={values.rules} />}
                    />
                  </Tab>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Tab label="OPA Rego" onClick={() => codeMirrorEditor.current.refresh()}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <section className={styles.opaPolicyContainer}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <TextEditor
                        onChange={(value: any) => setFieldValue("rego", value)}
                        setCodeMirroEditor={setCodeMirroEditor}
                        value={values.rego}
                      />
                    </section>
                  </Tab>
                </Tabs>
              </section>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <ValidateFormikOnRender validateForm={validateForm} />
            </FeatureLayout>
          </Form>
        );
      }}
    </Formik>
  );
}

export default CreateTemplate;
