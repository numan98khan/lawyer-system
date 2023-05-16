import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Title from "../../components/Title";
import DateFnsUtils from '@date-io/date-fns';
import countryList from 'react-select-country-list';
import ButtonContainer from '../../components/Button';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';

import fire, { firebaseConfig } from "../../fire";
import firebase from "firebase/app";
import "firebase/firestore";

// import { uploadPayload } from "../../actions/caseActions";
// import { addHearingEntry, loadHearings } from "../../actions/hearingActions";


import { connect, useDispatch } from 'react-redux';
import {useLocation} from 'react-router-dom';

const countries = countryList().getData();
countries.unshift({ value: "", label: "" });

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '25vw',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(2),
  },
}));


// const db = fire.db();

const uploadPayloadFirestore = async (payload) => {
  console.log('Firestore Upload started')
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  payload.clientDetails["registration_time"] = datetime;

  try {
    // console.log('payload', payload)

    const clientDocRef = await fire.db.collection("clients").add(payload.clientDetails);

    const client_key = clientDocRef.id;

    // console.log(client_key);

    // const caseDocRef = await fire.db.collection("cases").add(payload.clientDetails);


    // const filesSnapshot = await fire.db.collection("files").get();
    // const filesCount = filesSnapshot.size;
    
    // await fire.db.collection("files").doc(filesCount.toString()).set({
    //   cases: [{ 0: payload.caseDetails }],
    //   client_id: client_key,
    // });

    // await fire.db.collection("invoice").add(payload.paymentOptions);


    // return payload;
    return client_key;

  } catch (err) {
    console.log(err)
    throw err;
  }
};


const addClientFirestore = (payload) => async (dispatch, getState) => {
  console.log('Firestore process started')
  const clientDetails = payload;
  clientDetails.dob = clientDetails.dob.toLocaleString();

  let id = clientDetails.id;

  console.log(id)

  try {
    return uploadPayloadFirestore({ clientDetails: payload });
    // const clientDocSnapshot = await fire.db.collection("clients").doc(id).get();

    // if (clientDocSnapshot.exists) {
    //   console.log("client exists!");
    //   return { clientDetails, message: "Client already exists" };
    // } else {
    //   if (!id) {
    //     return uploadPayloadFirestore({ clientDetails: payload });
    //   } 
      // else {
      //   await db.collection("clients").doc(id).set(clientDetails);
      //   return { clientDetails, message: "Client added successfully" };
      // }
    // }
  } catch (err) {
    throw err;
  }
};


const uploadPayload = (payload) => {
  //add client and make new client user
  // console.log("uploadPayload", payload)

  return new Promise((res, rej) => {
    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    payload.clientDetails["registration_time"] = datetime;

    fire
      .getFire()
      .database()
      .ref("/clients")
      .push(payload.clientDetails)
      .then((snap) => {
        // Update successful.
        var client_key = snap.key;
        // payload.caseDetails.clientId = client_key;
        //add case

        fire
          .getFire()
          .database()
          .ref("/files")
          .once("value")
          .then(function(snapshot) {
            console.log("doin somethin", payload.caseDetails, client_key);
            console.log(snapshot.numChildren());
            fire
              .getFire()
              .database()
              .ref("/files")
              .child(snapshot.numChildren())
              .set({
                cases: [{ 0: payload.caseDetails }],
                client_id: client_key,
              });
          })
          .catch((err) => {
            rej(err);
          });

        //add payment options
        // payload.paymentOptions.clientid = client_key;

        fire
          .getFire()
          .database()
          .ref("/invoice")
          .push(payload.paymentOptions)
          .then((snap) => {

            // TODO: figure out if adding an accoount for the client is necessary
            // // Update successful.
            // //add new client account
            // addClientUser(payload.clientDetails.email)
            //   .then(() => {
            //     res();
            //   })
            //   .catch((err) => {
            //     rej(err);
            //   });

          });

      })
      .catch((err) => rej(err));
  });
};


const addClient = (payload) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const clientDetails = payload
    // Convert date to string
    clientDetails.dob = clientDetails.dob.toLocaleString();

    let id = clientDetails.id;

    console.log(id)

    // Check if the user exists already
    fire
      .getFire()
      .database()
      .ref(`clients/${id}/`)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          console.log("client exists!");
          resolve({ clientDetails, message: "Client already exists" });
        } else {
          // Add client
          // fire
          //   .getFire()
          //   .database()
          //   .ref(`clients/${id}/`)
          //   .set(clientDetails)
          //   .then(() => {
          //     // Update the Redux state if needed
          //     // Example:
          //     // const clients = getState().clients;
          //     // clients.push(clientDetails);
          //     // dispatch({ type: ADD_CLIENT, payload: { clients } });

          //     resolve({ clientDetails, message: "Client added successfully" });
          //   })
          //   .catch((err) => reject(err));

        }
      });

    //return if id exists
    if (id) return;
    payload = {clientDetails: payload}
    //add client, case and payments
    uploadPayload(payload)
      .then(() => {
        resolve(payload);
      })
      .catch((err) => reject(err));
  });
};

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

