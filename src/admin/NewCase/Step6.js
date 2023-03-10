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

function OtherPartyForm({ formData, handleInputChange }) {
  const classes = useStyles();

  const fields = [
    {
      label: "Name of the Party",
      id: "otherPartyDetails.partyName",
      value: formData.otherPartyDetails.partyName || "",
    },
    {
      label: "CNIC number",
      id: "otherPartyDetails.cnicNumber",
      value: formData.otherPartyDetails.cnicNumber || "",
    },
    {
      label: "Address",
      id: "otherPartyDetails.address",
      value: formData.otherPartyDetails.address || "",
    },
    {
      label: "Plaintiff/Claimant/Complainant/Applicant/Petitioner",
      id: "otherPartyDetails.plaintiff",
      value: formData.otherPartyDetails.plaintiff || "",
    },
    {
      label: "Defendant/Respondent/Accused",
      id: "otherPartyDetails.defendant",
      value: formData.otherPartyDetails.defendant || "",
    },
    {
      label: "Phone No.",
      id: "otherPartyDetails.phoneNumber",
      value: formData.otherPartyDetails.phoneNumber || "",
    },
    {
      label: "Email",
      id: "otherPartyDetails.email",
      value: formData.otherPartyDetails.email || "",
    },
  ];

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: 20 }}>Other Party Information</h2>

      {fields.map(({ label, id, value }) => (
        <FormControl key={id} className={classes.formControl}>
          <TextField
            required
            name={id}
            label={label}
            id={id}
            value={value}
            onChange={handleInputChange}
          />
        </FormControl>
      ))}
    </>
  );
}

OtherPartyForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default OtherPartyForm;
