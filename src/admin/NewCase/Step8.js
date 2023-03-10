import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {
  nulllist,
  optionsCourts,
  optionsNatureLitigation
} from "./lists";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "35vw",

  },
}));

function CourtForm() {
  const classes = useStyles();
  const [courtName, setCourtName] = useState("");
  // const optionsCourts = [
  //   { name: "Court A", value: "court-a" },
  //   { name: "Court B", value: "court-b" },
  //   { name: "Court C", value: "court-c" },
  // ];

  const handleCourtChange = (event) => {
    setCourtName(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="court-select">Nature of Litigation</InputLabel>
      <Select
        value={courtName}
        onChange={handleCourtChange}
        inputProps={{ id: "court-select" }}
      >
        {optionsNatureLitigation.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CourtForm;
