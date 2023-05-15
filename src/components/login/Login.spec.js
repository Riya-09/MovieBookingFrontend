import React from "react";
import {mount} from "enzyme";
import Login from "./Login";
// noinspection ES6CheckImport
import useLogin from "./hooks/useLogin";
import {when} from "jest-when";
import {Formik} from "formik";

jest.mock("./hooks/useLogin", () => ({
        __esModule: true,
        default: jest.fn()
    })
);

jest.mock("./services/loginFormService", () => ({
        __esModule: true,
        initialValues: "initialValues",
        formSchema: "formSchema"
    })
);

describe("Basic Rendering", () => {
    const testOnLogin = jest.fn();
    const testHandleLogin = jest.fn();
    const testReferrer = "/testReferrer";
    const testFrom = "testFrom";
    const TestErrorComponent = () => <div/>;

    beforeEach(() => {
        when(useLogin).calledWith(testOnLogin).mockReturnValue({
            errorMessage: () => <TestErrorComponent/>,
            handleLogin: testHandleLogin
        });
    });

    it("should go to from url when authenticated", () => {
        const testHistory = {replace: jest.fn()};
        mount(<Login isAuthenticated={true} onLogin={testOnLogin}
                     location={{state: {from: testFrom}}} history={testHistory}/>);

        expect(testHistory.replace).toBeCalledTimes(1);
        expect(testHistory.replace).toHaveBeenCalledWith(testFrom);
    });

    it("should render login form when not authenticated", () => {
        const loginComponent = mount(<Login isAuthenticated={false} onLogin={testOnLogin}
                                            location={{state: {referrer: testReferrer}}}/>);

        const formikComponent = loginComponent.find(Formik);
        const testErrorDivComponent = loginComponent.find(TestErrorComponent);
        expect(testErrorDivComponent.length).toBe(1);
        expect(formikComponent.prop("initialValues")).toBe("initialValues");
        expect(formikComponent.prop("validationSchema")).toBe("formSchema");
        expect(formikComponent.prop("onSubmit")).toEqual(testHandleLogin);
    });
});
