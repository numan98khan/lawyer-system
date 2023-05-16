import React, {useState} from "react";
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

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";



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
  },
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

// const optionsB = [
//   {
//     name: "Defendant",
//     value: "Defendant",
//   },{
//     name: "Respondent",
//     value: "Respondent",
//   },{
//     name: "Accused",
//     value: "Accused",
//   },
// ];

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
  const [isOrganization, setIsOrganization] = useState(formData.isOrganization || false);

  const [sameAsClientDetails, setSameAsClientDetails] = useState(false);

  const [sameAsPhone, setSameAsPhone] = useState(false);

  const handleCheckboxChange = (event) => {
    setSameAsPhone(event.target.checked);
  
    if (event.target.checked) {
      handleInputChange({
        name: 'contactPerson.whatsappNumber',
        value: formData.contactPerson.phoneNumber,
      });
    } else {
      handleInputChange({
        name: 'contactPerson.whatsappNumber',
        value: '',
      });
    }
  };

  const fields = (isOrganization) =>  [
    {
      label: "Is Organization?",
      id: "isOrganization",
      value: formData.isOrganization || false,
    },
    {
      label: "Name of the Client(s)",
      id: "contactPerson.clientName",
      value: formData.contactPerson.clientName || "",
    },
    
    {
      label: "NTN number",
      id: "contactPerson.ntn",
      value: formData.contactPerson.ntn || "",
    },
    ...(isOrganization
      ? [
          {
            label: "Registration Number",
            id: "contactPerson.registrationNumber",
            value: formData.contactPerson.registrationNumber || "",
          },
          {
            label: "CUIN",
            id: "contactPerson.cuin",
            value: formData.contactPerson.cuin || "",
          },
        ]
      : [{
        label: "CNIC number",
        id: "contactPerson.cnicNumber",
        value: formData.contactPerson.cnicNumber || "",
      },]),
    {
      label: "Client Address",
      id: "contactPerson.clientAddress",
      value: formData.contactPerson.clientAddress || "",
    },
    // {
    //   label: "Plaintiff/Claimant/Complainant/Applicant/Petitioner",
    //   id: "contactPerson.plaintiff",
    //   value: formData.contactPerson.plaintiff || "",
    // },
    // {
    //   label: "Defendant/Respondent/Accused",
    //   id: "contactPerson.defendant",
    //   value: formData.contactPerson.defendant || "",
    // },
    {
      label: "Phone No.",
      id: "contactPerson.phoneNumber",
      value: formData.contactPerson.phoneNumber || "",
    },
    {
      label: "Email",
      id: "contactPerson.email",
      value: formData.contactPerson.email || "",
    },
    {
      label: "WhatsApp No.",
      id: "contactPerson.whatsappNumber",
      value: formData.contactPerson.whatsappNumber || "",
    },

    
  ];

  const handleSameAsClientDetailsChange = (event) => {
    setSameAsClientDetails(event.target.checked);
    if (event.target.checked) {
      handleInputChange({
        target: {
          name: "contactPerson",
          value: { ...formData.clientDetails },
        },
      });
    } else {
      handleInputChange({
        target: {
          name: "contactPerson",
          value: {
            ...formData.contactPerson,
            clientName: "",
            ntn: "",
            registrationNumber: "",
            cuin: "",
            cnicNumber: "",
            clientAddress: "",
            phoneNumber: "",
            whatsappNumber: "",
            email: "",
            plaintiff: "",
          },
        },
      });
    }
  };
  


  return (
    <>
      {/* <h2 style={{ textAlign: "center", marginTop: 20 }}>Client Information</h2> */}
      <Title title="Contact Details" extraSpace/>

      <div className={classes.gridContainer}>
          <FormControlLabel
            // key={id}
            control={
              <Checkbox
                color="primary"
                checked={sameAsClientDetails}
                onChange={handleSameAsClientDetailsChange}
                disabled={formData.isOrganization}
    
                
              />
            }
            label={"Same as Client Details"}
          />
        {fields(fields(isOrganization)[0].value).slice(1).map(({ label, id, value }) => (
          
          <FormControl key={id} className={classes.formControl}>
            {id === "contactPerson.cnicNumber" ? (
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
          ) : id === 'contactPerson.whatsappNumber' ? (
            // Add your desired component or code for handling the 'Whatsapp no.' case here
            <>
              <TextField
                  required
                  name={id}
                  label={label}
                  id={id}
                  value={value}
                  onChange={handleInputChange}
                  fullWidth
                  // disabled
              />
              <FormControlLabel
              control={
                <Checkbox
                  checked={sameAsPhone}
                  onChange={handleCheckboxChange} // use handleInputChange instead of handleCheckboxChange
                  // name="isNACourt"

                  color="primary"
                />
              }
              label="same as above"
            />
            </>
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
      
      
      <InputLabel htmlFor="court-select">Plaintiff/Defendant Type</InputLabel>
      <Select


        value={formData.contactPerson.plaintiff}
        name={"contactPerson.plaintiff"}
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


        value={formData.contactPerson.defendant}
        name={"contactPerson.defendant"}
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

ClientInformationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default ClientInformationForm;
