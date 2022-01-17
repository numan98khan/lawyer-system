// import axios from 'axios';
// import { returnMsg } from './msgActions';
// import history from '../components/history';
import {
  CASES_LOADED,
  CASES_LOADING,
  DELETE_CASE
} from './types';
import fire from  '../fire';




  // load case
  export const loadCase = () => (
    dispatch, getState
  ) => {

    dispatch({ type: CASES_LOADING });
    
    var fb=fire.getFire();
    var files = [];
    
    var cases = []

    fb.database().ref('/')
      .child('files')
      .once("value", function(snapshot) {
        files = []
        snapshot.forEach((doc) => {
          
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key

              console.log(tempJSON.cases)

              cases.push(tempJSON.cases[0])

              //filter the cases if user type is worker and then push
              files.push(tempJSON);

        })        

        // this.setState(
        //    { filesList: files}
        //   //  , ()=>{console.log(this.state.filesList)}
        // );


    }).then(()=>{
        // console.log(cases.filter((Case) => Case))

        dispatch({
          type: CASES_LOADED,
          payload: {files:files, cases:cases}
      })
    });

    
  };



export const addClientAndCase = (payload) =>  (
  dispatch, getState
) => {
  //convert dates to strings
  payload.clientDetails.dob = payload.clientDetails.dob.toLocaleString();
  for(var i=0; i< payload.paymentOptions.installmentDate.length; i++){
    payload.paymentOptions.installmentDate[i].date = payload.paymentOptions.installmentDate[i].date.toLocaleString();
  }
  let id = payload.clientDetails.id
  //if user exists already then only add case details and payment options
  fire.getFire().database().ref(`clients/${id}/`).once("value", snapshot => {
    if (snapshot.exists()){
      console.log("client exists!");
      addCaseAndPayments(payload);
    }
  });
  //return if id exists
  if (id)
    return;
  
  //if new users then add client and make new client user, case, payment options
  //convert dates to strings
  // payload.paymentOptions.installmentDate = payload.paymentOptions.installmentDate.toLocaleString();
  uploadPayload(payload);
}


const addCaseAndPayments = (payload) => {
  payload.caseDetails.clientId = payload.clientDetails.id
  
  // fix: /cases additions they are redundant
  fire.getFire().database()
  .ref("/cases")
  .push(
    payload.caseDetails)
    .then((snap)=> {
      
      // console.log(snap.doc)
      
      var case_key = snap.key;
      payload.paymentOptions.clientid = payload.clientDetails.id;
      payload.caseDetails.case_id = case_key;
      fire.getFire().database()
      .ref("/invoice")
      .push(
        payload.paymentOptions)
        .then((snap)=> {
          // Update successful.
          console.log("case and payment options added successfully");
          // Code for case addition to the same client file
          //*
          var client_key = payload.paymentOptions.clientid

          fire.getFire().database()
          .ref("files")
          .orderByChild("client_id")
          .equalTo(client_key)
          .once("value",snapshot => {
            
            console.log("searching!");
            
            if (snapshot.exists()){

              console.log("found it!");
            
              var file_key = Object.keys(snapshot.toJSON())[0];

              console.log(file_key);
              
              fire.getFire().database().ref("files/" + file_key.toString() + "/cases/").once("value")
              .then(function(snapshot) {
                console.log("num of children");
                console.log(snapshot.numChildren()); 

                fire.getFire().database().ref("files/" + file_key.toString() + "/cases/")
                .child(snapshot.numChildren())
                .set(payload.caseDetails)
            
              });

                // fire.getFire().database().ref("files/" + file_key.toString() + "/cases/").child
            }

          });

          //*/
        });
      
    }); 
}

const uploadPayload = (payload) => {
  //add client and make new client user

  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();

  payload.clientDetails['registration_time'] = datetime;

  fire.getFire().database()
  .ref("/clients")
  .push(
    payload.clientDetails)
    .then((snap)=> {
      // Update successful.
      var client_key = snap.key;
      payload.caseDetails.clientId = client_key;
      fire.getFire().database()
      .ref("/cases")
      .push(
        payload.caseDetails)
        .then((snap)=> {
          var case_key = snap.key;
          var client_key = payload.caseDetails.clientId;


          
          // Code for new client and file creation
          //*
          console.log("debug!"); 
          payload.caseDetails.case_id = case_key;
          fire.getFire().database().ref("/files").once("value")
              .then(function(snapshot) {
                console.log("doin somethin"); 
                console.log(snapshot.numChildren()); 
                fire.getFire().database()
                .ref("/files")
                .child(snapshot.numChildren())
                .set({cases:{0:payload.caseDetails}, client_id:client_key})
            });

          //*/
          
          payload.paymentOptions.clientid = client_key;
          payload.paymentOptions.caseid = case_key;
          fire.getFire().database()
          .ref("/invoice")
          .push(
            payload.paymentOptions)
            .then((snap)=> {
              // Update successful.
              console.log("case, client and payment options added successfully");
              addClientUser(payload.clientDetails.email);
              console.log("case and client added successfully");
              
    
      });
    });  
  });  
}

//add client user account
const addClientUser = (email) => {
  console.log(email)

  
  var fb= fire.getFire();
    fb.auth().createUserWithEmailAndPassword(email, '123456').then(function(userobj) {
      const user = userobj.user
      fb.database().ref("users/"+user.uid).set(
        {
          displayName: user.displayName,
          credit: 0,
          email:user.email,
          image:'',
          type:'client'
        }).then(()=>{
          // res()
        })
      
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
      // ...
    });
}

// Register User
export const register = (user) => (
    dispatch
  ) => {
    
  };

