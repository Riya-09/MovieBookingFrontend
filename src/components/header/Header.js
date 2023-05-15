import React, {useEffect } from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import MovieIcon from '@material-ui/icons/Movie';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import styles from "./styles/headerStyles";
import PropTypes from "prop-types";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { Link } from "react-router-dom";
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
// import { useHistory } from "react-router-dom";

const Header = ({onLogout, isAuthenticated}) => {
    const classes = styles();
    // let history = useHistory();
    const logoutSection = () => {
        if (isAuthenticated) {
            return (
                <div onClick={onLogout} className={classes.logoutLink}>
                    <ExitToAppIcon/>
                    <Typography className={classes.headerLogo} variant="body1">
                        Logout
                    </Typography>
                </div>
            );
        }else{
            return (
                <Link to="/login" className={classes.whiteColor}>
                <div className={classes.logoutLink}>
                    <Typography className={classes.headerLogo} variant="body1">
                        Login/ Sign-Up
                    </Typography>
                </div>
                </Link>
            );
        }
    };

    
    const profileSection = () => {
        if (isAuthenticated) {
            return (
                <Link to="/profile" className={classes.whiteColor}>
                <div className={ `${classes.logoutLink} ${classes.marginRight2}`}>
                      <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                </div>
                </Link>
            );
        }
    };


    return (
        <AppBar position={"sticky"}>
            <Toolbar className={classes.toolbar}>
                <Link to="/" className={classes.headerLink}>
                    <MovieIcon className={classes.cinemaLogoIcon}/>
                    <Typography className={classes.headerLogo} variant="h5">
                        SkyFox Cinema
                    </Typography>
                </Link>
                <div className={classes.rightNav}>
                    {profileSection()}
                    {logoutSection()}
                </div>
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {
    onLogout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default Header;
