import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) =>
({
    cardRoot: {
        display: "flex",
    },
    dialogRoot: {
        overflow: "hidden",
        minHeight: "30vh",
        maxHeight: "80vh"
    },
    container: {
        display: "flex",
        flexDirection: "column"
    },
    dialogHeader: {
        fontWeight: "bold",
        padding: "10px 0px 20px 10px"
    },
    dialogContent: {
        display: "flex",
        flexDirection: "row"
    },
    moviePicture: {
        display: "flex",
        justifyContent: "center",
        minWidth: "15%",
    },
    dialogMain: {
        display: "flex",
        padding: "0px 20px 20px 0px",
        flexDirection: "column",
        justifyContent: "space-between",
        minWidth: "85%",
        maxWidth: "85%"
    },
    movieMarquee: {
        fontWeight: "bold",
        display: "flex",
    },
    rated: {
        fontWeight: "bold",
        display: "flex",
        marginLeft: "auto",
        color: "#ff5c5c",
        marginRight: "5px",
    },
    seatsSelector: {
        maxWidth: "50%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dialogBottom: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: "20px 0px 0px 0px"
    },
    dialogButton: {
        margin: "auto",
    },
    ratingIcon: {
        color: "#96056f",
    },
    rating: {
        display: "flex",
        fontWeight: "bold",
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    cover: {
        width: 280,
        height: 450,
        objectFit: "scale-down",
        margin: "0px 0px 15px 15px",
    },
    content: {
        flex: '1 0 auto',
    },
    controls: {
        textAlign: 'right',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    amount: {
        margin: "auto",
    },
    dialogueTitleRoot: {
        margin: "15px 15px 15px 0px",
    },
    loginDialogTitle: {
        margin: "15px 15px 15px 0px",
        padding: theme.spacing(1),
        color: "red",
        //     font-size: 1.25rem;
        // font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        // font-weight: 500;
        // padding: 0.5rem;
        // line-height: 1.6;
        // letter-spacing: 0.0075em;

    },
    loginDialogFooter: {
        textAlign: "center",
    },
    redirectButton: {
        color: "black"
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    housefull: {
        color: "red",
        textAlign: "center",
        fontWeight: "bolder"
    }
})
);
