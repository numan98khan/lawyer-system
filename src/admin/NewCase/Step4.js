import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
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

  const [naBenchChecked, setNaBenchChecked] = useState(false);
  const [naTehsilChecked, setNaTehsilChecked] = useState(false);
  const [naCourtChecked, setNaCourtChecked] = useState(false);

  const handleNaCourtChange = (event) => {
    setNaCourtChecked(event.target.checked);
    if (event.target.checked) {
      handleInputChange({ target: { name: "bench", value: "N/A" } });
    } else {
      handleInputChange({ target: { name: "bench", value: "" } });
    }
  };

  const handleNaBenchChange = (event) => {
    setNaBenchChecked(event.target.checked);
    if (event.target.checked) {
      handleInputChange({ target: { name: "bench", value: "N/A" } });
    } else {
      handleInputChange({ target: { name: "bench", value: "" } });
    }
  };

  const handleNaTehsilChange = (event) => {
    setNaTehsilChecked(event.target.checked);
    if (event.target.checked) {
      handleInputChange({ target: { name: "tehsil", value: "N/A" } });
    } else {
      handleInputChange({ target: { name: "tehsil", value: "" } });
    }
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
    "bench":
    {
      label: "bench",
      id: "bench",
      value: formData.bench || "",
    },
    "tehsil":
    {
      label: "tehsil",
      id: "tehsil",
      value: formData.tehsil || "",
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
      
        
        <InputLabel htmlFor="court-select">Name of Court</InputLabel>
        <Select


          value={fields['court'].value}
          name={fields['court'].id}
          onChange={handleInputChange}

          disabled={fields['court'].value === 'N/A'}

          inputProps={{ id: "court-select" }}
        >
          {optionsCourts.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        <FormControlLabel
            control={
              <Checkbox
                checked={fields['court'].value === 'N/A'}
                onChange={handleInputChange} // use handleInputChange instead of handleCheckboxChange
                name="isNACourt"

                color="primary"
              />
            }
            label="is N/A"
          />

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
          required
          
          label="District"
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
          value={fields['bench'].value}
          name={fields['bench'].id}
          onChange={handleInputChange}
          
          label="Bench"
          disabled={naBenchChecked}
        ></TextField>
        <FormControlLabel
            control={
              <Checkbox
                checked={naBenchChecked}
                onChange={handleNaBenchChange}
                color="primary"
              />
            }
            label="N/A"
          />
      </FormControl>



      <FormControl className={classes.formControl}>
        <TextField
          variant="outlined"
          minRows={"5"}
          // onChange={(e) => {
          //   setDistrict(e.target.value);
          // }}

          // value={formData.courtName}
          value={fields['tehsil'].value}
          name={fields['tehsil'].id}
          onChange={handleInputChange}
          
          label="Tehsil"
          disabled={naTehsilChecked}
        ></TextField>
        <FormControlLabel
            control={
              <Checkbox
                checked={naTehsilChecked}
                onChange={handleNaTehsilChange}
                color="primary"
              />
            }
            label="N/A"
          />
        
      </FormControl>

      
    
    </>
  );
}

export default CourtForm;
