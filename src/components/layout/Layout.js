import React from 'react';
import RootRouter from "../router/RootRouter";
import useAuth from "./hooks/useAuth";
import UserContext from "../context/UserContext";
import {Backdrop, Box, Card, CircularProgress, Container} from "@material-ui/core";

export default () => {
    const { userDetails, isAuthenticated, handleLogin, handleLogout, handleRegister } = useAuth();

    if (userDetails.process) {
        return (
            <Backdrop open={true}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        );
    }    

    return (
        <UserContext.Provider value={{
            userDetails: userDetails.value,
            isAuthenticated,
            handleLogin,
            handleRegister,
            handleLogout
        }}>
            <RootRouter isAuthenticated={isAuthenticated} onLogin={handleLogin} onRegister={handleRegister} onLogout={handleLogout} />
        </UserContext.Provider>
    )
};
