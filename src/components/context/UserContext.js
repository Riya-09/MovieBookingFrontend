import React from "react";

const user = {
    userDetails: {
        username: '',
        email: '',
        phone: '',
        role: ''
    },
    isAuthenticated: false,
    handleLogin: () => { },
    handleSignup: () => { },
    handleRegister: () => { }
};

export default React.createContext(user);