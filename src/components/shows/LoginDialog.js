import React from 'react'
import { Dialog, DialogContent, Typography, Button } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styles from "./styles/seatSelectionDialogStyles";
import MuiDialogTitle from '@material-ui/core/DialogTitle';


const LoginDialog = ({ open, onClose, history }) => {
    const classes = styles();
    const handleClose = () => {
        onClose();
    };

    const redirectToLogin = () => {
        history.push('/login');
    }
    return (<>
        <Dialog open={open} >


            <MuiDialogTitle disableTypography className={classes.dialogTitleRoot} >
                <Typography gutterBottom variant="h3" component="h1" color="primary">

                </Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
            <Typography variant="h6" className={classes.loginDialogTitle}>

                Please Login to Book Tickets.

            </Typography>

            <DialogContent className={classes.loginDialogFooter}>
                <Button className={classes.redirectButton} variant="contained" color="primary" onClick={
                    () => {
                        redirectToLogin();
                    }
                }>Ok</Button>

            </DialogContent>
        </Dialog>
    </>
    )
}

export default LoginDialog;