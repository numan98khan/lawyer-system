import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
}));

function LegalOpinionForm({ formData, handleInputChange }) {
  const classes = useStyles();

  const fields = [
    {
      label: "Summary of Facts",
      id: "summaryOfFacts",
      value: formData.summaryOfFacts || "",
      multiline: true,
      rows: 4,
    },
    {
      label: "Legal Analysis",
      id: "legalAnalysis",
      value: formData.legalAnalysis || "",
      multiline: true,
      rows: 6,
    },
    {
      label: "Recommendation",
      id: "recommendation",
      value: formData.recommendation || "",
      multiline: true,
      rows: 4,
    },
  ];

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: 20 }}>Legal Opinion</h2>

      {fields.map(({ label, id, value, multiline, rows }) => (
        <FormControl key={id} className={classes.formControl}>
          <TextField
            required
            name={id}
            label={label}
            id={id}
            value={value}
            onChange={handleInputChange}
            multiline={multiline}
            rows={rows}
          />
        </FormControl>
      ))}
    </>
  );
}

LegalOpinionForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default LegalOpinionForm;
