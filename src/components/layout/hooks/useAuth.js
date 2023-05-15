import { useEffect, useState } from "react";
import { restoreUserDetails, isLoggedIn, login, logout, register } from "../../../helpers/authService";

const defaultDetails = {
    process: true,
    value: null
}

export default () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState(defaultDetails);

    useEffect(() => {
        setIsAuthenticated(isLoggedIn());
    }, []);

    useEffect(() => {
        if (isLoggedIn()) {
            restoreUserDetails().then(userDetails => setUserDetails({
                process: false,
                value: userDetails
            })).catch(() => {
                handleLogout();
            });
        }
        else {
            setUserDetails({
                process: false,
                value: null
            })
        }
    }, []);

    const handleLogin = async (username, password) => {
        const userDetails = await login(username, password);
        setUserDetails({
            process: false,
            value: userDetails,
        });
        setIsAuthenticated(true);
        return userDetails;
    };

    const handleRegister = async (details) => {
        const userDetails = await register(details);
        setTimeout(() => {
            setUserDetails({
                process: false,
                value: userDetails,
            });
            setIsAuthenticated(true);
        }, 3000);
        return userDetails;
    };


    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
        window.location = "/"
    };

    return {
        userDetails: userDetails,
        isAuthenticated: isAuthenticated,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        handleRegister: handleRegister
    };
}
