import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Title from "../../components/Title";
import {
  nulllist,
  optionsCourts
} from "./lists";



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",

  },
  heading: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
}));

function CourtForm({ formData, handleInputChange }) {
  const classes = useStyles();
  const [courtName, setCourtName] = useState("");


  const handleCourtChange = (event) => {
    setCourtName(event.target.value);
  };

  const fields = {
    "judge":
    {
      label: "judge",
      id: "judge",
      value: formData.judge || "",
    },
    "district":
    {
      label: "district",
      id: "district",
      value: formData.district || "",
    },
    "court":
    {
      label: "court",
      id: "court",
      value: formData.court || "",
    },
  }

  return (
<>
{/* <h2 className={classes.heading}>Court Details</h2> */}
<Title title="Court Details" extraSpace/>
      
    <FormControl className={classes.formControl}>
        <TextField
          variant="outlined"
          minRows={"5"}
          // onChange={(e) => {
          //   setJudge(e.target.value);
          // }}

          // value={formData.courtName}
          
          value={fields['judge'].value}
          name={fields['judge'].id}
          onChange={handleInputChange}
          
          label="Name of the Judge"
        ></TextField>
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          variant="outlined"
          minRows={"5"}
          // onChange={(e) => {
          //   setDistrict(e.target.value);
          // }}

          // value={formData.courtName}
          value={fields['district'].value}
          name={fields['district'].id}
          onChange={handleInputChange}
          
          label="District/Bench/Tehsil"
        ></TextField>
      </FormControl>
    <FormControl className={classes.formControl}>
      
      
      <InputLabel htmlFor="court-select">Name of Court</InputLabel>
      <Select


        value={fields['court'].value}
        name={fields['court'].id}
        onChange={handleInputChange}

        inputProps={{ id: "court-select" }}
      >
        {optionsCourts.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </>
  );
}

export default CourtForm;
