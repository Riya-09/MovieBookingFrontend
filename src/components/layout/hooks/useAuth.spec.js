import { act, renderHook } from "@testing-library/react-hooks";
import useAuth from "./useAuth";
import { isLoggedIn, login, logout, restoreUserDetails } from "../../../helpers/authService";
import { when } from "jest-when";
import { waitFor } from "@testing-library/react";

jest.mock("../../../helpers/authService", () => ({
    __esModule: true,
    isLoggedIn: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    restoreUserDetails: jest.fn()
}));

describe("Basic logic", () => {
    const mockUserDetails = {
        username: "test-user",
        email: "test-user@tw.com",
        phone: "9876543210",
        role: "CUSTOMER"
    };

    it("should restore user's logged in status initially", async () => {
        isLoggedIn.mockReturnValue(true);
        restoreUserDetails.mockResolvedValue(mockUserDetails);
        const renderHookResult = renderHook(() => useAuth());
        const { result, waitForNextUpdate } = renderHookResult;
        const expectedUserDetails = {
            process: false,
            value: mockUserDetails
        }

        await waitForNextUpdate();

        const { userDetails } = result.current;
        await waitFor(() => expect(userDetails).toEqual(expectedUserDetails));
    });

    it("should login successfully", async () => {
        const testUsername = "testUsername";
        const testPassword = "testPassword";
        isLoggedIn.mockReturnValue(false);
        const renderHookResult = renderHook(() => useAuth());
        const { result } = renderHookResult;
        when(login).calledWith(testUsername, testPassword).mockResolvedValue("userDetails");
        const expectedUserDetails = {
            process: false,
            value: "userDetails"
        }
        const { handleLogin } = result.current;

        let userDetailsTest;
        await act(async () => {
            userDetailsTest = await handleLogin(testUsername, testPassword);
        });

        const { userDetails } = result.current;
        expect(userDetailsTest).toBe("userDetails");
        expect(userDetails).toEqual(expectedUserDetails);
    });

    it("should not login if not authenticated", async () => {
        const testUsername = "testUsername";
        const testPassword = "testPassword";
        isLoggedIn.mockReturnValue(false);
        const renderHookResult = renderHook(() => useAuth());
        const { result } = renderHookResult;
        when(login).calledWith(testUsername, testPassword).mockRejectedValue("unused");
        const expectedUserDetails = {
            process: false,
            value: null
        }
        const { handleLogin } = result.current;

        try {
            await act(async () => {
                await handleLogin(testUsername, testPassword);
                fail("Should not authenticate");
            });
        } catch (e) {
            const { userDetails } = result.current;
            expect(userDetails).toEqual(expectedUserDetails);
        }
    });

    it("should logout successfully", () => {
        isLoggedIn.mockReturnValue(true);
        restoreUserDetails.mockResolvedValue(mockUserDetails);
        const renderHookResult = renderHook(() => useAuth());
        const { result, waitForNextUpdate } = renderHookResult;
        const expectedUserDetails = {
            process: true,
            value: null
        }
        const { handleLogout } = result.current;

        waitForNextUpdate();
        act(() => {
            handleLogout();
        });

        const { userDetails } = result.current;
        expect(logout).toBeCalled();
        expect(userDetails).toEqual(expectedUserDetails);
    });
});