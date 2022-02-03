// import axios from 'axios';
// import { returnMsg } from './msgActions';
// import history from '../components/history';
import { CASES_LOADED, CASES_LOADING, DELETE_CASE, ADD_CASE } from "./types";
import fire, { firebaseConfig } from "../fire";
import firebase from "firebase";

// load case
export const loadCase = () => (dispatch, getState) => {
  dispatch({ type: CASES_LOADING });

  var fb = fire.getFire();
  var files = [];

  var cases = [];

  fb.database()
    .ref("/")
    .child("files")
    .once("value", function(snapshot) {
      files = {};
      snapshot.forEach((doc) => {
        var tempJSON = doc.toJSON();
        tempJSON["id"] = doc.key;

        //filter the cases if user type is worker and then push
        Object.keys(tempJSON.cases).map((caseKey) => {
          tempJSON.cases[caseKey]["case_number"] = caseKey;
          tempJSON.cases[caseKey]["file_number"] = doc.key;
          cases.push(tempJSON.cases[caseKey]);
        });
        files[tempJSON["id"]] = {};
        files[tempJSON["id"]]["cases"] = tempJSON.cases;
        files[tempJSON["id"]]["client_id"] = tempJSON.client_id;
      });

      // this.setState(
      //    { filesList: files}
      //   //  , ()=>{console.log(this.state.filesList)}
      // );
    })
    .then(() => {
      // console.log(cases.filter((Case) => Case))

      dispatch({
        type: CASES_LOADED,
        payload: { files: files, cases: cases },
      });
    });
};

const addCaseAndPayments = (payload) => {
  payload.caseDetails.clientId = payload.clientDetails.id;
  payload.paymentOptions.clientid = payload.clientDetails.id;
  return new Promise((res, rej) => {
    fire
      .getFire()
      .database()
      .ref("/invoice")
      .push(payload.paymentOptions)
      .then((snap) => {
        // Update successful.
        // Code for case addition to the same client file
        var client_key = payload.paymentOptions.clientid;

        fire
          .getFire()
          .database()
          .ref("files")
          .orderByChild("client_id")
          .equalTo(client_key)
          .once("value", (snapshot) => {
            console.log("searching!");

            if (snapshot.exists()) {
              console.log("found it!");

              var file_key = Object.keys(snapshot.toJSON())[0];

              console.log(file_key);

              fire
                .getFire()
                .database()
                .ref("files/" + file_key.toString() + "/cases/")
                .once("value")
                .then(function(snapshot) {
                  console.log("num of children");
                  console.log(snapshot.numChildren());

                  fire
                    .getFire()
                    .database()
                    .ref("files/" + file_key.toString() + "/cases/")
                    .child(snapshot.numChildren())
                    .set(payload.caseDetails)
                    .then(() => {
                      res({
                        caseDetails: payload.caseDetails,
                        file_n: file_key,
                      });
                    });
                });
            }
          });
      });
  });
};

export const addClientAndCase = (payload) => (dispatch, getState) => {
  return new Promise((res, rej) => {
    //convert dates to strings
    payload.clientDetails.dob = payload.clientDetails.dob.toLocaleString();
    for (var i = 0; i < payload.paymentOptions.installmentDate.length; i++) {
      payload.paymentOptions.installmentDate[
        i
      ].date = payload.paymentOptions.installmentDate[i].date.toLocaleString();
    }
    let id = payload.clientDetails.id;
    //if user exists already then only add case details and payment options
    fire
      .getFire()
      .database()
      .ref(`clients/${id}/`)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          console.log("client exists!");
          //only create case and payments
          addCaseAndPayments(payload)
            .then(({ caseDetails, file_n }) => {
              const files = getState().cases.files;
              const cases = getState().cases.cases;
              cases.push(caseDetails);
              console.log(files[file_n].cases);
              dispatch({
                type: ADD_CASE,
                payload: { files, cases },
              });
              res();
            })
            .catch((err) => rej(err));
        }
      });
    //return if id exists
    if (id) return;
    //add client, case and payments
    uploadPayload(payload)
      .then(() => {
        res();
      })
      .catch((err) => rej(err));
  });
};

const uploadPayload = (payload) => {
  //add client and make new client user

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
        payload.caseDetails.clientId = client_key;
        //add case

        fire
          .getFire()
          .database()
          .ref("/files")
          .once("value")
          .then(function(snapshot) {
            console.log("doin somethin");
            console.log(snapshot.numChildren());
            fire
              .getFire()
              .database()
              .ref("/files")
              .child(snapshot.numChildren())
              .set({
                cases: { 0: payload.caseDetails },
                client_id: client_key,
              });
          })
          .catch((err) => {
            rej(err);
          });

        //add payment options
        payload.paymentOptions.clientid = client_key;
        fire
          .getFire()
          .database()
          .ref("/invoice")
          .push(payload.paymentOptions)
          .then((snap) => {
            // Update successful.
            //add new client account
            addClientUser(payload.clientDetails.email)
              .then(() => {
                res();
              })
              .catch((err) => {
                rej(err);
              });
          });
      })
      .catch((err) => rej(err));
  });
};

//add client user account
const addClientUser = (email) => {
  var fb = firebase.initializeApp(firebaseConfig, "Secondary");
  return new Promise((res, rej) => {
    fb.auth()
      .createUserWithEmailAndPassword(email, "123456")
      .then(function(userobj) {
        const user = userobj.user;
        fb.database()
          .ref("users/" + user.uid)
          .set({
            displayName: user.displayName,
            credit: 0,
            email: user.email,
            image: "",
            type: "client",
          })
          .then(() => {
            fb.auth()
              .signOut()
              .then(() => {
                res();
              });
            //client added
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        rej(error);
        // ...
      });

    fb.delete();
  });
};

// Register User
export const register = (user) => (dispatch) => {};
