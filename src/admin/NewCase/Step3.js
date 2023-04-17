import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Title from "../../components/Title";
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

  const dateDecision = [
    {
      name: "Specify",
      value: "Specify",
    },
    {
      name: "Or leave blank",
      value: "Or leave blank",
    },
  ];

  const fields = [
    {
      label: "Litigation Case Title",
      id: "litigationCaseTitle",
      value: formData.litigationCaseTitle || "",
    },
    
    {
      label: "Date of Last Hearing",
      id: "substantiveDateOfLastHearing",
      value: formData.substantiveDateOfLastHearing || null,
    },
    {
      label: "Date of Next Hearing",
      id: "substantiveDateOfNextHearing",
      value: formData.substantiveDateOfNextHearing || null,
    },
    {
      label: "Date of Hearing",
      id: "substantiveDateOfHearing",
      value: formData.substantiveDateOfHearing || null,
    },
    {
      label: "Date not fixed yet/new case",
      id: "substantiveDateNotFixed",
      value: formData.substantiveDateNotFixed || "", // This will be checkbox
    },
    
    {
      label: "Date of Last Hearing",
      id: "interimDateOfLastHearing",
      value: formData.interimDateOfLastHearing || null,
    },
    {
      label: "Date of Next Hearing",
      id: "interimDateOfNextHearing",
      value: formData.interimDateOfFirstHearing || null,
    },
    {
      label: "Date of Hearing",
      id: "interimDateOfHearing",
      // value: formData.interimDateOfHearing || new Date(),
      value: formData.interimDateOfHearing || null,
    },
    {
      label: "Date not fixed yet",
      id: "isDateNotFixed",
      value: formData.isDateNotFixed || false, //This will be checkbox
    },
    {
      label: "New case",
      id: "isDateNewCase",
      value: formData.isDateNewCase || false, //This will be checkbox
    },
    {
      label: "Court Case No.",
      id: "courtCaseNo",
      value: formData.courtCaseNo || "",
    },
  ];

  return (
    <>
      {/* <h2 className={classes.heading}>Case Details</h2> */}
      <Title title="Case Details" extraSpace/>

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
        
        {fields.slice(10).map(({ label, id, value }) => (
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

      <FormControlLabel
            // key={id}
            control={
              <Checkbox
              color="primary"
                checked={fields[9].value}
                onChange={handleInputChange}
                name={fields[9].id}
              />
            }
            label={fields[9].label}
          />
        <FormControlLabel
            // key={id}
            control={
              <Checkbox
              color="primary"
                checked={fields[8].value}
                onChange={handleInputChange}
                name={fields[8].id}
              />
            }
            label={fields[8].label}
          />



        


        </div>
        <h6 className={classes.heading}>Substantive date of hearing</h6>
        
        <div className={classes.formRow}>
        {/* <h6 className={classes.heading}>Substantive date of hearing</h6> */}
        
        {fields.slice(1, 3).map(({ label, id, value }) => (
          <FormControl key={id} className={classes.formControl}>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                // disabled={!timestampSearch}
                disabled={(formData.isDateNewCase && id === "substantiveDateOfLastHearing") || (formData.isDateNotFixed && id === "substantiveDateOfNextHearing")}
                

                margin="normal"
                // id="date-picker-dialog"
                id={id}
                name={id}
                // label="Date of birth"
                label={label}
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

          </FormControl>
        ))}

        </div>

        <h6 className={classes.heading}>Interim date of hearing</h6>
      <div className={classes.formRow}>
        {/* <h6 className={classes.heading}>Interim date of hearing</h6> */}
        {fields.slice(5, 7).map(({ label, id, value }) => (
          <FormControl key={id} className={classes.formControl}>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                // disabled={!timestampSearch}
                disabled={(formData.isDateNewCase && id === "interimDateOfLastHearing") || (formData.isDateNotFixed && id === "interimDateOfNextHearing")}
                // disabled={formData.isDateNewCase && id === "interimDateOfLastHearing"}
                

                margin="normal"
                // id="date-picker-dialog"
                id={id}
                name={id}
                // label="Date of birth"
                label={label}
                
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
        
      </div>
    </>
  );
}

StepTwo.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default StepTwo;
