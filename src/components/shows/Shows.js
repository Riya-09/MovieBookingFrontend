import React, { useState, useEffect, useContext } from "react";
import {
    Avatar,
    Backdrop,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import styles from "./styles/showsStyles"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import useShows from "./hooks/useShows";
import { HEADER_DATE_FORMAT, INR_SYMBOL } from "../../Constants"
import { dateFromSearchString, nextDateLocation, previousDateLocation } from "./services/dateService";
import ShowsRevenue from "./ShowsRevenue";
import useShowsRevenue from "./hooks/useShowsRevenue";
import SeatSelectionDialog from "./SeatSelectionDialog";
import UserContext from "../context/UserContext";
import queryString from 'query-string';
import moment from "moment";


export default ({ location, history }) => {
    const { search } = location;
    const classes = styles();
    const userContext = useContext(UserContext);
    const userDetails = userContext.userDetails;
    const todayDate = moment().format("YYYY-MM-DD");

    const showsDate = dateFromSearchString(location.search);
    const { shows, showsLoading } = useShows(showsDate);
    const { showsRevenue, updateShowsRevenue, showsRevenueLoading } = useShowsRevenue(showsDate,userDetails && userDetails.role === "ADMIN");
    const [showSelectSeatDialog, setShowSelectSeatDialog] = useState(false);
    const [isHousefull, setHousefull] = useState(false);
    const emptyShow = {
        "id": "",
        "date": "",
        "cost": "",
        "movie": {
            "id": "",
            "name": "",
            "duration": "",
            "plot": "",
            "imdbRating": "",
            "genre": "",
            "poster": ""
        },
        "slot": {
            "id": "",
            "name": "",
            "startTime": "",
            "endTime": ""
        },
        "totalNumberOfSeats": "",
        "noOfBookedSeats": ""
    };
    const [selectedShow, setSelectedShow] = useState(emptyShow);

    const checkHousefull = (show) => {
        if (100 <= show.noOfBookedSeats) {
            setHousefull(true);
        }
        else setHousefull(false);
    }
  
    useEffect(() => {

        //history.push('/login');

    },[]);
    const renderPreviousDayButton = () => {
        const values = queryString.parse(search);
        const isFutureDated = values && values.date > todayDate;
        if ((userDetails && userDetails.role === "ADMIN" )|| isFutureDated) {
            return (
                <Button
                    onClick={() => {
                        history.push(previousDateLocation(location, showsDate));
                    }}
                    startIcon={<ArrowBackIcon />}
                    color="primary"
                    className={classes.leftNavigationButton}
                    id="previousDay"
                >
                    Previous Day
                </Button>
            )
        }
        else {
            return (
                <Button
                    startIcon={<ArrowBackIcon />}
                    color="primary"
                    className={classes.leftNavigationButton}
                    id="previousDay"
                    disabled="true"
                >
                    Previous Day
                </Button>
            )
        }
    }

    const renderNextDayButton = () => {
        const values = queryString.parse(search);
        const dateTo = moment().add(6, 'd').format('YYYY-MM-DD');
        const isFutureSevenDated = values && values.date < dateTo;
        if ((userDetails && userDetails.role === "ADMIN") || isFutureSevenDated) {
            return (
                <Button
                    onClick={() => {
                        
                        history.push(nextDateLocation(location, showsDate));
                    }}
                    endIcon={<ArrowForwardIcon />}
                    color="primary"
                    className={classes.rightNavigationButton}
                >
                    Next Day
                </Button>
            )
        }
        else {
            return (
                <Button
                    startIcon={<ArrowForwardIcon />}
                    color="primary"
                    className={classes.rightNavigationButton}
                    id="previousDay"
                    disabled="true"
                >
                    Next Day
                </Button>
            )
        }
    }

    return (
        <>
            <div className={classes.cardHeader}>
                <Typography variant="h4" className={classes.showsHeader}>
                    Shows ({showsDate.format(HEADER_DATE_FORMAT)})
                </Typography>
                {userDetails && userDetails.role === "ADMIN" && <ShowsRevenue showsRevenue={showsRevenue} showsRevenueLoading={showsRevenueLoading} />}
            </div>
            <List className={classes.listRoot}>
                {
                    shows.map(show => (
                        <div key={show.id} className={classes.showContainer}>
                            <ListItem style={{ cursor: 'pointer' }} onClick={() => {
                                setSelectedShow(show);
                                checkHousefull(show);
                                setShowSelectSeatDialog(true);
                            }}>
                                <ListItemAvatar classes={{ root: classes.localMoviesIcon }}>
                                    <Avatar src={show.movie.poster} className={classes.large} variant='rounded' alt={show.movie.name} data-testid="movie-poster" />
                                </ListItemAvatar>
                                <ListItemText className={classes.movieName} primary={show.movie.name} secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.slotTime}
                                            color="textPrimary"
                                        >
                                            {show.slot.startTime}
                                        </Typography>
                                    </>
                                } />
                                <ListItemText primary={`${INR_SYMBOL}${show.cost}`} className={classes.price}
                                    primaryTypographyProps={{ variant: 'h6', color: 'secondary' }}
                                />
                            </ListItem>
                        </div>
                    ))
                }
            </List>

            <SeatSelectionDialog selectedShow={selectedShow} updateShowsRevenue={updateShowsRevenue}
                open={showSelectSeatDialog}
                onClose={() => setShowSelectSeatDialog(false)} isHousefull={isHousefull} history={history}/>

            <div className={classes.buttons}>
                {renderPreviousDayButton()}
                {renderNextDayButton()}
            </div>
            <Backdrop className={classes.backdrop} open={showsLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};
