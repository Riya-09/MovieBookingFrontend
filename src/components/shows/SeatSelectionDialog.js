import { Button, Dialog, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect, useContext } from "react";
import styles from "./styles/seatSelectionDialogStyles"
import CustomerDetailsDialog from "./CustomerDetailsDialog";
import { INR_SYMBOL } from "../../Constants";
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import StarRateIcon from '@material-ui/icons/StarRate';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import cover from '../../../src/App.css';
import SeatMap from "./SeatMap";
import moment from "moment";
import UserContext from "../context/UserContext";
import seatMapService from "./services/seatMapService";
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import LoginDialog from "./LoginDialog";




const SeatSelectionDialog = ({ selectedShow, updateShowsRevenue, open, onClose, isHousefull, history }) => {
    const [showCustomerDetails, setShowCustomerDetails] = useState(false);
    const [showSeatMap, setshowSeatMap] = useState(false);
    const [seats, setSeats] = useState("1");
    const classes = styles();
    const userContext = useContext(UserContext);
    const userDetails = userContext.userDetails;
    const [notAvailableSeat, setNotAvailableSeat] = useState([]);
    const [showAlertToLogin, SetShowAlertToLogin] = useState(false);
    const [showMapForBooking, setShowMapForBooking] = useState(false);
    const [bookButtonToBeDisabled, setBookButtonToBeDisabled] = useState(false);
    const [openAlert, setOpenAlert] = React.useState(true);

    const handleClose = () => {
        setSeats("1");
        onClose();
    };

    useEffect(() => {

        console.log("Selected show", selectedShow)

    }, [selectedShow]);

    const getSeatMap = async () => {
        const response = await seatMapService.fetchMap(selectedShow.date, selectedShow.id);
        setNotAvailableSeat(response);
    }
    // const hideAlert= ()=> {
    //     this.setState({
    //       SetShowAlertToLogin: false,
    //     });
    //   }

    const checkIfAlreadyLoggedInOrNot = () => {
        if (userDetails != null) {
            setShowMapForBooking(true);
            console.log(showMapForBooking);
            return true;
        } else {
            SetShowAlertToLogin(true);
            setBookButtonToBeDisabled(true);
            console.log(showAlertToLogin);
            setShowMapForBooking(false);
            // SetShowAlertToLogin(false);
            return false;
        }
    }

    const renderBookButton = () => {
        const showStartTime = moment(selectedShow.slot.startTime, ["h:mm A"]).format("HH:mm");
        const currentTime = moment().format("HH:mm");
        const showDate = selectedShow.date;
        const currentDate = moment().format("YYYY-MM-DD");


        if ((userDetails && userDetails.role === "ADMIN") || showDate > currentDate || (showDate === currentDate && currentTime < showStartTime)) {
            return (
                <Button variant="contained" color="primary" data-testid="bookButton"
                    onClick={() => {
                        var returnBoolean = checkIfAlreadyLoggedInOrNot();
                        if ((returnBoolean)) {
                            getSeatMap();
                            setshowSeatMap(true);


                            onClose();
                        } else {
                            console.log(showAlertToLogin);
                        }


                    }}
                    className={classes.dialogButton}
                    disabled={isHousefull || bookButtonToBeDisabled}
                >
                    Book
                </Button>
            )
        } else {
            return (
                <Button variant="contained" color="primary"
                    disabled="true"
                    className={classes.dialogButton}
                >
                    Book
                </Button>
            )
        }
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth classes={{
                paper: classes.dialogRoot
            }}>
                <MuiDialogTitle disableTypography className={classes.dialogTitleRoot} >
                    <Typography gutterBottom variant="h3" component="h1" color="primary">
                        {selectedShow.movie.name}
                    </Typography>
                    {onClose ? (
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </MuiDialogTitle>

                <Card className={classes.cardRoot}>
                    <CardMedia
                        component="img"
                        alt="Movie Poster"
                        className={classes.cover}
                        image={selectedShow.movie.poster}
                        title={selectedShow.movie.name}
                        data-testid="Poster"
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <div className={classes.rating}>
                                <StarRateIcon className={classes.ratingIcon} />
                                <Typography variant="body2" component="p" className={classes.ratingIcon}>
                                    IMDB Rating : <b>{selectedShow.movie.imdbRating}</b>
                                </Typography>
                                <Typography variant="body2" className={classes.rated} data-testid="rated">
                                    ({selectedShow.movie.rated})
                                </Typography>
                            </div>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {selectedShow.movie.plot}
                            </Typography>
                            <Typography variant="body2" color="secondary" className={classes.movieMarquee} data-testid="duration and genre">
                                {selectedShow.movie.duration}  •  {selectedShow.movie.genre}
                            </Typography>
                            <br></br>
                            <br></br>
                            {isHousefull && <div data-testid="housefull" className={classes.housefull}>HOUSEFULL!!!</div>}
                        </CardContent>
                        <div className={classes.controls}>
                            {renderBookButton()}

                        </div>

                    </div>
                </Card>
            </Dialog>
            <LoginDialog open={showAlertToLogin} onClose={() => {
                SetShowAlertToLogin(false);
                setBookButtonToBeDisabled(false);
            }} history={history}></LoginDialog>

            <CustomerDetailsDialog seats={seats} selectedShow={selectedShow} updateShowsRevenue={updateShowsRevenue}
                open={showCustomerDetails} onClose={() => {
                    handleClose();
                    setShowCustomerDetails(false)
                }} />

            <SeatMap open={showSeatMap} onClose={() => {
                handleClose();
                setshowSeatMap(false)
            }} seats={seats} selectedShow={selectedShow} updateShowsRevenue={updateShowsRevenue} notAvailableSeat={notAvailableSeat}></SeatMap>
        </>
    );
}

SeatSelectionDialog.propTypes = {
    selectedShow: PropTypes.object.isRequired,
    updateShowsRevenue: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default SeatSelectionDialog;
