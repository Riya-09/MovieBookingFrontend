import React from "react";
import { when } from 'jest-when';
import Profile from './Profile';
import { render } from "@testing-library/react";
import useProfile from './hooks/useProfile';


jest.mock("./services/profileService", () => ({
    getUsername: jest.fn(),
}));

jest.mock("./hooks/useProfile", () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useHistory: () => ({ push: jest.fn() })
}));

describe("Basic rendering and functionality", () => {
    it("shold display username", () => {
        let testHistory;
        testHistory = {
            push: jest.fn()
        };
        const testHandleLogin = jest.fn();
        const testHandleLogout = jest.fn();

        when(useProfile).calledWith().mockReturnValue({ username: "test-user-1" });
        const { getByTestId } = render(<Profile onLogin={testHandleLogin} onLogout={testHandleLogout} />);
        const username = getByTestId('username');

        expect(username).toBeTruthy();

    });
})