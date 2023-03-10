import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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

function StepOne({ formData, handleInputChange }) {
  const classes = useStyles();
  const [checkedItems, setCheckedItems] = useState({
    legalOpinion: false,
    legalDrafting: false,
    dueDiligence: false,
    legalisationRegistration: false,
    regulatoryWork: false,
  });

  const fields = [
    {
      label: "Legal Opinion",
      id: "legalOpinion",
      value: formData.legalOpinion || "",
    },
    {
      label: "Legal Drafting",
      id: "legalDrafting",
      value: formData.legalDrafting || "",
    },
    {
      label: "Due Diligence",
      id: "dueDiligence",
      value: formData.dueDiligence || "",
    },
    {
      label: "Legalisation/Registration of Documents etc.",
      id: "legalisationRegistration",
      value: formData.legalisationRegistration || "",
    },
    {
      label: "Regulatory Work",
      id: "regulatoryWork",
      value: formData.regulatoryWork || "",
    },
    
  ];

  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <h2 className={classes.heading}>Case Instructions</h2>

      <div className={classes.formRow}>
        {fields.map(({ label, id }) => (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                checked={formData[id]}
                onChange={handleInputChange}
                name={id}
              />
            }
            label={label}
          />
        ))}
      </div>
    </>
  );
}

StepOne.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default StepOne;
