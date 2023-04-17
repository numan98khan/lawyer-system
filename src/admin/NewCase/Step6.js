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

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography'


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
    width: "100%"
    // backgroundColor: 'primary'
  },
}));

function OtherPartyInformationForm({ formData, handleInputChange, handleAddOtherParty  }) {
  const classes = useStyles();
  const [isOrganization, setIsOrganization] = useState(formData.isOrganization || false);


  const fields = (isOrganization, index) =>  [
    {
      label: "Is Organization?",
      id: "otherPartyDetails.isOrganization",
  
      // value: formData.isOrganization || false,
      value: formData.otherParties[index]?.otherPartyDetails?.isOrganization || false,
  
    },
    {
      label: "Name of the Client(s)",
      id: "otherPartyDetails.clientName",
      // value: formData.otherPartyDetails.clientName || "",

      value: formData.otherParties[index]?.otherPartyDetails?.clientName || "",
    },

    {
      label: "Advocate Name",
      id: "otherPartyDetails.advocateName",
      // value: formData.otherPartyDetails.clientName || "",

      value: formData.otherParties[index]?.otherPartyDetails?.advocateName || "",
    },
    
    {
      label: "NTN number",
      id: "otherPartyDetails.ntn",
      value: formData.otherPartyDetails.ntn || "",
    },
    ...(isOrganization
      ? [
          {
            label: "Registration Number",
            id: "otherPartyDetails.registrationNumber",
            value: formData.otherPartyDetails.registrationNumber || "",
          },
          {
            label: "CUIN",
            id: "otherPartyDetails.cuin",
            value: formData.otherPartyDetails.cuin || "",
          },
        ]
      : [{
        label: "CNIC number",
        id: "otherPartyDetails.cnicNumber",
        value: formData.otherPartyDetails.cnicNumber || "",
      },]),
    {
      label: "Client Address",
      id: "otherPartyDetails.clientAddress",
      value: formData.otherPartyDetails.clientAddress || "",
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
      id: "otherPartyDetails.phoneNumber",
      value: formData.otherPartyDetails.phoneNumber || "",
    },
    {
      label: "WhatsApp No.",
      id: "otherPartyDetails.whatsappNumber",
      value: formData.otherPartyDetails.whatsappNumber || "",
    },
    {
      label: "Email",
      id: "otherPartyDetails.email",
      value: formData.otherPartyDetails.email || "",
    },

    
  ];


  const [otherParties, setOtherParties] = useState(formData.otherParties || [{}]);

  const handleAddSection = () => {
    handleAddOtherParty();
    setOtherParties([...otherParties, {}]);
  };

  return (
    <>
      <Title title="Other Party Details" extraSpace />
      {otherParties.map((otherParty, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`other-party-content-${index}`}
            id={`other-party-header-${index}`}
          >
            <Typography className={classes.heading}>
              Other Party {index + 1}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <div className={classes.gridContainer}> */}

      <div className={classes.gridContainer}>
          <FormControlLabel
            // key={id}
            control={
              <Checkbox
                color="primary"
                // checked={fields(isOrganization)[0].value}
                // onChange={handleInputChange}

                // checked={formData.otherParties[index]?.isOrganization || false}
                // onChange={(e) => handleInputChange(
                //   {
                //     name: e.target.name,
                //     value: e.target.checked
                //   },
                //   index
                // )}

                onChange={(e) => handleInputChange(e, index)}

                checked={formData.otherParties[index]?.otherPartyDetails?.isOrganization || ""}
        
                // onChange={(e) => handleInputChange(e, index)}
                
              
                name={fields(isOrganization)[0].id}
              />
            }
            label={fields(isOrganization)[0]['label']}
          />
        {fields(fields(isOrganization, index)[0].value).slice(1).map(({ label, id, value }) => (
          
          <FormControl key={id} className={classes.formControl}>
            {id === "otherPartyDetails.cnicNumber" ? (
            <><InputLabel>cnic</InputLabel>
                
            <Input

              name={id}
              label={label}
              id={id}
              value={value}
              onChange={handleInputChange}
              // onChange={(e) => handleInputChange(e, index)}
              
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

              // value={value}
              value={formData.otherParties[index]?.otherPartyDetails?.[id.split('.')[1]] || ""}
        
              
              // onChange={handleInputChange}
              onChange={(e) => handleInputChange(e, index)}
              
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


        value={formData.otherPartyDetails.plaintiff}
        name={"otherPartyDetails.plaintiff"}
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

      {/* </div> */}
      </div>
          </AccordionDetails>
        </Accordion>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddSection}
        style={{ marginTop: "1rem" }}
      >
        Add New Other Party
      </Button>
    </>
    // </>
    
  );
}

OtherPartyInformationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default OtherPartyInformationForm;
