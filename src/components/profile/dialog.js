import React , {useEffect,useState}  from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom';
import {logout} from "../../helpers/authService";

const styles = (theme) =>
  createStyles({
    root: {
      margin: 20,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });



const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({children,title,onLogout}) {
  const [open, setOpen] = React.useState(false);
  const [redirect,setRedirect] = React.useState(false);

  let history=useHistory();

  const handleClickOpen = () => {
    setOpen(true);
    console.log("opened");
  };
  const handleClose = () => {
    setOpen(false);
    console.log("closed");
  };

  return (
    <div>
      <Button variant ="contained" color="primary" onClick={handleClickOpen}>
        Change Password
      </Button>
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
        </DialogTitle>
        <DialogContent dividers>
          {children}
        </DialogContent>
       
      </Dialog>
    </div>
  );
}