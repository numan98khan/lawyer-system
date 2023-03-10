import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import {FormHelperText } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import countryList from "react-select-country-list";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ButtonContainer from "../../../components/Button";
import Title from "../../../components/Title";

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
} from "../lists";
import { Fragment } from "react";



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "35vw",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function Casedetails(props) {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [caseSrc, setCaseSrc] = useState("");
  // const [caseStatus, setCaseStatus] = useState('open')
  const [caseTitle, setcaseTitle] = useState("");
  const [category, setCategory] = useState("Civil Litigation");
  const [subCategory, setSubCategory] = useState("");

  const [judge, setJudge] = useState("");
  const [courtCaseNo, setcourtCaseNo] = useState("");
  const [district, setDistrict] = useState("");

  const [legalOpinion, setLegalOpinion] = useState("");

  const handleLegalOpinionChange = (event) => {
    setLegalOpinion(event.target.value);
  };

  const [legalDrafting, setLegalDrafting] = useState('');
  const [dueDiligence, setDueDiligence] = useState('');
  const [legalisationRegistration, setLegalisationRegistration] = useState('');
  const [regulatoryWork, setRegulatoryWork] = useState('');
  const [litigationType, setLitigationType] = useState("");
  const [courtName, setCourtName] = useState("");
  
  const [otherWork, setOtherWork] = useState('');
  const [natureLitigation, setNatureLitigation] = useState('');

  const payload = {
    caseTitle,
    natureLitigation,
    caseSrc,
    category,
    subCategory,
    judge,
    district,
    legalOpinion,
    legalDrafting,
    dueDiligence,
    legalisationRegistration,
    regulatoryWork,
    litigationType,
    courtName,
    otherWork
  };

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


  useEffect(() => {
    return () => {
      // console.log("passed:",location.state)
    };
  });
  return (
    <div className="App-screen">
      <div style={{ marginBottom: "5%" }}>
        <Title title="Enter case information" />
      </div>

      {/* Case Title */}
      <FormControl className={classes.formControl}>
        <TextField
          variant="outlined"
          multiline={true}
          onChange={(e) => {
            setcaseTitle(e.target.value);
          }}
          label="case title"
        ></TextField>
      </FormControl>


      {/* Name of Court */}
      <FormControl className={classes.formControl}>

        <InputLabel>{`Nature of Litigation`}</InputLabel>


        <Select
          value={natureLitigation}
          onChange={(e) => {
            setNatureLitigation(e.target.value);
          }}
        >
          
          
          {optionsNatureLitigation.map((option, index) => {
            return (
              <MenuItem key={index} value={option.value}>
                {option.name}
              </MenuItem>
            );
          })}

        </Select>      
      </FormControl>


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


      {/* Case Subcategories */}
      <FormControl className={classes.formControl}>

      {/* Nature of Offense  */}

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
      {category === "Criminal Litigation" && 
        <>
        <FormControl className={classes.formControl}>

        <InputLabel>{`Select Description of Offense`}</InputLabel>
        <Select
          value={subCategory}
          onChange={(e) => {
            setSubCategory(e.target.value);
          }}
        >
          
          
          {optionsCriminalLaw_2.map((option, index) => {            
            return (
              <MenuItem key={index} value={option.value}>
                {option.name}
              </MenuItem>
            );
          })}

        </Select>
        </FormControl>
        </>
      }


      {/* 3rd  */}
      {category === "Criminal Litigation" && 
        <>
        <FormControl className={classes.formControl}>

        <InputLabel>{`Select Details of Case`}</InputLabel>
        <Select
          value={subCategory}
          onChange={(e) => {
            setSubCategory(e.target.value);
          }}
        >
          
          
          {optionsCriminalLaw_3.map((option, index) => {            
            return (
              <MenuItem key={index} value={option.value}>
                {option.name}
              </MenuItem>
            );
          })}

        </Select>
        </FormControl>
        </>
      }

    {/* Legal Opinion */}
    <FormControl className={classes.formControl}>
        <TextField
          id="legal-opinion-input"
          label="Enter your legal opinion here"
          value={legalOpinion}
          onChange={handleLegalOpinionChange}
          multiline
          rows={4}
        />
        <FormHelperText>
          Please enter your legal opinion in the field above.
        </FormHelperText>
    </FormControl>

    <FormControl className={classes.formControl}>
      {/* <InputLabel htmlFor="legal-drafting-input">Legal Drafting</InputLabel> */}
      <TextField
        label="Legal Drafting"
        id="legal-drafting-input"
        value={legalDrafting}
        onChange={(e) => setLegalDrafting(e.target.value)}
      />
    </FormControl>

    <FormControl className={classes.formControl}>
      {/* <InputLabel htmlFor="due-diligence-input">Due Diligence</InputLabel> */}
      <TextField
        label="Due Diligence"
        id="due-diligence-input"
        value={dueDiligence}
        onChange={(e) => setDueDiligence(e.target.value)}
      />
    </FormControl>

    <FormControl className={classes.formControl}>
      {/* <InputLabel htmlFor="legalisation-registration-input">Legalisation/Registration of Documents etc.</InputLabel> */}
      <TextField
        label="Legalisation/Registration of Documents etc."
        id="legalisation-registration-input"
        value={legalisationRegistration}
        onChange={(e) => setLegalisationRegistration(e.target.value)}
      />
    </FormControl>

    <FormControl className={classes.formControl}>
      {/* <InputLabel htmlFor="regulatory-work-input">Regulatory Work</InputLabel> */}
      <TextField
        label="Regulatory Work"
        id="regulatory-work-input"
        value={regulatoryWork}
        onChange={(e) => setRegulatoryWork(e.target.value)}
      />
    </FormControl>

    <FormControl className={classes.formControl}>

      {/* Nature of Offense  */}

        <InputLabel>{`Litigation`}</InputLabel>
      
      
      <Select
        value={litigationType}
        onChange={(e) => {
          setLitigationType(e.target.value);
        }}
      >
        
        
        {optionsLitigationTypes.map((option, index) => {
          return (
            <MenuItem key={index} value={option.value}>
              {option.name}
            </MenuItem>
          );
        })}

      </Select>      
      </FormControl>

    <FormControl className={classes.formControl}>
      {/* <InputLabel htmlFor="other-work-input">Other Please Specify</InputLabel> */}
      <TextField
        label="Other Please Specify"
        id="other-work-input"
        value={otherWork}
        onChange={(e) => setOtherWork(e.target.value)}
      />
    </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          variant="outlined"
          multiline={true}
          minRows={"1"}
          onChange={(e) => {
            setcourtCaseNo(e.target.value);
          }}
          label="court case#"
        ></TextField>
      </FormControl>


    {/* Name of Court */}
    <FormControl className={classes.formControl}>

      <InputLabel>{`Name of Court`}</InputLabel>


      <Select
        value={courtName}
        onChange={(e) => {
          setCourtName(e.target.value);
        }}
      >
        
        
        {optionsCourts.map((option, index) => {
          return (
            <MenuItem key={index} value={option.value}>
              {option.name}
            </MenuItem>
          );
        })}

      </Select>      
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          variant="outlined"
          minRows={"5"}
          onChange={(e) => {
            setJudge(e.target.value);
          }}
          label="Name of the Judge"
        ></TextField>
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          variant="outlined"
          minRows={"5"}
          onChange={(e) => {
            setDistrict(e.target.value);
          }}
          label="District/Bench/Tehsil"
        ></TextField>
      </FormControl>


     


{/* GAPPPPP */}




      <FormControl className={classes.formControl}>
        <ButtonContainer
          onClick={() => {
            
            location.state.caseDetails = payload;

            console.log(location.state);
            
            history.push({
              pathname: "/paymentoptions",
              state: location.state,
            });
          }}
        >
          Save case details
        </ButtonContainer>
      </FormControl>

    </div>
  );
}

const mapStateToProps = (state) => ({
  worker: state.caseworker,
});
export default connect(mapStateToProps, {})(Casedetails);

//remarks
//next proceeding date

//previous date
//everything else
//updated by
