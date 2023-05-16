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

import Title from "../../components/Title";

import Navigation from './Navigation';
import './Form.css';
import fire, { firebaseConfig } from "../../fire";

import ButtonContainer from '../../components/Button';

import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import { addClientAndCase, addCaseFirestore } from "../../actions/caseActions";
import { addHearingEntry, loadHearings } from "../../actions/hearingActions";


import { connect } from 'react-redux';
import {useHistory,useLocation} from 'react-router-dom';

import {dummyFormData as dummy_data } from './lists';
import {dummyFormData1 as dummy_data1 } from './lists';



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

  const breadCrumbs = location.state.clientDetails.firstName + ' ' +
                      location.state.clientDetails.lastName + ' / ' +
                      location.state.clientDetails.contactNumber + ' / ' + 
                      location.state.file_n + ' / ' + 
                      location.state.case_n;

  ///*
  const [formData, setFormData] = useState({
    // category: 'Civil Litigation',
    isOrganization: false,

    legalOpinion: false,
    legalDrafting: false,
    dueDiligence: false,
    legalisationRegistration: false,
    regulatoryWork: false,
    litigationWork: false,

    clientId: location.state.clientId,
    
    // courtName: '',
    // TODO: Find a more elegant solution rather than mapping
    clientDetails: {
      "name": location.state.clientDetails.firstName + ' ' + location.state.clientDetails.lastName,
      "clientName": location.state.clientDetails.firstName + ' ' + location.state.clientDetails.lastName,
      "clientAddress": location.state.clientDetails.address, 
      // "clientAddress": "House # 1029D, Street # 46",
      "phoneNumber": location.state.clientDetails.contactNumber, 
      "email": location.state.clientDetails.email, 
      "cnicNumber": location.state.clientDetails.cnic, 
      "ntn": "123654789",
      "plaintiff": "Defendant"
      
    },
    otherPartyDetails: {},
    otherParties: [{}],
    contactPerson: {},

    // // Worker Details
    // worker: null,
    // clerk: null,
    // caseowner: null,

    litigation: {category: 'Civil Litigation', subCategory: null}
    // litigation: {}
  });
  // */


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
      console.log(objName, propName, index)
  
      // update the nested object property
      setFormData(prevState => {
        // When index is undefined, update the top-level property.
        if (!Number.isInteger(index)) {
          return {
            ...prevState,
            [objName]: {
              ...prevState[objName],
              [propName]: value
            }
          };
        }
        
        console.log('INDEX', index, prevState);
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
      setFormData(prevState => {
        // Handle the 'isNA' checkbox for the 'court' field
        if (name === 'isNACourt') {
          if (prevState.court === 'N/A') {
            return { ...prevState, ['court']: null };  
          } else {
            return { ...prevState, ['court']: 'N/A' };
          }
        }
        if (name === 'isNANOL') {
          if (prevState.natureOfLitigation === 'N/A') {
            return { ...prevState, ['natureOfLitigation']: null };  
          } else {
            return { ...prevState, ['natureOfLitigation']: 'N/A' };
          }
        }
        return { ...prevState, [name]: value };
      });
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




  return (
    <div>
    <Title title={breadCrumbs} extraSpace leftSpace />
    <div className="form-container">
      
      <div className="flex-container"> 
      <Navigation step={step} setStep={setStep} />
        
      <div className="form">
        
        {/* <Title title="CRUMBS" extraSpace leftSpace /> */}
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
                    // console.log('form data', formData);
                    // location.state.caseDetails = formData;
                    // location.state.paymentOptions = {};
                    // console.log(location.state);
                    
                    // // const latestFileAndCase = getLatestFileAndCase(location.state.clientDetails.id);
                    // getLatestFileAndCase(location.state.clientDetails.id).then((obj)=>{
                    //   console.log('OBJ', obj);
                    // });
                    
                    formData['file_number'] = location.state.file_n;
                    formData['case_number'] = location.state.case_n;

                    console.log(formData)

                    // props.addCaseFirestore(formData).then(({ caseDetails, file_n, case_n })=>{
                    //     console.log('location.state', caseDetails, file_n, case_n, initCase);

                    // });

                    console.log('Observe Payload', retCase, initCase, props);
                    /*
                    props.addClientAndCase(location.state).then(({ caseDetails, file_n, case_n })=>{
                      console.log('location.state', caseDetails, file_n, case_n, initCase);
                  

                      try {
                        caseDetails['substantiveDateOfLastHearing'] = caseDetails['substantiveDateOfLastHearing'].toString();
                      } catch (error) {
                        console.log("Error converting substantiveDateOfLastHearing to string:", error);
                        caseDetails['substantiveDateOfLastHearing'] = "";
                      }
                      
                      try {
                        caseDetails['substantiveDateOfNextHearing'] = caseDetails['substantiveDateOfNextHearing'].toString();
                      } catch (error) {
                        console.log("Error converting substantiveDateOfNextHearing to string:", error);
                        caseDetails['substantiveDateOfNextHearing'] = "";
                      }

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

export default connect(mapStateToProps, { addHearingEntry, loadHearings, addClientAndCase, addCaseFirestore })(
  Form
);

// export default connect(mapStateToProps, { addClientAndCase })(
//   Form
// );

