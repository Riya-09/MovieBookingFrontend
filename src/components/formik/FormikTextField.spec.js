import React from "react";
import {FormikTextField} from ".";
import {shallow} from "enzyme";
import {when} from "jest-when";
import {useField} from "formik";

jest.mock("formik");

describe("Basic rendering", () => {
    let field;
    let meta;

    function basicAssertions(formikTextFieldComponent) {
        expect(formikTextFieldComponent.prop('testProp')).toBe("test prop value");
        expect(formikTextFieldComponent.prop('name')).toBe("test field");
        expect(formikTextFieldComponent.prop('value')).toBe("test value field");
        expect(formikTextFieldComponent.prop('onChange')).toBe("test on change field");
        expect(formikTextFieldComponent.prop('onBlur')).toBe("test on blur field");
    }

    beforeEach(() => {
        field = {
            value: "test value field",
            onChange: "test on change field",
            onBlur: "test on blur field"
        };

        meta = {
            error: "test error",
            touched: true
        };
    });

    it("Should render a formik text field correctly with errors", () => {
        when(useField).calledWith("test field").mockReturnValue([field, meta]);
        const formikTextFieldComponent = shallow(<FormikTextField testProp="test prop value" name="test field"
                                                                  label="test label"/>);
        basicAssertions(formikTextFieldComponent);
        expect(formikTextFieldComponent.prop('error')).toBe(true);
        expect(formikTextFieldComponent.prop('helperText')).toBe("test error");
    });

    it("Should render a formik text field correctly without errors", () => {
        meta.touched = false;
        meta.error = 'error text';
        when(useField).calledWith("test field").mockReturnValue([field, meta]);
        const formikTextFieldComponent = shallow(<FormikTextField testProp="test prop value" name="test field"
                                                                  label="test label"/>);

        basicAssertions(formikTextFieldComponent);
        expect(formikTextFieldComponent.prop('error')).toBe(false);
        expect(formikTextFieldComponent.prop('helperText')).toBe('');
    });
});
