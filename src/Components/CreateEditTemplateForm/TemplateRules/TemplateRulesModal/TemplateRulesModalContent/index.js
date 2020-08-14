import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  ComboBox,
  Creatable,
  TextArea,
  TextInput,
  Toggle,
  ModalFlowForm,
  Button, ModalBody, ModalFooter
} from "@boomerang-io/carbon-addons-boomerang-react";
import { Formik } from "formik";
import * as Yup from "yup";
import clonedeep from "lodash/cloneDeep";
import styles from "./templateRulesModalContent.module.scss";

const INPUT_TYPES = {
  //BOOLEAN: "boolean",
  SELECT: "select",
  TEXT_AREA: "textarea",
  TEXT_INPUT: "text"
};

const FIELD = {
  KEY: "key",
  DESCRIPTION: "description",
  LABEL: "label",
  REQUIRED: "required",
  TYPE: "type",
  DEFAULT_VALUE: "defaultValue",
  OPTIONS: "options"
};

const INPUT_TYPES_LABELS = [
  //{ label: "Boolean", value: "boolean" },
  { label: "Number", value: "number" },
  { label: "Password", value: "password" },
  { label: "Select", value: "select" },
  { label: "Text", value: "text" },
  { label: "Text Area", value: "textarea" }
];

export default class TemplateRulesModalContent extends Component {
  static propTypes = {
    closeModal: PropTypes.func,
    input: PropTypes.object,
    inputsKeys: PropTypes.array,
    isEdit: PropTypes.bool,
    createConfig: PropTypes.func,
    updateConfig: PropTypes.func
  };

  handleOnChange = (e, formikChange) => {
    formikChange(e);
  };

  handleOnFieldValueChange = (value, id, setFieldValue) => {
    setFieldValue(id, value);
  };

  handleOnTypeChange = (selectedItem, setFieldValue) => {
    setFieldValue(FIELD.TYPE, selectedItem);
    setFieldValue(FIELD.DEFAULT_VALUE, selectedItem.value === INPUT_TYPES.BOOLEAN ? false : undefined);
  };

  // Only save an array of strings to match api and simplify renderDefaultValue()
  handleOptionsChange = (values, setFieldValue) => {
    setFieldValue(FIELD.OPTIONS, values);
  };

  /* Check if key contains space or special characters, only underline is allowed */
  validateKey = key => {
    const regexp = new RegExp("[^a-z|^A-Z|^0-9|^_|/.]");
    return !regexp.test(key);
  };

  // dispatch Redux action to update store
  handleConfirm = values => {
    let inputProperties = clonedeep(values);
    inputProperties.type = inputProperties.type.value;

    //remove in case they are present if the user changed their mind
    if (inputProperties.type !== INPUT_TYPES.SELECT) {
      delete inputProperties.options;
    }

    if (inputProperties.type === INPUT_TYPES.BOOLEAN) {
      if (!inputProperties.defaultValue) inputProperties.defaultValue = false;
    }

    if (this.props.isEdit) {
      this.props.updateConfig(inputProperties);
    } else {
      this.props.createConfig(inputProperties);
    }

    this.props.closeModal();
  };

  renderDefaultValue = formikProps => {
    const { values, handleBlur, handleChange, setFieldValue } = formikProps;

    switch (values.type.value) {
      case INPUT_TYPES.BOOLEAN:
        return (
          <Toggle
            data-testid="toggle"
            id={FIELD.DEFAULT_VALUE}
            toggled={values.defaultValue === "true"}
            labelText="Default Value"
            onToggle={value => this.handleOnFieldValueChange(value.toString(), FIELD.DEFAULT_VALUE, setFieldValue)}
            orientation="vertical"
          />
        );
      case INPUT_TYPES.SELECT:
        let options = clonedeep(values.options);
        return (
          <>
            <Creatable
              data-testid="creatable"
              id={FIELD.OPTIONS}
              onChange={createdItems => this.handleOptionsChange(createdItems, setFieldValue)}
              values={options || []}
              labelText="Options"
              placeholder="Enter option"
            />
            <ComboBox
              data-testid="select"
              id={FIELD.DEFAULT_VALUE}
              onChange={({ selectedItem }) =>
                this.handleOnFieldValueChange(selectedItem, FIELD.DEFAULT_VALUE, setFieldValue)
              }
              items={options || []}
              initialSelectedItem={values.defaultValue || {}}
              titleText="Default Option"
              placeholder="Select option"
            />
          </>
        );
      case INPUT_TYPES.TEXT_AREA:
        return (
          <TextArea
            data-testid="text-area"
            id={FIELD.DEFAULT_VALUE}
            labelText="Default Value"
            placeholder="Default Value"
            value={values.defaultValue || ""}
            onBlur={handleBlur}
            onChange={e => this.handleOnChange(e, handleChange)}
            style={{ resize: "none" }}
          />
        );
      default:
        // Fallback to text input here because it covers text, password, and url
        return (
          <TextInput
            data-testid="text-input"
            id={FIELD.DEFAULT_VALUE}
            labelText="Default Value"
            placeholder="Default Value"
            type={values.type.value}
            value={values.defaultValue || ""}
            onBlur={handleBlur}
            onChange={e => this.handleOnChange(e, handleChange)}
          />
        );
    }
  };

