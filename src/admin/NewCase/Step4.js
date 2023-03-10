import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import {
  nulllist,
  optionsCourts
} from "./lists";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "35vw",

  },
}));

function CourtForm({ formData, handleInputChange }) {
  const classes = useStyles();
  const [courtName, setCourtName] = useState("");


  const handleCourtChange = (event) => {
    setCourtName(event.target.value);
  };

  return (
<>
    <FormControl className={classes.formControl}>
        <TextField
          variant="outlined"
          minRows={"5"}
          // onChange={(e) => {
          //   setJudge(e.target.value);
          // }}

          // value={formData.courtName}
          
          name='judge'
          value={formData.judge}
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
          name='district'
          value={formData.district}
          onChange={handleInputChange}
          
          label="District/Bench/Tehsil"
        ></TextField>
      </FormControl>
    <FormControl className={classes.formControl}>
      
      
      <InputLabel htmlFor="court-select">Name of Court</InputLabel>
      <Select
        value={formData.courtName}
        name='courtName'
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
