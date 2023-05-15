// noinspection ES6CheckImport
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import Shows from "../shows/Shows";
import Profile from "../profile/Profile"
import form from "../profile/form";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import BlockIcon from '@material-ui/icons/Block';
import { Error } from "../common";
import { Login, ProtectedRoute } from "../login";
import PropTypes from "prop-types";
import moment from "moment";
import Register from "../register/Register"
import { Box, Card, Container } from "@material-ui/core";
import Header from "../header/Header";
import styles from "../layout/styles/layoutStyles";

const RootRouter = ({ isAuthenticated, onLogin, onRegister, onLogout }) => {
    const todayDate = moment().format("YYYY-MM-DD");
    const classes = styles();

    return (
        <Box>
            <Router>
                <Header onLogout={onLogout} onLogin={onLogin} isAuthenticated={isAuthenticated} />
                <Container maxWidth={false} className={classes.container}>
                    <Card>
                        <Switch>

                            <Redirect path="/" exact to={`/shows?date=${todayDate}`} />
                            {/* <Route  path="/shows"   component={Shows} /> */}
                            <ProtectedRoute exact path="/shows" component={Shows} isAuthenticated={isAuthenticated} />

                            <Route exact path="/login"
                                component={(props) => <Login isAuthenticated={isAuthenticated} onLogin={onLogin} {...props} />} />

                            <Route exact path="/profile" component={() => <Profile Login={onLogin} onLogout={onLogout} />} />
                            <Route exact path="/register" component={(props) => <Register isAuthenticated={isAuthenticated} onRegister={onRegister} {...props} />} />

                            <Route exact path="/error" component={
                                () => <Error errorIcon={ErrorOutlineIcon} errorMessage={"Oops..Something went wrong"} />
                            }
                            />

                            <Route component={
                                () => <Error errorIcon={BlockIcon} errorMessage={"Not Found"} />
                            } />
                        </Switch>
                    </Card>
                </Container>


            </Router>

        </Box>
    );
};

RootRouter.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
};

export default RootRouter;
