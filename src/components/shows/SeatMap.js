import { Dialog, Typography, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./styles/seatMapStyles";
import { SEAT_MAP } from "../../Constants";
import BookingConfirmation from "./BookingConfirmation";
import bookingService from "./services/bookingService";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import profileService from "../profile/services/profileService"

const SeatMap = ({ selectedShow, updateShowsRevenue, open, onClose, notAvailableSeat }) => {
  const classes = styles();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState({});
  const [showMaxSelect, setMaxSelect] = React.useState(false)

  const [seats] = useState("1");

  const [seat] = useState(SEAT_MAP);

  const [seatAvailable, setSeatAvailable] = useState(SEAT_MAP);

  const [seatReserved, setSeatReserved] = useState([]);

  const [user, setUser] = useState();
  const [mobileNumber, setMobileNumber] = useState();

  useEffect(() => {
  
    if(open === true){
      profileService.getUsername().then(response => {

        setUser(response.username);
        setMobileNumber(response.mobileNumber);

    });

    }
  
}, [open]);


  const bookShow = async (values) => {

    const payload = {
      date: selectedShow.date,
      showId: selectedShow.id,
      customer:
      {
        name: user,
        phoneNumber: mobileNumber
      },
      noOfSeats: seatReserved.length,
      bookCases: seatReserved
    };

    try {
      const response = await bookingService.create(payload);
      updateShowsRevenue();
      setBookingConfirmation(response.data)
      return true;

    } catch (error) {
      alert(error.response.data.details[0]);
      window.location.assign("/");
      return false;
    } finally {
      onClose();
    }
  };

  const onClickData = (seatClicked) => {
    if (seatReserved.indexOf(seatClicked) > -1) {
      setSeatAvailable(seatAvailable.concat(seatClicked));
      setSeatReserved(seatReserved.filter(res => res !== seatClicked));
      if (seatReserved.length <= 15) {
        setMaxSelect(false);
      }
    } else {
      if (seatReserved.length === 15) {
        setMaxSelect(true);
        return null;
      }
      setSeatReserved(seatReserved.concat(seatClicked));
      setSeatAvailable(seatAvailable.filter(res => res !== seatClicked));
    }
  }

  const handleClose = () => {
    setSeatReserved([]);
    onClose();
  };

  const MaxSeatSelection = () => (
    <div className={classes.maxSeat}>
      Maximum seat selection reached.
    </div>
  )

  return (
    <>
      <Dialog open={open} onClose={handleClose} className={classes.dialogSpacing}>
        <div>
          <Typography variant="h6" className={classes.dialogHeader} data-testid="skyfox">
            Skyfox Cinemas
          </Typography>
          {onClose ? (
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
          <DrawGrid
            seat={seat}
            available={seatAvailable}
            reserved={seatReserved}
            notAvailable={notAvailableSeat}
            onClickData={onClickData}
            cost={selectedShow.cost}
          />
          <div>{showMaxSelect ? <MaxSeatSelection /> : null}</div>
        </div>
        <div className={classes.confirmDiv}>
          <Button variant="contained" color="primary" disabled={seatReserved.length <= 0}
            onClick={async () => {
              let response = await bookShow();

              if (response) {
                setShowConfirmation(true);
              } else {
                setShowConfirmation(false);

              }
              //handleClose();

            }}
            className={classes.dialogButton}>
            Confirm
          </Button>
        </div>
      </Dialog>



      <BookingConfirmation bookingConfirmation={bookingConfirmation} showConfirmation={showConfirmation} />
    </>
  );
}

const DrawGrid = ({ seat, available, reserved, notAvailable, onClickData, cost }) => {

  const onClickSeat = (seat) => {
    onClickData(seat);
  }

  const classes = styles();

  const seatRows = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);

  return (

    <div className={classes.container}>
      <table className={classes.grid}>
        <tbody>

          <tr>
            <td></td>
            {seat.slice(0, 10).map(row =>
              <td className={classes.headingRow} key={row} >{row.slice(1, 3)}</td>)}
          </tr>
          {
            seatRows(seat, 10).map((seatRow, rowIndex) => {
              return (
                <tr>
                  <td>{seat[(rowIndex * 10) + rowIndex].slice(0, 1)}</td>
                  {seatRow.map(row =>
                    <td
                      className={(notAvailable.indexOf(row) > -1 ? classes.nonAvailableSeat :
                        (available.indexOf(row) > -1 ? classes.gridTable : classes.available))}
                      key={row} onClick={e => onClickSeat(row)}>{row}
                    </td>)}
                </tr>
              )
            })
          }

        </tbody>
      </table>

      <div className={classes.costDiv}>
        <div className={classes.totalCostDiv}>Total Amount:{(cost * reserved.length).toFixed(2)}</div>
        <div>No Of Seats:{reserved.length}</div>
      </div>

    </div>

  )
}

DrawGrid.propTypes = {
  seat: PropTypes.array.isRequired,
  available: PropTypes.array.isRequired,
  reserved: PropTypes.array.isRequired,
  notAvailable: PropTypes.array.isRequired,
  onClickData: PropTypes.func.isRequired,
};


const AvailableList = ({ available }) => {
  const classes = styles();

  const seatCount = { available }.length;
  return (

    <div>Total Cost:</div>
  )
}

const ReservedList = ({ reserved }) => {
  const classes = styles();

  return (

    <div>Number of seat:</div>
  )
}

const NotAvailableList = ({ notAvailable }) => {
  const classes = styles();

  return (

    null
  )
}

SeatMap.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SeatMap;


