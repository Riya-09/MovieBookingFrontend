import axios from "axios";
import {when} from "jest-when";
import {urls} from "../config/env-config";
import {authHeader, isLoggedIn, login, logout} from "./authService";

jest.mock("axios", () => ({
    get: jest.fn(),
}));

describe("Basic logic", () => {
    const testUsername = "testUsername";
    const testPassword = "testPassword";
    const expectedToken = "testUsername:testPassword";

    beforeAll(() => {
        window.btoa = (data) => data;
    });

    it("should set auth header if logged in successfuly", async () => {
        const testConfig = {
            headers: {
                Authorization: 'Basic testUsername:testPassword'
            }
        };
        when(axios.get)
            .calledWith(`${urls.service}/login`, testConfig)
            .mockResolvedValue({data: "userDetails"});

        const actualUserDetails = await login(testUsername, testPassword);

        expect(actualUserDetails).toBe("userDetails");
        expect(localStorage.getItem("skyfox_token")).toBe(expectedToken);
    });

    it("should not set auth header if not logged in", async () => {
        const testConfig = {
            headers: {
                Authorization: 'Basic testUsername:testPassword'
            }
        };
        when(axios.get)
            .calledWith(`${urls.service}/login`, testConfig)
            .mockRejectedValue("unused");

        try {
            await login(testUsername, testPassword);
            fail("Should not login successfuly");
        } catch (e) {
            expect(localStorage.getItem("skyfox_token")).toBe(null);
        }
    });

    it("should return correct auth header", async () => {
        const testConfig = {
            headers: {
                Authorization: 'Basic testUsername:testPassword'
            }
        };
        when(axios.get)
            .calledWith(`${urls.service}/login`, testConfig)
            .mockResolvedValue("unused");

        await login(testUsername, testPassword);
        const actualAuthHeader = authHeader();

        expect(actualAuthHeader).toEqual(testConfig);
    });

    it("should return if user is logged in correctly", async () => {
        const testConfig = {
            headers: {
                Authorization: 'Basic testUsername:testPassword'
            }
        };
        when(axios.get)
            .calledWith(`${urls.service}/login`, testConfig)
            .mockResolvedValue("unused");

        await login(testUsername, testPassword);
        const actualIsLoggedIn = isLoggedIn();

        expect(actualIsLoggedIn).toBe(true);
    });

    it("should logout user successfuly", async () => {
        const testConfig = {
            headers: {
                Authorization: 'Basic testUsername:testPassword'
            }
        };
        when(axios.get)
            .calledWith(`${urls.service}/login`, testConfig)
            .mockResolvedValue("unused");

        await login(testUsername, testPassword);
        logout();
        const actualIsLoggedIn = isLoggedIn();

        expect(actualIsLoggedIn).toBe(false);
        expect(localStorage.getItem("skyfox_token")).toBe(null);
    });

    afterEach(() => {
        localStorage.removeItem("skyfox_token");
    });
});
