import React from "react";
import { fireEvent, getByText, render } from "@testing-library/react";
import SeatSelectionDialog from "./SeatSelectionDialog";
import UserContext from "../context/UserContext";
import { when } from "jest-when";

jest.mock("./CustomerDetailsDialog", () => {
    return ({ open }) => <div>Customer Details is {open ? "open" : "closed"}</div>
});

describe("Basic rendering and functionality", () => {
    const openDialog = true;

    const onClose = jest.fn();
    const updateShowRevenue = jest.fn();

    const mockUserDetails = {
        username: "test-user",
        email: "test-user@tw.com",
        phone: "9876543210",
        role: "ADMIN"
    };

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
        slot: { startTime: "start time 1" },
        noOfBookedSeats: 100
    };
    const isHousefull = selectedShow.noOfBookedSeats >= 100 ? true : false;

    const fetchMap = jest.fn();


    it("Should display seat map input on next", async() => {

        const { getByText, getByTestId } = render(<UserContext.Provider value={{
            userDetails: mockUserDetails
        }}>
            <SeatSelectionDialog selectedShow={selectedShow} open={openDialog}
                onClose={onClose}
                updateShowsRevenue={updateShowRevenue} isHousefull={false} />
        </UserContext.Provider>);

        var returnedPayload = when(fetchMap).calledWith({
            date: '2021-09-09',
            showId: '1'
        }).mockResolvedValue([]);

        console.log(returnedPayload);

        await expect(returnedPayload).toBeTruthy();

        fireEvent.click(getByTestId("bookButton"));

        expect(getByTestId("skyfox")).toBeTruthy();
    });


    it("Should display the show info and Poster", () => {
        const { queryByText, queryByDisplayValue, getByTestId, queryByTestId } = render(<SeatSelectionDialog selectedShow={selectedShow}
            open={openDialog} onClose={onClose}
            updateShowsRevenue={updateShowRevenue} isHousefull={isHousefull} />);

        expect(queryByTestId('housefull')).toBeTruthy();
        expect(queryByText(selectedShow.movie.name)).toBeTruthy();
        expect(queryByText(selectedShow.movie.plot)).toBeTruthy();
        expect(queryByText(selectedShow.movie.imdbRating)).toBeTruthy();
        expect(getByTestId("rated")).toBeTruthy();
        expect(getByTestId("duration and genre")).toBeTruthy();
        expect(getByTestId("Poster")).toBeTruthy();

    });




});
