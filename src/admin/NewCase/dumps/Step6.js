import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Title from "../../components/Title";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';

const optionsA = [
  {
    name: "Plaintiff",
    value: "Plaintiff",
  },
  {
    name: "Claimant",
    value: "Claimant",
  },
  {
    name: "Complainant",
    value: "Complainant",
  },{
    name: "Applicant",
    value: "Applicant",
  },{
    name: "Petitioner",
    value: "Petitioner",
  },{
    name: "Defendant",
    value: "Defendant",
  },{
    name: "Respondent",
    value: "Respondent",
  },{
    name: "Accused",
    value: "Accused",
  },
];

const optionsB = [
  {
    name: "Defendant",
    value: "Defendant",
  },{
    name: "Respondent",
    value: "Respondent",
  },{
    name: "Accused",
    value: "Accused",
  },
];
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridColumnGap: "1rem",
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
    // {
    //   label: "Plaintiff/Claimant/Complainant/Applicant/Petitioner",
    //   id: "otherPartyDetails.plaintiff",
    //   value: formData.otherPartyDetails.plaintiff || "",
    // },
    // {
    //   label: "Defendant/Respondent/Accused",
    //   id: "otherPartyDetails.defendant",
    //   value: formData.otherPartyDetails.defendant || "",
    // },
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
      {/* <h2 style={{ textAlign: "center", marginTop: 20 }}>Other Party Information</h2> */}
      <Title title="Other Party Details" extraSpace/>

      <div className={classes.gridContainer}>
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

    <FormControl className={classes.formControl}>
      
      
      <InputLabel htmlFor="court-select">Plaintiff/Defendant Type</InputLabel>
      <Select


        value={formData.clientDetails.plaintiff}
        name={"clientDetails.plaintiff"}
        onChange={handleInputChange}

        // inputProps={{ id: "court-select" }}
      >
        {optionsA.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* <FormControl className={classes.formControl}>
      
      
      <InputLabel htmlFor="court-select">Defendant Type</InputLabel>
      <Select


        value={formData.clientDetails.defendant}
        name={"clientDetails.defendant"}
        onChange={handleInputChange}

        // inputProps={{ id: "court-select" }}
      >
        {optionsB.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl> */}
    </div>
    </>
  );
}

OtherPartyForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default OtherPartyForm;
