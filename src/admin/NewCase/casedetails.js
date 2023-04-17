import React, { useState } from 'react';
import CaseInstructions from './Step1';

import LegalOpinion from './Step2';
import CaseDetails  from './Step3';
import CourtDetails from './Step4';
import ClientDetails from './Step5';
import OtherPartyDetails from './Step6';
import ContactPerson from './Step7';
import NatureOfLitigation from './Step8';
import CaseCategory from './Step9';
import WorkerAssignment from './Step10';

import Navigation from './Navigation';
import './Form.css';

import ButtonContainer from '../../components/Button';

import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import { addClientAndCase } from "../../actions/caseActions";
import { addHearingEntry, loadHearings } from "../../actions/hearingActions";


import { connect } from 'react-redux';
import {useHistory,useLocation} from 'react-router-dom';



import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // minWidth: '35vw',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



function Form(props) {
  const [step, setStep] = useState(1);
  const location = useLocation();
  

  const [category, setCategory] = useState("Civil Litigation");
  const [subCategory, setSubCategory] = useState("");

  // Add hearing code
  const [retCase, setRetCase] = React.useState(null);

  const [initCase, setInitCase] = React.useState(null);

  const [nextProceedings, setNextProceedings] = React.useState("");
  const [dob, setdob] = React.useState(new Date());
  const [newCase, setnewCase] = React.useState(null);
  const [workers, setworkers] = React.useState({});


  
  const classes = useStyles();

  const [formData, setFormData] = useState({
    // category: 'Civil Litigation',
    isOrganization: false,

    legalOpinion: false,
    legalDrafting: false,
    dueDiligence: false,
    legalisationRegistration: false,
    regulatoryWork: false,
    litigationWork: false,
    
    // courtName: '',
    clientDetails: {name: 'Nauman'},
    otherPartyDetails: {},
    otherParties: [{}],
    contactPerson: {},

    // // Worker Details
    // worker: null,
    // clerk: null,
    // caseowner: null,

    litigation: {category: 'Civil Litigation'}
  });


  /*
  const handleInputChange = (event, index) => {
    console.log(event);
  
    let name, value;
    if (event.target === undefined) {
      ({ name, value } = event);
    } else {
      ({ name, value } = event.target);
  
      if (event.target.type === 'checkbox') {
        value = event.target.checked;
      }
    }
  
    console.log("Upstream", name, value, event.target?.checked, event.target, index);
  
    // check if the name contains a '.' indicating a nested object
    if (name.includes('.')) {
      // separate the nested object key and property name
      const [objName, propName] = name.split('.');

      if (index !== undefined) {
        // console.log('INDEX EDITING', index);
        // update the nested object property
        setFormData(prevState => ({
          ...prevState,
          otherParties: prevState.otherParties.map((otherParty, idx) => {
            console.log(otherParty);
            if (idx === index) {
              console.log('hear me!');
              return {
                ...otherParty,
                [objName]: {
                  ...otherParty[objName],
                  [propName]: value
                }
              };
            }
            console.log(otherParty);
            return otherParty;
          })
        }));
      } else {
  
        // update the nested object property
        setFormData(prevState => ({
          ...prevState,
          [objName]: {
            ...prevState[objName],
            [propName]: value
          }
        }));

      }

    } else {

        // update the top-level property
        setFormData({ ...formData, [name]: value });
      
    }
  
    console.log(formData);
  };
  //*/

  const handleInputChange = (event, index) => {
    console.log(event);
  
    let name, value;
    if (event.target === undefined) {
      ({ name, value } = event);
    } else {
      ({ name, value } = event.target);
  
      if (event.target.type === 'checkbox') {
        value = event.target.checked;
      }
    }
  
    console.log("Upstream", name, value, event.target?.checked, event.target, index);
  
    // check if the name contains a '.' indicating a nested object
    if (name.includes('.')) {
      // separate the nested object key and property name
      const [objName, propName] = name.split('.');
  
      // update the nested object property
      setFormData(prevState => {
        // When index is undefined, update the top-level property.
        if (index === undefined) {
          return {
            ...prevState,
            [objName]: {
              ...prevState[objName],
              [propName]: value
            }
          };
        }
  
        // When index is provided, update the otherParties property.
        return {
          ...prevState,
          otherParties: prevState.otherParties.map((otherParty, idx) => {
            if (idx === index) {
              console.log(index, otherParty)
              return {
                ...otherParty,
                [objName]: {
                  ...otherParty[objName],
                  [propName]: value
                }
              };
            }
            return otherParty;
          })
        };
      });
    } else {
      // update the top-level property
      setFormData({ ...formData, [name]: value });
    }
  
    console.log(formData);
  };
  
  

  const handleAddOtherParty = () => {
    setFormData({
      ...formData,
      otherParties: [...formData.otherParties, {}],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('MySubmit', step);


    if (step < 10) {
      setStep(step + 1);
    } else {

      // console.log(formData);
    }

    // TODO: Fix this hard coded special case for going next
    if (step === 1) {
      setStep(step + 2);
    }
  };

  function getCaseData(fnum, cnum) {
    //check if case is new or hearing exists already
    //if hearing exists, get data from hearing
    //else get it from cases table ::: contextValue.filesList
    if (props.cases.files.length === 0) {
      return;
    }

    var cases = props.cases.files[fnum].cases;
    var retCase = null;
    var peshiData = null;

    // console.log(cases);
    console.log(props.hearings);
    console.log(cases[cnum]);
    // ::: contextValue.peshiList
    if (cases[cnum] !== undefined && props.hearings) {
      console.log("fnum", fnum, cnum);

      peshiData = props.hearings.hearings
        .filter((x) => x.case_n === cnum)
        .filter((x) => x.file_n === fnum);

      // console.log()
      console.log("what", peshiData);

      if (peshiData.length > 0) {
        setnewCase(false);
        retCase = peshiData.pop();

        // let trueDeep = jQ.extend(true, retCase, {});

        var trueDeep = _.cloneDeep(retCase);

        console.log("trueDeep", trueDeep);

        setInitCase(trueDeep);
      } else {
        setnewCase(true);
        retCase = cases[cnum];
        retCase["previous_proceedings"] = "new case";
        retCase["previous_proceedings_date"] = "new case";
        retCase["file_n"] = fnum;
        retCase["case_n"] = cnum;
        // retCase['updated_by'] = 'noman';
      }
      retCase["updated_by"] = props.user.email;

      setRetCase(retCase);
      console.log('retCase', retCase);

      return retCase;
      // console.log(peshiData)
    }
  }

  async function getCaseData(fnum, cnum) {
    return new Promise(async (resolve) => {
      if (props.cases.files.length === 0) {
        resolve(null);
        return;
      }
  
      const cases = props.cases.files[fnum].cases;
      let retCase = null;
  
      if (cases[cnum] !== undefined && props.hearings) {
        const peshiData = props.hearings.hearings
          .filter((x) => x.case_n === cnum && x.file_n === fnum);
  
        if (peshiData.length > 0) {
          setnewCase(false);
          retCase = _.cloneDeep(peshiData.pop());
          setInitCase(retCase);
        } else {
          setnewCase(true);
          retCase = { ...cases[cnum], previous_proceedings: "new case", previous_proceedings_date: "new case", file_n: fnum, case_n: cnum, updated_by: props.user.email };
        }
        setRetCase(retCase);
      }
      resolve(retCase);
    });
  }
  


  return (
    <div className="form-container">
      <Navigation step={step} setStep={setStep} />
        
      <div className="form">
        
        <form className="sub-form" onSubmit={handleSubmit}>
          {step === 1 && (
            
            <><CaseInstructions formData={formData} handleInputChange={handleInputChange} />

            {/* <LegalOpinion formData={formData} handleInputChange={handleInputChange} />

            <CaseDetails formData={formData} handleInputChange={handleInputChange} /> */}
            </>
          )}
          {/* {step === 2 && (
            <LegalOpinion formData={formData} handleInputChange={handleInputChange} />
          )}*/}
          {step === 3 && (
            <CaseDetails formData={formData} handleInputChange={handleInputChange} />
          )} 
          {step === 4 && (
            <CourtDetails formData={formData} handleInputChange={handleInputChange} />
          )}
          {step === 5 && (

            // <OtherPartyDetails formData={formData} handleInputChange={handleInputChange} />
            <ClientDetails formData={formData} handleInputChange={handleInputChange} />
          )}
          {step === 6 && (

            // <ClientDetails formData={formData} handleInputChange={handleInputChange} />
            // <OtherPartyDetails formData={formData} handleInputChange={handleInputChange} />

            <ContactPerson formData={formData} handleInputChange={handleInputChange} />
          )}
          {step === 7 && (
            // <ContactPerson formData={formData} handleInputChange={handleInputChange} />

            <OtherPartyDetails formData={formData} handleInputChange={handleInputChange} handleAddOtherParty={handleAddOtherParty}/>
          )}
          {step === 8 && (
            <NatureOfLitigation formData={formData} handleInputChange={handleInputChange} />
          )}
          {step === 9 && (
            <CaseCategory category={category} setCategory={setCategory} subCategory={subCategory} setSubCategory={setSubCategory} formData={formData} handleInputChange={handleInputChange} />
          )}

          {step === 10 && (
            <WorkerAssignment workers={props.caseworkers} category={category} setCategory={setCategory} subCategory={subCategory} setSubCategory={setSubCategory} formData={formData} handleInputChange={handleInputChange} />
          )}

          {/* form buttons */}
          <div className="form-buttons">
            {step < 10 ? (
              <FormControl className={classes.formControl}>
                <ButtonContainer
                  // onClick={() => setStep(step + 1)}
                  onClick={() => {

                    location.state.caseDetails = formData;
                    location.state.paymentOptions = {};
                    console.log(location.state);
                    // props.addClientAndCase(location.state).then(()=>{
                    //     alert("case added successfully")
                    //     // history.push('/')
                    // });
                  }}
                >
                  Next
                </ButtonContainer>
              </FormControl>
            ) : (
              <FormControl className={classes.formControl}>
                <ButtonContainer
                  onClick={() => {
                    console.log('form data', formData);
                    location.state.caseDetails = formData;
                    location.state.paymentOptions = {};
                    console.log(location.state);
                    

                    console.log('Observe Payload', retCase, initCase);
                    /*
                    props.addClientAndCase(location.state).then(({ caseDetails, file_n, case_n })=>{
                      console.log('location.state', caseDetails, file_n, case_n, initCase);
                      // const temp_case = getCaseData(file_n, case_n);
                      // setnewCase(true);
      
                      // retCase = props.cases[cnum];
                      // temp_case["previous_proceedings"] = "new case";
                      // temp_case["previous_proceedings_date"] = "new case";
                      // retCase["file_n"] = fnum;
                      // retCase["case_n"] = cnum;
                      // temp_case["updated_by"] = props.user.email;
                      
                      // }

                      // console.log('Observe Payload', temp_case, initCase);

                      // retCase["next_proceedings_date"] = dob.toLocaleDateString("en-US");
                      // retCase["next_proceedings"] = nextProceedings;

                      caseDetails['substantiveDateOfLastHearing'] = caseDetails['substantiveDateOfLastHearing'].toString()
                      caseDetails['substantiveDateOfNextHearing'] = caseDetails['substantiveDateOfNextHearing'].toString()

                      caseDetails["updated_by"] = props.user.email;
                      caseDetails["file_n"] = file_n;
                      caseDetails["case_n"] = case_n;


                      
                      
                      props
                      .addHearingEntry(caseDetails, initCase)
                      .then(() => {
                        //clear everything
                        // setFileNum("");
                        // setCourtCase("");
                        setRetCase(null);
                        setNextProceedings("");
                        setdob(new Date());
                        setnewCase(null);
                        alert("case added successfully");
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                        
                        // history.push('/')
                    });
                    // */


                  }}


                >
                  Submit
                </ButtonContainer>
              </FormControl>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// export default Form;

const mapStateToProps = (state) => ({
  caseworkers: state.caseworker.case_workers,
  cases: state.cases,
  user: state.user.user,
  hearings: state.hearing,
  // type: state.type
});

export default connect(mapStateToProps, { addHearingEntry, loadHearings, addClientAndCase })(
  Form
);

// export default connect(mapStateToProps, { addClientAndCase })(
//   Form
// );

