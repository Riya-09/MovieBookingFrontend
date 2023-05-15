import React from "react";
import Layout from "./Layout";
import Header from "../header/Header";
import RootRouter from "../router/RootRouter";
import useAuth from "./hooks/useAuth";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

const testHandleLogin = jest.fn();
const testHandleLogout = jest.fn();

jest.mock("./hooks/useAuth", () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Basic rendering', function () {

    const mockUserDetails = {
        username: "test-user",
        email: "test-user@tw.com",
        phone: "9876543210",
        role: "CUSTOMER"
    };

    it("Should render correctly", () => {
        useAuth.mockReturnValue({
            userDetails: {
                process: false,
                value: mockUserDetails
            },
            isAuthenticated: true,
            handleLogin: testHandleLogin,
            handleLogout: testHandleLogout,
        });

        const wrapper = mount(
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        );

        const layoutComponent = wrapper.find(Layout);

        expect(layoutComponent.exists(Header)).toBeTruthy();
        expect(layoutComponent.exists(RootRouter)).toBeTruthy();
    })
});