// import React from 'react';
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import {FormHelperText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "35vw",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


// Case Instructions
function StepOne({ formData, handleInputChange }) {

  // const [legalDrafting, setLegalDrafting] = useState('');
  // const [dueDiligence, setDueDiligence] = useState('');
  // const [legalisationRegistration, setLegalisationRegistration] = useState('');
  // const [regulatoryWork, setRegulatoryWork] = useState('');
  // const [litigationType, setLitigationType] = useState("");
  // const [courtName, setCourtName] = useState("");
  
  // const [otherWork, setOtherWork] = useState('');
  // const [natureLitigation, setNatureLitigation] = useState('');


  // const [legalOpinion, setLegalOpinion] = useState("");

  // const handleLegalOpinionChange = (event) => {
  //   setLegalOpinion(event.target.value);
  // };

  const classes = useStyles();

  return (
    <div className="form-step">
      <h2>Step 1</h2>
      {/* <div className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name || ''}
          onChange={handleInputChange}
          required
        />
      </div> */}

      <FormControl className={classes.formControl}>
        <TextField
          id="legal-opinion-input"
          label="Enter your legal opinion here"
          value={formData.legalOpinion}
          // onChange={handleLegalOpinionChange}
          onChange={handleInputChange}
          multiline
          rows={4}
        />
        <FormHelperText>
          Please enter your legal opinion in the field above.
        </FormHelperText>
    </FormControl>

    <FormControl className={classes.formControl}>
      {/* <InputLabel htmlFor="legal-drafting-input">Legal Drafting</InputLabel> */}
      <TextField
        label="Legal Drafting"
        id="legal-drafting-input"
        value={formData.legalDrafting}
        // onChange={(e) => setLegalDrafting(e.target.value)}
        onChange={handleInputChange}
          
      />
    </FormControl>

    <FormControl className={classes.formControl}>
      {/* <InputLabel htmlFor="due-diligence-input">Due Diligence</InputLabel> */}
      <TextField
        label="Due Diligence"
        id="due-diligence-input"
        value={formData.dueDiligence}
        // onChange={(e) => setDueDiligence(e.target.value)}
        onChange={handleInputChange}
          
      />
    </FormControl>

    <FormControl className={classes.formControl}>
      {/* <InputLabel htmlFor="legalisation-registration-input">Legalisation/Registration of Documents etc.</InputLabel> */}
      <TextField
        label="Legalisation/Registration of Documents etc."
        id="legalisation-registration-input"
        value={formData.legalisationRegistration}
        // onChange={(e) => setLegalisationRegistration(e.target.value)}
        onChange={handleInputChange}
          
      />
    </FormControl>

    <FormControl className={classes.formControl}>
      {/* <InputLabel htmlFor="regulatory-work-input">Regulatory Work</InputLabel> */}
      <TextField
        label="Regulatory Work"
        id="regulatory-work-input"
        value={formData.regulatoryWork}
        // onChange={(e) => setRegulatoryWork(e.target.value)}
        onChange={handleInputChange}
      />
    </FormControl>

    </div>
  );
}

export default StepOne;
