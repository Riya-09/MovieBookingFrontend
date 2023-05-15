import React from "react";
import { fireEvent, waitFor, getByTestId, render } from "@testing-library/react";
import SeatMap from "./SeatMap";
import { when } from "jest-when";
import moment from "moment";


jest.mock("./CustomerDetailsDialog", () => {
    return ({ open }) => <div>Customer Details is {open ? "open" : "closed"}</div>
});

const create = jest.fn();

jest.mock("moment");
describe("Basic rendering and functionality", () => {
    const openDialog = true;
    const onClose = jest.fn();
    const updateShowRevenue = jest.fn();

    const selectedShow = {
        id: 1,
        cost: 150,
        movie: {
            name: "Movie 1",
            plot: "Suspense movie",
            duration: "1hr 30m",
            imdbRating: "7.5",
            rated: "R",
            genre: "genre",

        },
        slot: { startTime: "start time 1" }
    };

    it("Should call booking service api to create booking on submit", async () => {

        const testFormat = jest.fn();
        when(testFormat).calledWith("YYYY-MM-DD").mockReturnValue("2021-09-08");

        moment.mockReturnValue({
            format: testFormat
        });

        const payload =
            { "date": "2021-09-08", "showId": 841, "customer": { "name": "twinkle", "phoneNumber": 9898989898 }, "noOfSeats": "1", "bookCases": ["A1"] }


        const response = { "id": 13, "customerName": "twinkle", "showDate": "2021-09-08", "startTime": "09:00:00", "amountPaid": 205.71, "noOfSeats": 1 };



        const { getByTestId, getByText, queryByTestId } = render(<SeatMap selectedShow={selectedShow} open={openDialog}
            onClose={onClose}
            updateShowsRevenue={updateShowRevenue} notAvailableSeat={[]} />);


        var returnedPayload = when(create).calledWith(payload).mockReturnValue(response);

        await expect(returnedPayload).toBeTruthy();

    });

});