  render() {
    const { input, isEdit, inputsKeys, loading } = this.props;

    return (
      <Formik
        onSubmit={this.handleConfirm}
        initialValues={{
          [FIELD.KEY]: input?.key ?? "",
          [FIELD.LABEL]: input?.label ?? "",
          [FIELD.DESCRIPTION]: input?.description ?? "",
          [FIELD.TYPE]: input ? INPUT_TYPES_LABELS.find(type => type.value === input.type) : INPUT_TYPES_LABELS[3],
          [FIELD.DEFAULT_VALUE]: input?.defaultValue ?? "",
          [FIELD.OPTIONS]: input?.options ?? []
        }}
        validationSchema={Yup.object().shape({
          [FIELD.KEY]: Yup.string()
            .required("Enter a key")
            .notOneOf(inputsKeys || [], "Enter a unique key value")
            .test("is-valid-key", "Key cannot contain spaces and special characters", this.validateKey),
          [FIELD.LABEL]: Yup.string().required("Enter a label"),
          [FIELD.DESCRIPTION]: Yup.string(),
          [FIELD.TYPE]: Yup.object({ label: Yup.string().required(), value: Yup.string().required() }),
          [FIELD.OPTIONS]: Yup.array()
        })}
        validateOnMount
      >
        {formikProps => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            setFieldValue,
            isValid,
            handleSubmit
          } = formikProps;
          return (
            <ModalFlowForm onSubmit={handleSubmit}>
              <ModalBody className={styles.container}>
                <TextInput
                  id={FIELD.LABEL}
                  labelText="Name"
                  placeholder="Name"
                  value={values.label}
                  onBlur={handleBlur}
                  onChange={e => this.handleOnChange(e, handleChange)}
                  invalid={errors.label && touched.label}
                  invalidText={errors.label}
                />
                {!isEdit && (
                  <TextInput
                    id={FIELD.KEY}
                    invalid={errors.key && touched.key}
                    invalidText={errors.key}
                    labelText="Key"
                    onBlur={handleBlur}
                    onChange={e => this.handleOnChange(e, handleChange)}
                    placeholder="key.value"
                    value={values.key}
                  />
                )}
                <TextInput
                  id={FIELD.DESCRIPTION}
                  labelText="Description"
                  onBlur={handleBlur}
                  onChange={e => this.handleOnChange(e, handleChange)}
                  placeholder="Description"
                  value={values.description}
                />
                <ComboBox
                  id={FIELD.TYPE}
                  onChange={({ selectedItem }) =>
                    this.handleOnTypeChange(
                      selectedItem !== null ? selectedItem : { label: "", value: "" },
                      setFieldValue
                    )
                  }
                  items={INPUT_TYPES_LABELS}
                  initialSelectedItem={values.type}
                  itemToString={item => item && item.label}
                  placeholder="Select an item"
                  titleText="Type"
                />

                {this.renderDefaultValue(formikProps)}
              </ModalBody>
              <ModalFooter>
                <Button kind="secondary" onClick={this.props.closeModal} type="button">
                  Cancel
                </Button>
                <Button data-testid="inputs-modal-confirm-button" disabled={!isValid || loading} type="submit">
                  {isEdit ? "Save" : "Create"}
                </Button>
              </ModalFooter>
            </ModalFlowForm>
          );
        }}
      </Formik>
    );
  }
}
