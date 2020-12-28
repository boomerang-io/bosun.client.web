import React, { Component } from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { ComboBox, Creatable, TextArea, TextInput, Toggle, ModalForm, Button, ModalBody, ModalFooter, } from "@boomerang-io/carbon-addons-boomerang-react";
import { Formik } from "formik";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'yup'... Remove this comment to see the full error message
import * as Yup from "yup";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import clonedeep from "lodash/cloneDeep";
const INPUT_TYPES = {
    //BOOLEAN: "boolean",
    SELECT: "select",
    TEXT_AREA: "textarea",
    TEXT_INPUT: "text",
};
const FIELD = {
    KEY: "key",
    DESCRIPTION: "description",
    LABEL: "label",
    REQUIRED: "required",
    TYPE: "type",
    DEFAULT_VALUE: "defaultValue",
    OPTIONS: "options",
};
const INPUT_TYPES_LABELS = [
    //{ label: "Boolean", value: "boolean" },
    { label: "Number", value: "number" },
    { label: "Password", value: "password" },
    { label: "Select", value: "select" },
    { label: "Text", value: "text" },
    { label: "Text Area", value: "textarea" },
];
type TemplateRulesModalContentProps = {
    closeModal?: (...args: any[]) => any;
    input?: any;
    inputsKeys?: any[];
    isEdit?: boolean;
    createConfig?: (...args: any[]) => any;
    updateConfig?: (...args: any[]) => any;
};
export default class TemplateRulesModalContent extends Component<TemplateRulesModalContentProps> {
    handleOnChange = (e: any, formikChange: any) => {
        formikChange(e);
    };
    handleOnFieldValueChange = (value: any, id: any, setFieldValue: any) => {
        setFieldValue(id, value);
    };
    handleOnTypeChange = (selectedItem: any, setFieldValue: any) => {
        setFieldValue(FIELD.TYPE, selectedItem);
        setFieldValue(FIELD.DEFAULT_VALUE, selectedItem.value === (INPUT_TYPES as any).BOOLEAN ? false : undefined);
    };
    // Only save an array of strings to match api and simplify renderDefaultValue()
    handleOptionsChange = (values: any, setFieldValue: any) => {
        setFieldValue(FIELD.OPTIONS, values);
    };
    /* Check if key contains space or special characters, only underline is allowed */
    validateKey = (key: any) => {
        const regexp = new RegExp("[^a-z|^A-Z|^0-9|^_|/.]");
        return !regexp.test(key);
    };
    // dispatch Redux action to update store
    handleConfirm = (values: any) => {
        let inputProperties = clonedeep(values);
        inputProperties.type = inputProperties.type.value;
        //remove in case they are present if the user changed their mind
        if (inputProperties.type !== INPUT_TYPES.SELECT) {
            delete inputProperties.options;
        }
        if (inputProperties.type === (INPUT_TYPES as any).BOOLEAN) {
            if (!inputProperties.defaultValue)
                inputProperties.defaultValue = false;
        }
        if (this.props.isEdit) {
            // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
            this.props.updateConfig(inputProperties);
        }
        else {
            // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
            this.props.createConfig(inputProperties);
        }
        // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        this.props.closeModal();
    };
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type 'Readonl... Remove this comment to see the full error message
        const { input, isEdit, inputsKeys, loading } = this.props;
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return (<Formik onSubmit={this.handleConfirm} initialValues={{
            [FIELD.KEY]: input?.key ?? "",
            [FIELD.LABEL]: input?.label ?? "",
            [FIELD.DESCRIPTION]: input?.description ?? "",
            [FIELD.TYPE]: input ? INPUT_TYPES_LABELS.find((type) => type.value === input.type) : INPUT_TYPES_LABELS[3],
            [FIELD.DEFAULT_VALUE]: input?.defaultValue ?? "",
            [FIELD.OPTIONS]: input?.options ?? [],
        }} validationSchema={Yup.object().shape({
            [FIELD.KEY]: Yup.string()
                .required("Enter a key")
                .notOneOf(inputsKeys || [], "Enter a unique key value")
                .test("is-valid-key", "Key cannot contain spaces and special characters", this.validateKey),
            [FIELD.LABEL]: Yup.string().required("Enter a label"),
            [FIELD.DESCRIPTION]: Yup.string(),
            [FIELD.TYPE]: Yup.object({ label: Yup.string().required(), value: Yup.string().required() }),
            [FIELD.OPTIONS]: Yup.array(),
        })} validateOnMount>
        {(formikProps) => {
            const { values, touched, errors, handleBlur, handleChange, setFieldValue, isValid, handleSubmit, } = formikProps;
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return (<ModalForm onSubmit={handleSubmit}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <ModalBody>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <TextInput id={FIELD.LABEL} labelText="Name" placeholder="Name" value={values.label} onBlur={handleBlur} onChange={(e: any) => this.handleOnChange(e, handleChange)} invalid={errors.label && touched.label} invalidText={errors.label}/>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                {!isEdit && (<TextInput id={FIELD.KEY} invalid={errors.key && touched.key} invalidText={errors.key} labelText="Key" onBlur={handleBlur} onChange={(e: any) => this.handleOnChange(e, handleChange)} placeholder="key.value" value={values.key}/>)}
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <TextInput id={FIELD.DESCRIPTION} labelText="Description" onBlur={handleBlur} onChange={(e: any) => this.handleOnChange(e, handleChange)} placeholder="Description" value={values.description}/>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ComboBox id={FIELD.TYPE} onChange={({ selectedItem }: any) => this.handleOnTypeChange(selectedItem !== null ? selectedItem : { label: "", value: "" }, setFieldValue)} items={INPUT_TYPES_LABELS} initialSelectedItem={values.type} itemToString={(item: any) => item && item.label} placeholder="Select an item" titleText="Type"/>

                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DefaultValue formikProps={formikProps}/>
              </ModalBody>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <ModalFooter>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Button kind="secondary" onClick={this.props.closeModal} type="button">
                  Cancel
                </Button>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Button data-testid="inputs-modal-confirm-button" disabled={!isValid || loading} type="submit">
                  {isEdit ? "Save" : "Create"}
                </Button>
              </ModalFooter>
            </ModalForm>);
        }}
      </Formik>);
    }
}
function DefaultValue({ formikProps }: any) {
    const { values, handleBlur, handleChange, setFieldValue } = formikProps;
    switch (values.type.value) {
        case (INPUT_TYPES as any).BOOLEAN:
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return (<Toggle data-testid="toggle" id={FIELD.DEFAULT_VALUE} toggled={values.defaultValue === "true"} labelText="Default Value" onToggle={(value: any) => this.handleOnFieldValueChange(value.toString(), FIELD.DEFAULT_VALUE, setFieldValue)} orientation="vertical"/>);
        case INPUT_TYPES.SELECT:
            let options = clonedeep(values.options);
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Creatable data-testid="creatable" id={FIELD.OPTIONS} onChange={(createdItems: any) => this.handleOptionsChange(createdItems, setFieldValue)} values={options || []} labelText="Options" placeholder="Enter option"/>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ComboBox data-testid="select" id={FIELD.DEFAULT_VALUE} onChange={({ selectedItem }: any) => this.handleOnFieldValueChange(selectedItem, FIELD.DEFAULT_VALUE, setFieldValue)} items={options || []} initialSelectedItem={values.defaultValue || {}} titleText="Default Option" placeholder="Select option"/>
      </>;
        case INPUT_TYPES.TEXT_AREA:
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return (<TextArea data-testid="text-area" id={FIELD.DEFAULT_VALUE} labelText="Default Value" placeholder="Default Value" value={values.defaultValue || ""} onBlur={handleBlur} onChange={(e: any) => this.handleOnChange(e, handleChange)} style={{ resize: "none" }}/>);
        default:
            // Fallback to text input here because it covers text, password, and url
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return (<TextInput data-testid="text-input" id={FIELD.DEFAULT_VALUE} labelText="Default Value" placeholder="Default Value" type={values.type.value} value={values.defaultValue || ""} onBlur={handleBlur} onChange={(e: any) => this.handleOnChange(e, handleChange)}/>);
    }
}
