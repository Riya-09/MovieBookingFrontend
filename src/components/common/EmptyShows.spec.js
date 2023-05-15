import React from "react";
import {shallow} from "enzyme";
import {EmptyShows} from ".";
import {Typography} from "@material-ui/core";

describe("Basic rendering", () => {
    it("Should render with message", () => {
        const testMessage = "Test Message";

        const emptyShowsComponent = shallow(<EmptyShows emptyShowsMessage={testMessage}/>);

        const typographyComponent = emptyShowsComponent.find(Typography);
        const actualMessage = typographyComponent.text();
        expect(typographyComponent.length).toBe(1);
        expect(actualMessage).toBe(testMessage);
    });
});
