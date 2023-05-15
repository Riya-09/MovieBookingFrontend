import React from "react";
import {shallow} from "enzyme";
import {FormikSelect} from "./index";
import {InputLabel, Select} from "@material-ui/core";
import {useField} from "formik";
import {when} from "jest-when";

jest.mock("formik");

describe("Basic Rendering", () => {
    it("Should render with correct options", () => {
        when(useField).calledWith("test select").mockReturnValue([{
            onChange: "test on change"
        }]);

        const formikSelectComponent = shallow(<FormikSelect testProp='test prop' name="test select" id="test id"
                                                            options={[
                                                                {value: "valueOne", display: "Value One"},
                                                                {value: "valueTwo", display: "Value Two"}
                                                            ]}/>);

        const inputLabelComponent = formikSelectComponent.find(InputLabel);
        const selectComponent = formikSelectComponent.find(Select);
        const optionTags = formikSelectComponent.find('option');
        const optionOne = optionTags.get(0);
        const optionTwo = optionTags.get(1);
        expect(inputLabelComponent.prop("id")).toBe("test id");
        expect(inputLabelComponent.text()).toBe("Status");
        expect('native' in selectComponent.props()).toBe(true);
        expect(selectComponent.prop("labelId")).toBe("test id");
        expect(selectComponent.prop("onChange")).toBe("test on change");
        expect(selectComponent.prop("name")).toBe("test select");
        expect(selectComponent.prop("testProp")).toBe("test prop");
        expect(optionOne.props).toEqual({value: "valueOne", children: "Value One"});
        expect(optionTwo.props).toEqual({value: "valueTwo", children: "Value Two"});
    });
});
