import {renderHook} from "@testing-library/react-hooks";
import useShowsRevenue from "./useShowsRevenue";
import showsService from "../services/showsService";
import moment from "moment";
import {when} from "jest-when";


jest.mock("../services/showsService", () => ({
    __esModule: true,
    default: {
        getRevenue: jest.fn()
    }
}));

describe("Basic logic", () => {
    let showDate;
    
    beforeEach(() => {
        showDate = moment("2020-01-01", "YYYY-MM-DD");
        when(showsService.getRevenue).calledWith("2020-01-01").mockResolvedValue(549.99);
       
    });

    it("Should initialize the hook with zero shows revenue and loading", () => {
        const {result} = renderHook(() => useShowsRevenue(showDate,true));

        const {showsRevenue, showsRevenueLoading} = result.current;

        expect(showsRevenue).toEqual(0);
        expect(showsRevenueLoading).toBe(true);
    });

    it("Should get shows revenue and finish loading after mount", async () => {

        const {result, waitForNextUpdate} = renderHook(() => useShowsRevenue(showDate,true));

        await waitForNextUpdate();
        const {showsRevenue, showsRevenueLoading} = result.current;

        expect(showsRevenue).toEqual(549.99);
        expect(showsRevenueLoading).toBe(false);
    });
});
