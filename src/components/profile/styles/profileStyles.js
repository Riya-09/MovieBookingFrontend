import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
      textAlign: "center",
      marginTop: "50px",
      marginBottom: "30px"
    },
    btns:{
        '& > *': {
        margin: theme.spacing(1),
      },
        marginTop: "40px",
        marginBottom: "30px"

    },
    logoutLink:{
        textDecoration:'none',
        color: theme.palette.primary.contrastText
    },
    box:{
      //height:"40vh"
    },
    dialogButton:{
      marginBottom: "20px"
    }
    
  }));