import React, {useEffect} from "react";
import {Form, Formik} from "formik";
import {FormikTextField} from "../formik";
import {Button} from "@material-ui/core";
import styles from "./styles/loginStyles"
import PropTypes from "prop-types";
import useLogin from "./hooks/useLogin";
import {formSchema, initialValues} from "./services/loginFormService";



const Login = ({location, history, isAuthenticated, onLogin}) => {
    const classes = styles();
    const {from} = location.state || {from: {pathname: "/"}};
    const {errorMessage, handleLogin} = useLogin(onLogin);

    useEffect(() => {
        if (isAuthenticated) {
            history.replace(from);
        }
    });

    const loadRegister=()=>{
        history.replace("/register");
    }

    return (
        <div className={classes.loginContainer}>
            <Formik initialValues={initialValues}
                    onSubmit={handleLogin}
                    validationSchema={formSchema}>
                {
                    (props) => {
                        const {
                            isValid,
                        } = props;
                        return (
                            <Form className={classes.loginForm}>
                                <FormikTextField
                                    required
                                    margin="dense"
                                    name="username"
                                    label="Email"
                                />
                                <FormikTextField
                                    required
                                    type="password"
                                    margin="dense"
                                    name="password"
                                    label="Password"
                                />
                                {
                                    errorMessage()
                                }
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={!isValid}
                                    color="primary"
                                    className={classes.loginButton}
                                >
                                    Login
                                </Button>
                                
                                
                                <Button
                                    variant="contained"
                                    onClick={loadRegister}
                                    color="primary"
                                    className={classes.loginButton}
                                >
                                    New User? Register
                                </Button>
                            </Form>
                        );
                    }
                }
            </Formik>
        </div>
    );
}

Login.propTypes = {
    location: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired
};

export default Login;
