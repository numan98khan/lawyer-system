import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import CNICTextField from "../../components/CNICTextField"
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Title from "../../components/Title";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
  }
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

function TextMaskCNIC(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/ , '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCNIC.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridColumnGap: "1rem",
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
    // {
    //   label: "Plaintiff/Claimant/Complainant/Applicant/Petitioner",
    //   id: "clientDetails.plaintiff",
    //   value: formData.clientDetails.plaintiff || "",
    // },
    // {
    //   label: "Defendant/Respondent/Accused",
    //   id: "clientDetails.defendant",
    //   value: formData.clientDetails.defendant || "",
    // },
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
      {/* <h2 style={{ textAlign: "center", marginTop: 20 }}>Client Information</h2> */}
      <Title title="Client Information" extraSpace/>

      <div className={classes.gridContainer}>
        {fields.map(({ label, id, value }) => (
          
          <FormControl key={id} className={classes.formControl}>
            {id === "clientDetails.cnicNumber" ? (
            <><InputLabel>cnic</InputLabel>
                
            <Input

              name={id}
              label={label}
              id={id}
              value={value}
              onChange={handleInputChange}
              
              // value={cnic}
              // onChange={(e)=>{setcnic(e.target.value)}}
              
              inputComponent={TextMaskCNIC}
            /></>
          ) : (
            <TextField
              required
              name={id}
              label={label}
              id={id}
              value={value}
              onChange={handleInputChange}
              fullWidth
            />
          )}
            {/* {id === "password" ? ():(
            <TextField
              required
              name={id}
              label={label}
              id={id}
              value={value}
              onChange={handleInputChange}
              fullWidth
            />)} */}

          </FormControl>
        ))}

    <FormControl className={classes.formControl}>
      
      
      <InputLabel htmlFor="court-select">Plaintiff Type</InputLabel>
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

    <FormControl className={classes.formControl}>
      
      
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
    </FormControl>

      </div>
    </>
  );
}

ClientInformationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default ClientInformationForm;
