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

function ClientInformationForm({ formData, handleInputChange }) {
  const classes = useStyles();

  const fields = [
    {
      label: "Name of the Client(s)",
      id: "clientDetails.clientName",
      value: formData.clientDetails.clientName || "",
    },
    {
      label: "CNIC number",
      id: "clientDetails.cnicNumber",
      value: formData.clientDetails.cnicNumber || "",
    },
    {
      label: "Client Address",
      id: "clientDetails.clientAddress",
      value: formData.clientDetails.clientAddress || "",
    },
    {
      label: "Plaintiff/Claimant/Complainant/Applicant/Petitioner",
      id: "clientDetails.plaintiff",
      value: formData.clientDetails.plaintiff || "",
    },
    {
      label: "Defendant/Respondent/Accused",
      id: "clientDetails.defendant",
      value: formData.clientDetails.defendant || "",
    },
    {
      label: "Phone No.",
      id: "clientDetails.phoneNumber",
      value: formData.clientDetails.phoneNumber || "",
    },
    {
      label: "Email",
      id: "clientDetails.email",
      value: formData.clientDetails.email || "",
    },
  ];

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: 20 }}>Client Information</h2>

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

ClientInformationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default ClientInformationForm;
