import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        registerContainer: {
            padding: "20px 40px",
            maxWidth: "480px",
            width: "100%",
            margin: "auto"
        },
        registerForm: {
            flexDirection: "column"
        },
        registerButton: {
            marginTop: "15px"
        },
        registerErrorMessage: {
            marginTop: "8px"
        },
        countryCode: {
            display: 'flex',
            alignItems: 'baseline',
        },
    })
);
