import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
  },
  heading: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
}));

function StepTwo({ formData, handleInputChange }) {
  const classes = useStyles();

  const fields = [
    {
      label: "Litigation Case Title",
      id: "litigationCaseTitle",
      value: formData.litigationCaseTitle || "",
    },
    {
      label: "Date of Hearing",
      id: "substantiveDateOfHearing",
      value: formData.substantiveDateOfHearing || new Date(),
    },
    {
      label: "Date of Last Hearing",
      id: "substantiveDateOfLastHearing",
      value: formData.substantiveDateOfLastHearing || new Date(),
    },
    {
      label: "Date of Next Hearing",
      id: "substantiveDateOfNextHearing",
      value: formData.substantiveDateOfNextHearing || new Date(),
    },
    {
      label: "Date not fixed yet/new case",
      id: "substantiveDateNotFixed",
      value: formData.substantiveDateNotFixed || "", // This will be checkbox
    },
    {
      label: "Date of Hearing",
      id: "interimDateOfHearing",
      value: formData.interimDateOfHearing || new Date(),
    },
    {
      label: "Date of Last Hearing",
      id: "interimDateOfLastHearing",
      value: formData.interimDateOfLastHearing || new Date(),
    },
    {
      label: "Date of First Hearing",
      id: "interimDateOfFirstHearing",
      value: formData.interimDateOfFirstHearing || new Date(),
    },
    {
      label: "Date not fixed yet/new case",
      id: "interimDateNotFixed",
      value: formData.interimDateNotFixed || "", //This will be checkbox
    },
    {
      label: "Court Case No.",
      id: "courtCaseNo",
      value: formData.courtCaseNo || "",
    },
  ];

  return (
    <>
      <h2 className={classes.heading}>Litigation Case Details</h2>
      <div className={classes.formRow}>
        {fields.slice(0, 1).map(({ label, id, value }) => (
          <FormControl key={id} className={classes.formControl}>

            <TextField
              label={label}

              id={id}
              name={id}
              value={value}
              onChange={handleInputChange}
            />
          </FormControl>
        ))}
        <h6 className={classes.heading}>Substantive date of hearing</h6>
        
        {fields.slice(1, 4).map(({ label, id, value }) => (
          <FormControl key={id} className={classes.formControl}>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                // disabled={!timestampSearch}

                margin="normal"
                // id="date-picker-dialog"
                id={id}
                name={id}
                // label="Date of birth"
                format="MM/dd/yyyy"
                value={value}
                onChange={(e) => {
                  // e = id

                  const event = {value: e, name:id}
                  console.log("My e", event);
                  handleInputChange(event);
                  // setdate(e);
                }}
                // onChange={handleInputChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>

            {/* <DatePicker
                  label={label}
                  id={id}
                  name={id}
                  value={value}
                  onChange={handleInputChange}
                  format="MM/dd/yyyy"
            /> */}
            {/* <TextField
              label={label}

              id={id}
              name={id}
              value={value}
              onChange={handleInputChange}
            /> */}
          </FormControl>
        ))}

        <h6 className={classes.heading}>Interim date of hearing</h6>
        {fields.slice(5, 8).map(({ label, id, value }) => (
          <FormControl key={id} className={classes.formControl}>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                // disabled={!timestampSearch}

                margin="normal"
                // id="date-picker-dialog"
                id={id}
                name={id}
                // label="Date of birth"
                format="MM/dd/yyyy"
                value={value}
                onChange={(e) => {
                  // e = id

                  const event = {value: e, name:id}
                  console.log("My e", event);
                  handleInputChange(event);
                  // setdate(e);
                }}
                // onChange={handleInputChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>


            {/* <TextField
              label={label}
              id={id}
              name={id}
              value={value}
              onChange={handleInputChange}
            /> */}
          </FormControl>
        ))}
        {fields.slice(8).map(({ label, id, value }) => (
          <FormControl key={id} className={classes.formControl}>

            <TextField
              label={label}

              id={id}
              name={id}
              value={value}
              onChange={handleInputChange}
            />
          </FormControl>
        ))}
      </div>
    </>
  );
}

StepTwo.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default StepTwo;
