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
import { connect } from 'react-redux';
import {useHistory,useLocation} from 'react-router-dom';



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

  
  const classes = useStyles();

  const [formData, setFormData] = useState({
    // category: 'Civil Litigation',

    legalOpinion: false,
    legalDrafting: false,
    dueDiligence: false,
    legalisationRegistration: false,
    regulatoryWork: false,
    
    // courtName: '',
    clientDetails: {name: 'Nauman'},
    otherPartyDetails: {},
    contactPerson: {},

    // // Worker Details
    // worker: null,
    // clerk: null,
    // caseowner: null,

    litigation: {category: 'Civil Litigation'}
  });

  console.log('MyProps', props);

  const handleInputChange = (event) => {
    console.log(event);
    if (event.target === undefined) {
      const { name, value } = event;

      setFormData({ ...formData, [name]: value });
      return 
    }
    
    
    const { name, value } = event.target;

    console.log("Upstream", name, value, event.target);
  
    // check if the name contains a '.' indicating a nested object
    if (name.includes('.')) {
      // separate the nested object key and property name
      const [objName, propName] = name.split('.');
  
      // update the nested object property
      setFormData(prevState => ({
        ...prevState,
        [objName]: {
          ...prevState[objName],
          [propName]: value
        }
      }));
    } else {
      if ( event.target.checked) {
        setFormData({ ...formData, [name]: event.target.checked });

      } else {
        // update the top-level property
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step < 10) {
      setStep(step + 1);
    } else {

      // console.log(formData);
    }
  };

  return (
    <div className="form-container">
      <div className="form">
        <Navigation step={step} setStep={setStep} />
        <form className="sub-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <CaseInstructions formData={formData} handleInputChange={handleInputChange} />
          )}
          {step === 2 && (
            <LegalOpinion formData={formData} handleInputChange={handleInputChange} />
          )}
          {step === 3 && (
            <CaseDetails formData={formData} handleInputChange={handleInputChange} />
          )}
          {step === 4 && (
            <CourtDetails formData={formData} handleInputChange={handleInputChange} />
          )}
          {step === 5 && (
            <ClientDetails formData={formData} handleInputChange={handleInputChange} />
          )}
          {step === 6 && (
            <OtherPartyDetails formData={formData} handleInputChange={handleInputChange} />
          )}
          {step === 7 && (
            <ContactPerson formData={formData} handleInputChange={handleInputChange} />
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
                    location.state.caseDetails = formData;
                    location.state.paymentOptions = {};
                    console.log(location.state);
                    props.addClientAndCase(location.state).then(()=>{
                        alert("case added successfully")
                        // history.push('/')
                    });
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
  // type: state.type
});
export default connect(mapStateToProps, { addClientAndCase })(
  Form
);

