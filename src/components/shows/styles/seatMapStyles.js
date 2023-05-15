import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) =>
({
  dialogSpacing: {
    width: "100%",
    maxWidth: "600px",
    margin: "auto"
  },
  dialogHeader: {
    fontWeight: "bold",
    paddingLeft: "10px",
    width: "80%",
    float: "left",
    paddingTop: "10px"
  },
  h1: {
    textAlign: "center"
  },
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingBottom: "15px",
    margin: "auto",
  },

  gridTable: {
    width: "30px",
    height: "25px",
    border: "2px solid #556cd6",
    textAlign: "center",
    float: "left",
    margin: "5px",
    cursor: "pointer"
  },
  grid: {
    margin: "0 auto",
    "@media (max-width: 414px)": {
      width: "70%"
    },
    "@media (max-width: 411px)": {
      width: "70%"
    },
    "@media (max-width: 375px)": {
      width: "85%"
    }, "@media (max-width: 360px)": {
      width: "90%"
    },
    "@media (max-width: 320px)": {
      width: "100%"
    },

    "@media (max-width: 280px)": {
      width: "125%"
    },
  },

  nonAvailableSeat: {
    width: "30px",
    height: "25px",
    border: "2px solid #556cd6",
    textAlign: "center",
    float: "left",
    margin: "5px",
    pointerEvents: "none",
    backgroundColor: "grey"
  },

  available: {
    width: "30px",
    height: "25px",
    border: "2px solid #556cd6",
    textAlign: "center",
    float: "left",
    margin: "5px",
    cursor: "pointer",
    backgroundColor: "#19857b",
    color: "white"
  },

  li: {
    listStyle: "none"
  },

  costDiv: {
    display: "flex",
    flexDirection: "row- reverse"
  },

  totalCostDiv: {
    width: "50%"
  },
  headingRow: {
    width: "30px",
    height: "25px",
    textAlign: "center",
    float: "left",
    margin: "5px",
    cursor: "pointer"
  },
  dialogButton: {
    float: "right"
  },
  confirmDiv: {
    paddingRight: "15px",
    paddingBottom: "10px"
  },
  maxSeat: {
    paddingLeft: "15px",
    color: "red"
  },
  closeButton: {
    width: "20%",
    float: "left",
    margin: 0
  }
})
);
