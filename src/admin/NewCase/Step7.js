import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Title from "../../components/Title";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
}));

function ContactInformationForm({ formData, handleInputChange }) {
  const classes = useStyles();

  const fields = [
    {
      label: "Name",
      id: "contactPerson.name",
      value: formData.contactPerson.name || "",
    },
    {
      label: "Father’s name",
      id: "contactPerson.fatherName",
      value: formData.contactPerson.fatherName || "",
    },
    {
      label: "CNIC",
      id: "contactPerson.cnic",
      value: formData.contactPerson.cnic || "",
    },
    {
      label: "Phone number",
      id: "contactPerson.phoneNumber1",
      value: formData.contactPerson.phoneNumber1 || "",
    },
    // {
    //   label: "Phone number (optional)",
    //   id: "phoneNumber2",
    //   value: formData.contactPersonphoneNumber2 || "",
    // },
    {
      label: "Whatsapp number",
      id: "contactPerson.whatsappNumber1",
      value: formData.contactPerson.whatsappNumber1 || "",
    },
    // {
    //   label: "Whatsapp number (optional)",
    //   id: "whatsappNumber2",
    //   value: formData.contactPersonwhatsappNumber2 || "",
    // },
    {
      label: "Email address",
      id: "contactPerson.email",
      value: formData.contactPerson.email || "",
    },
    {
      label: "Home Address",
      id: "contactPerson.homeAddress",
      value: formData.contactPerson.homeAddress || "",
    },
    // {
    //   label: "Other details (Please specify)",
    //   id: "otherDetails",
    //   value: formData.contactPersonotherDetails || "",
    // },
  ];

  return (
    <>
      {/* <h2 style={{ textAlign: "center", marginTop: 20 }}>Contact Information</h2> */}
      <Title title="Contact Information" extraSpace/>

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

ContactInformationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default ContactInformationForm;
