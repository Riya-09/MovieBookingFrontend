import React from "react";
import {render} from "@testing-library/react";
import {shallow} from "enzyme";
import ShowsRevenue from "./ShowsRevenue";
import {CircularProgress} from "@material-ui/core";

describe("Basic rendering", () => {

    it("Should show revenue if not loading", () => {
        const showsRevenue = render(<ShowsRevenue showsRevenue={549.99} showsRevenueLoading={false}/>);

        showsRevenue.getByText("Revenue: ₹549.99");
    });

    it("Should display spinner if loading", () => {
        const showsRevenue = shallow(<ShowsRevenue showsRevenue={0} showsRevenueLoading={true}/>);

        const circularProgress = showsRevenue.find(CircularProgress);

        expect(circularProgress.length).toBe(1);
    });
});
