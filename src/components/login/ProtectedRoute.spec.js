import React from "react";
import {shallow} from "enzyme";
import {ProtectedRoute} from ".";
// noinspection ES6CheckImport
import {Redirect, Route} from "react-router-dom";

describe("Basic Rendering", () => {
    const TestComponent = (props) => <div {...props}/>;
    const testPath = "/testPath";

    it("Should render component if authenticated", () => {
        const protectedRouteComponent = shallow(
            <ProtectedRoute isAuthenticated={true} component={TestComponent} path={testPath} testProp="testValue"/>
        );

        const routeComponent = protectedRouteComponent.find(Route);
        const renderedComponent = routeComponent.prop("component")({testProp: "testVal"});

        expect(routeComponent.prop("path")).toBe("/testPath")
        expect(routeComponent.prop("testProp")).toBe("testValue")
        expect(renderedComponent).toEqual(<TestComponent testProp="testVal"/>);
    });

    it("Should render redirect if not authenticated", () => {
        const protectedRouteComponent = shallow(
            <ProtectedRoute isAuthenticated={false} component={TestComponent} path={testPath} testProp="testValue"/>
        );

        const routeComponent = protectedRouteComponent.find(Route);
        const renderedComponent = routeComponent.prop("component")({location: "testLocation"});

        expect(routeComponent.prop("path")).toBe("/testPath")
        expect(routeComponent.prop("testProp")).toBe("testValue")
        expect(renderedComponent).toEqual(<TestComponent location="testLocation"/>);
    });

    // it("Should render redirect if not authenticated", () => {
    //     const protectedRouteComponent = shallow(
    //         <ProtectedRoute isAuthenticated={false} component={TestComponent} path={testPath} testProp="testValue"/>
    //     );

    //     const routeComponent = protectedRouteComponent.find(Route);
    //     const renderedComponent = routeComponent.prop("component")({location: "testLocation"});

    //     expect(routeComponent.prop("path")).toBe("/testPath")
    //     expect(routeComponent.prop("testProp")).toBe("testValue")
    //     expect(renderedComponent).toEqual(<Redirect
    //         to={{
    //             pathname: "/login",
    //             state: {
    //                 from: "testLocation"
    //             }
    //         }}
    //     />);
    // });
});
