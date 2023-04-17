import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Title from "../../components/Title";
import {
  nulllist,
  optionsCivilLitigation,
  optionsChances,
  optionsCaseSupervisor,
  optionsHousingLaw,
  optionsConsumerLaw,
  optionsCriminalLaw,
  optionsServiceLaw,
  optionsCompanyLaw,
  optionsBankingLaw,
  optionsFamilyLaw,
  optionsTaxLaw,
  optionsCriminalLaw_2,
  optionsCriminalLaw_3,
  optionsCompetitionLaw,
  optionsPublicInterestLaw,
  optionsOtherLaw,
  optionsLitigationTypes,
  optionsCourts,
  optionsNatureLitigation
} from "./lists";

const useStyles = makeStyles((theme) => ({
formControl: {
margin: theme.spacing(1),
width: '100%',
},
}));

function LitigationForm({workers, formData, handleInputChange }) {
const classes = useStyles();
// const { category, subCategory} = formData;


const subCategoryOptions = {
  "Civil Litigation": optionsCivilLitigation,
  "Criminal Litigation": optionsCriminalLaw,
  "Service Law": optionsServiceLaw,
  "Family Law": optionsFamilyLaw,
  "Banking Law": optionsBankingLaw,
  "Tax and other Levies": optionsTaxLaw,
  "Consumer Law": optionsConsumerLaw,
  "Competition Law": optionsCompetitionLaw,
  "Landlord and Tenant Law": optionsHousingLaw,
  "Company Law": optionsCompanyLaw,
  "Public Interest Litigation": optionsPublicInterestLaw,
  "Other": optionsOtherLaw,

  // "Housing Law (Property & Conveyancing)": optionsHousingLaw,
  // "Employment Law": optionsEmploymentLaw,
  // "Human Rights": optionsHumanRights,
  // "Immigration & Asylum": optionsImmigrationAssylum,
  // "Personal injury & clinical negligence": optionsPersonalInjury,
}[formData.litigation.category];


// const optionsCriminalLaw_2 = [
// { name: 'Details 1', value: 'details1' },
// { name: 'Details 2', value: 'details2' },
// { name: 'Details 3', value: 'details3' },
// ];

// const optionsCriminalLaw_3 = [
// { name: 'Details 1', value: 'details1' },
// { name: 'Details 2', value: 'details2' },
// { name: 'Details 3', value: 'details3' },
// ];

const fields = {
    "worker":
    {
      label: "worker",
      id: "worker",
      value: formData.worker || "",
    },
    "clerk":
    {
      label: "clerk",
      id: "clerk",
      value: formData.clerk || "",
    },

    "caseowner":
    {
      label: "caseowner",
      id: "caseowner",
      value: formData.caseowner || "",
    },
  }



return (
<>
  {/* <h2 style={{ textAlign: 'center', marginTop: 20 }}>
    Case Allocation
  </h2> */}
  <Title title="Allocation Details" extraSpace/>

    {/* Case Worker */}
    <FormControl className={classes.formControl}>
        <InputLabel>Case Worker</InputLabel>
        <Select
          
          value={fields['worker'].value}
          name={fields['worker'].id}
          
          onChange={handleInputChange}
          
        >

          {workers.filter(option => option.type === "worker").map((option, index) => (
            <MenuItem 
              key={index} 
              value={option.email}
            >
              {option.email}
            </MenuItem>
          ))}
          
        </Select>
      </FormControl>

    {/* Case Clerk */}
    <FormControl className={classes.formControl}>
        <InputLabel>Case Clerk</InputLabel>
        <Select
          
          value={fields['clerk'].value}
          name={fields['clerk'].id}
          
          onChange={handleInputChange}
          
        >

          {workers.filter(option => option.type === "clerk").map((option, index) => (
            <MenuItem 
              key={index} 
              value={option.email}
            >
              {option.email}
            </MenuItem>
          ))}
          
        </Select>
      </FormControl>

    {/* Case Owner */}
    <FormControl className={classes.formControl}>
        <InputLabel>Case Owner</InputLabel>
        <Select
          
          value={fields['caseowner'].value}
          name={fields['caseowner'].id}
          
          onChange={handleInputChange}
          
        >

          {workers.filter(option => option.type === "caseowner").map((option, index) => (
            <MenuItem 
              key={index} 
              value={option.email}
            >
              {option.email}
            </MenuItem>
          ))}
          
        </Select>
      </FormControl>

</>
);
}

LitigationForm.propTypes = {
formData: PropTypes.object.isRequired,
handleInputChange: PropTypes.func.isRequired,
};

export default LitigationForm;
