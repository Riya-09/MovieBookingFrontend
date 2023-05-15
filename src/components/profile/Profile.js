import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import styles from "./styles/profileStyles";
import customerDetailsDialogStyles from "../shows/styles/customerDetailsDialogStyles";
import RegistrationForm from './form';
import CustomizedDialogs from './dialog';
import useProfile from "./hooks/useProfile";
import {Box, Card, Container,Typography} from "@material-ui/core";

export default ({onLogin,onLogout}) => {

    const classes = styles();

    const {user} = useProfile();



    return(
        <Box className={classes.box}>
            <Container maxWidth={false} className={classes.container}>

            <h2>User Profile</h2>
            <Typography variant="subtitle1"  gutterBottom>Username</Typography>
            <Typography variant="subtitle2" gutterBottom data-testid="username"> {user} </Typography>
            <br/>

            <div className={customerDetailsDialogStyles.root}>
            <CustomizedDialogs className="classes.dialogButton" title="Change Password" onLogout={onLogout}>
                <RegistrationForm  onLogout={onLogout}/>
            </CustomizedDialogs>
            </div>
            <br/>
            <br/>
            
            </Container>
        </Box>
            
            
            

        
        

    );
};