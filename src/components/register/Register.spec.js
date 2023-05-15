import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Register from "./Register";
import { when } from "jest-when";

jest.mock("moment");

describe("Basic rendering and functionality", () => {

    const userInfoToBeRegistered = {
        username: 'user',
        email: 'user1@gmail.com',
        phoneNumber: '9876543212',
        password: 'Sprite@26',
        reenterPassword: 'Sprite@26'

    };
    const handleRegister = jest.fn();

    const testHistory = { push: jest.fn() };
    it("Should call register service api to create customer account on register", async () => {

        const { getByTestId } = render(<Register values={userInfoToBeRegistered} history={testHistory} />);
        var returnedPayload = when(handleRegister).calledWith({
            username: 'user',
            email: 'user1@gmail.com',
            phoneNumber: '9876543212',
            password: 'Sprite@26',
            reenterPassword: 'Sprite@26'

        })
            .mockResolvedValue("");

        console.log(returnedPayload['Object']);
        returnedPayload = returnedPayload;

        fireEvent.change(getByTestId("name"), {
            target: {
                value: "user"
            }
        });

        fireEvent.change(getByTestId("email"), {
            target: {
                value: "user1@gmail.com"
            }
        });

        fireEvent.change(getByTestId("phoneNumber"), {
            target: {
                value: "9876543212"
            }
        });

        fireEvent.change(getByTestId("password"), {
            target: {
                value: "Sprite@26"
            }
        });
        fireEvent.change(getByTestId("confirmPassword"), {
            target: {
                value: "Sprite@26"
            }
        });

        fireEvent.click(getByTestId("registerButton"));

        await expect(returnedPayload).toBeTruthy();

    });
})