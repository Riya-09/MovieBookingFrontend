import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Shows from "./Shows";
import { when } from "jest-when";
import { dateFromSearchString, nextDateLocation, previousDateLocation } from "./services/dateService";
import useShows from "./hooks/useShows";
import useShowsRevenue from "./hooks/useShowsRevenue";
import { mount } from "enzyme";
import UserContext from "../context/UserContext";
import ShowsRevenue from "./ShowsRevenue";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

jest.mock("./services/dateService", () => ({
    dateFromSearchString: jest.fn(),
    nextDateLocation: jest.fn(),
    previousDateLocation: jest.fn()
}));

jest.mock("./hooks/useShows", () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock("./hooks/useShowsRevenue", () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock("./SeatSelectionDialog", () => {
    return () => <div>SeatSelection</div>;
});

describe("Basic rendering and functionality", () => {
    let testHistory;
    let testLocation;
    let testShowDate;
    const mockUserDetails = {
        username: "test-user",
        email: "test-user@tw.com",
        phone: "9876543210",
        role: "ADMIN"
    };

    beforeEach(() => {
        testHistory = {
            push: jest.fn()
        };

        testLocation = {
            search: "testSearch"
        };

        testShowDate = {
            format: jest.fn()
        };

        when(dateFromSearchString).calledWith("testSearch").mockReturnValue(testShowDate);
        when(nextDateLocation).calledWith(testLocation, testShowDate).mockReturnValue("Next Location");
        when(previousDateLocation).calledWith(testLocation, testShowDate).mockReturnValue("Previous Location");
        when(testShowDate.format).calledWith("Do MMM YYYY").mockReturnValue("Show Date");
        when(useShows).calledWith(testShowDate).mockReturnValue({
            showsLoading: false,
            shows: [
                {
                    id: 1,
                    cost: 150,
                    movie: { name: "Movie 1" },
                    slot: { startTime: "start time 1" }
                }, {
                    id: 2,
                    cost: 160,
                    movie: { name: "Movie 2" },
                    slot: { startTime: "start time 2" }
                }
            ]
        });
        when(useShowsRevenue).calledWith(testShowDate).mockReturnValue({
            showsRevenue: 549.99,
            showsRevenueLoading: false
        });
    });

    it("Should display the show info", () => {
        const shows = render(<Shows history={testHistory} location={testLocation} />);

        shows.getByText("Shows (Show Date)");

        shows.getByText("Movie 1");
        shows.getByText("start time 1");
        shows.getByText("₹150");

        shows.getByText("Movie 2");
        shows.getByText("start time 2");
        shows.getByText("₹160");
    });

    it("Should push to history if next or previous clicked", () => {
        const shows = render(<UserContext.Provider value={{
            userDetails: mockUserDetails
        }}>
            <Shows history={testHistory} location={testLocation} />
        </UserContext.Provider>);

        const previousDayButton = shows.getByText("Previous Day");
        const nextDayButton = shows.getByText("Next Day");

        fireEvent.click(previousDayButton);
        fireEvent.click(nextDayButton);

        expect(testHistory.push).toBeCalledTimes(2);
        expect(testHistory.push).toHaveBeenNthCalledWith(1, "Previous Location");
        expect(testHistory.push).toHaveBeenNthCalledWith(2, "Next Location");
    });

    it("Should display seat selection when a show is selected", () => {
        const { getByText, queryByText } = render(<Shows history={testHistory} location={testLocation} />);

        expect(queryByText("SeatSelectionDialog")).toBeNull();

        fireEvent.click(getByText("Movie 1"));

        expect(getByText("SeatSelection")).toBeTruthy();
    });

    it('should render revenue when admin is viewing', () => {
        const showsComponent = mount(
            <UserContext.Provider value={{
                userDetails: mockUserDetails
            }}>
                <Shows history={testHistory} location={testLocation} />
            </UserContext.Provider>
        );
        const showsRevenueComponent = showsComponent.find(ShowsRevenue);

        expect(showsRevenueComponent.length).toBe(1);
    });

    it('should not render revenue when customer is viewing', () => {
        const showsComponent = mount(
            <UserContext.Provider value={{
                userDetails: mockUserDetails.role = "CUSTOMER"
            }}>
                <Shows history={testHistory} location={testLocation} />
            </UserContext.Provider>
        );
        const showsRevenueComponent = showsComponent.find(ShowsRevenue);

        expect(showsRevenueComponent.length).toBe(0);
    });

    it('Should displays movie poster', () => {
        const { getAllByTestId } = render(<Shows history={testHistory} location={testLocation} />);

        const poster = getAllByTestId('movie-poster');

        expect(poster).toBeTruthy();
    });

    it('should render previous day button and next day button when admin is viewing', () => {
        const showsComponent = mount(
            <UserContext.Provider value={{
                userDetails: mockUserDetails
            }}>
                <Shows history={testHistory} location={testLocation} />
            </UserContext.Provider>
        );
        const previousDayButton = showsComponent.find(ArrowBackIcon);
        const nextDayButton = showsComponent.find(ArrowForwardIcon);

        expect(previousDayButton.length).toBe(1);
        expect(nextDayButton.length).toBe(1);
    });
});