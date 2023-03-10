import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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

function LitigationForm({category, setCategory, subCategory, setSubCategory, formData, handleInputChange }) {
const classes = useStyles();
// const { category, subCategory} = formData;

console.log(category);

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
}[category];


// const subCategoryOptions = [
//   { name: 'Details 1', value: 'details1' },
//   { name: 'Details 2', value: 'details2' },
//   { name: 'Details 3', value: 'details3' },
//   ];

const optionsCriminalLaw_2 = [
{ name: 'Details 1', value: 'details1' },
{ name: 'Details 2', value: 'details2' },
{ name: 'Details 3', value: 'details3' },
];

const optionsCriminalLaw_3 = [
{ name: 'Details 1', value: 'details1' },
{ name: 'Details 2', value: 'details2' },
{ name: 'Details 3', value: 'details3' },
];

const handleSubCategoryChange = (event) => {
const { value } = event.target;
handleInputChange('subCategory', value);
};

return (
<>
<h2 style={{ textAlign: 'center', marginTop: 20 }}>
Litigation Information
</h2>
    {/* Case catergory */}
    <FormControl className={classes.formControl}>
        <InputLabel>category</InputLabel>
        <Select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <MenuItem value={"Civil Litigation"} >
            Civil Litigation
          </MenuItem>
          <MenuItem value={"Criminal Litigation"}>
            Criminal Litigation
          </MenuItem>
          <MenuItem value={"Service Law"}>
            Service Law
          </MenuItem>
          <MenuItem value={"Family Law"}>
            Family Law
          </MenuItem>
          <MenuItem value={"Banking Law"}>
            Banking Law
          </MenuItem>
          <MenuItem value={"Tax and other Levies"}>
            Tax and other Levies
          </MenuItem>
          <MenuItem value={"Consumer Law"}>
            Consumer Law
          </MenuItem>
          <MenuItem value={"Competition Law"}>
            Competition Law
          </MenuItem>
          <MenuItem value={"Landlord and Tenant Law"}>
            Landlord and Tenant Law
          </MenuItem>
          <MenuItem value={"Company Law"}>
            Company Law
          </MenuItem>
          <MenuItem value={"Public Interest Litigation"}>
          Public Interest Litigation
          </MenuItem>
          <MenuItem value={"Others"}>
            Others (Please specify)
          </MenuItem>
          <MenuItem value={"Blank"}>
            Or Leave Blank
          </MenuItem>
          
        </Select>
      </FormControl>

    <FormControl className={classes.formControl}>
      {category === "Criminal Litigation" ?
        <InputLabel>{`Select Nature of Offense `}</InputLabel>
        : <InputLabel>{`Select ${category} sub-category`}</InputLabel>
      }
      
      <Select
        value={subCategory}
        onChange={(e) => {
          setSubCategory(e.target.value);
        }}
      >
        
        
        {subCategoryOptions.map((option, index) => {
          return (
            <MenuItem key={index} value={option.value}>
              {option.name}
            </MenuItem>
          );
        })}

      </Select>      
      </FormControl>

  {/* 2nd  */}
  {category === 'Criminal Litigation' && (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>{`Select Description of Offense`}</InputLabel>
        <Select value={subCategory} onChange={handleSubCategoryChange}>
          {optionsCriminalLaw_2.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )}

  {/* 3rd  */}
  {category === 'Criminal Litigation' && (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>{`Select Details of Case`}</InputLabel>
        <Select value={subCategory} onChange={handleSubCategoryChange}>
          {optionsCriminalLaw_3.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )}
</>
);
}

LitigationForm.propTypes = {
formData: PropTypes.object.isRequired,
handleInputChange: PropTypes.func.isRequired,
};

export default LitigationForm;
