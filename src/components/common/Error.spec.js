import React from "react";
import {shallow} from "enzyme";
import {Error} from ".";
import {Typography} from "@material-ui/core";

describe("Basic rendering", () => {
    it("Should render with icon and message", () => {
        const testErrorMessage = "Test Error";
        const TestErrorIcon = () => <span/>;

        const errorComponent = shallow(<Error errorIcon={TestErrorIcon} errorMessage={testErrorMessage}/>);
        const testErrorIconComponent = errorComponent.find(TestErrorIcon);
        const typographyComponent = errorComponent.find(Typography);

        expect(testErrorIconComponent.length).toBe(1);
        expect(typographyComponent.length).toBe(1);
        expect(typographyComponent.text()).toBe(testErrorMessage);
    });
});