// const Addclient = (props) => 
function Addclient(props) {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();

  const dispatch = useDispatch();

  const [state, setState] = useState({
    title: '', firstName: '', lastName: '', dob: new Date(), gender: '', nationality: '',
    companyName: '', address: '', town: '', country: '', zipcode: '', email: '',
    contactNumber: '', preferredCorr: '', howDidYou: '', cnic: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date) => {
    setState((prevState) => ({ ...prevState, dob: date }));
  };

  const SelectInput = ({ label, name, value, options }) => (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={handleChange}>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const TextInput = ({ label, name }) => (
    <FormControl className={classes.formControl}>
      <TextField name={name} value={state[name]} onChange={handleChange} label={label} />
    </FormControl>
  );


  return (
    <div className="App-screen">
        <div style={{ marginBottom: "5%" }}>
            <Title title="Enter client information" />
        </div>
        <div className={classes.formContainer}>
            <SelectInput label="title" name="title" value={state.title} options={[
                { value: 'Mr.', label: 'Mr.' },
                { value: 'Mrs.', label: 'Mrs.' },
                { value: 'Ms.', label: 'Ms.' },
                { value: '(Other)', label: 'Other' },
                ]} />
            <TextInput label="first name" name="firstName" />
            <TextInput label="last name" name="lastName" />
            <SelectInput label="gender" name="gender" value={state.gender} options={[
                { value: 'male', label: 'male' },
                { value: 'female', label: 'female' },
            ]} />
            <FormControl className={classes.formControl}>
                <InputLabel>cnic</InputLabel>
                <Input name="cnic" value={state.cnic} onChange={handleChange} inputComponent={TextMaskCustom} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date of birth"
                    format="MM/dd/yyyy"
                    value={state.dob}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                    'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
            </FormControl>
            <SelectInput label="country" name="country" value={state.country} options={countries} />
            <SelectInput label="nationality" name="nationality" value={state.nationality} options={countries} />
            <TextInput label="company name" name="companyName" />
            <TextInput label="address" name="address" />
            <TextInput label="town" name="town" />
            <TextInput label="zip code" name="zipcode" />
            <TextInput label="email" name="email" />
            <SelectInput label="preferred correspondence" name="preferredCorr" value={state.preferredCorr} options={[
                { value: 'by post', label: 'by post' },
                { value: 'by email', label: 'by email' },
                { value: 'by hand', label: 'by hand' },
                { value: 'any', label: 'any' },
                { value: 'both email and post', label: 'both email and post' },
                ]} />
            <TextInput label="contact number" name="contactNumber" />
            <TextInput label="how did you hear about us?" name="howDidYou" />

        </div>
        <div className={classes.formContainer}>
            <FormControl className={classes.formControl}>
                <ButtonContainer 
                    onClick={() => 
                        {
                            console.log('hehe', props, state);
                            // props.addClientAndCase();
                            // addClientFirestore(state)
                            dispatch(addClientFirestore(state))
                            .then((obj)=>{
                                console.log('OBJ', obj)
                            });

                            // dispatch(addClient(state))
                            // .then((obj)=>{
                            //     console.log('OBJ', obj)
                            // });
                            // .then((obj)=>{
                            //     console.log('OBJ', obj)
                            // });

                        }
                        // history.push({ pathname: '/addcasedetails', state: { clientDetails: state } })
                    }
                    >
                    Save and Quit
                </ButtonContainer>
            </FormControl>
            <FormControl className={classes.formControl}>
                <ButtonContainer onClick={() =>{ 
                  dispatch(addClientFirestore(state))
                  .then((obj)=>{
                      console.log('OBJ', obj)
                      history.push({ pathname: '/addcasedetails', state: { clientId: obj, clientDetails: state } })
                  
                  });
                  }
                }>
                Save and Add Case
                </ButtonContainer>
            </FormControl>
        </div>
        </div>
    );
};
export default Addclient;

// const mapStateToProps = (state) => ({
     
//     // type: state.type
//   });
  
// export default connect(mapStateToProps, {addClientAndCase, addClient })(
// Addclient
// );



