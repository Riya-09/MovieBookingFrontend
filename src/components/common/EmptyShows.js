import React from "react";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import {Typography} from "@material-ui/core";
import styles from "./styles/emptyShowStyles";
import PropTypes from "prop-types";

const EmptyShows = ({emptyShowsMessage}) => {
    const classes = styles();

    return (
        <div className={classes.emptyShowsLayout}>
            <div className={classes.emptyShowsContainer}>
                <HourglassEmptyIcon className={classes.emptyShowsIcon}/>
                <Typography variant="h5">
                    {emptyShowsMessage}
                </Typography>
            </div>
        </div>
    );
};

EmptyShows.propTypes = {
    emptyShowsMessage: PropTypes.string.isRequired,
};

export default EmptyShows;
