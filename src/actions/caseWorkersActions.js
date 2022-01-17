// import axios from 'axios';
// import { returnMsg } from './msgActions';
// import history from '../components/history';
import {
  CASEWORKERS_LOADED,
  CASEWORKERS_LOADING,
  ADD_CASEWORKER,
  DELETE_CASEWORKER
  // FILTER_CASE
} from '../actions/types';
import fire from  '../fire';




  // load case
  export const loadCaseWorkers = (casePath) => (
    dispatch, getState
  ) => {

    dispatch({ type: CASEWORKERS_LOADING });
    
    var fb=fire.getFire();
    var workers = [];

    fb.database().ref('/')
      .child('CaseWorkers')
      .on("value", function(snapshot) {
        workers = []
        snapshot.forEach((doc) => {
          
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
            
              workers.push(tempJSON);

        });

        dispatch({
          type: CASEWORKERS_LOADED,
          payload: workers
        });

        // console.log(this.state.clientsList)

    });

    
  };


  // function still has an error
  // C:/Users/numan/OneDrive/Desktop/salore/lawyer-system/src/actions/userActions.js:33
  // probably related to type inside the user object
  // Salar will handle this
  export const addWorker = (payload) => (
    dispatch, getState
  ) => {

    const {username, email, firstName, lastName, password, nationality, country, town, zipcode, cnic, contactNumber, address, dob, title } = payload;
    var dobstring = dob.toLocaleDateString('en-US')
      
    const state = getState();
    const userid = state.user.user.uid; 

    
      var fb= fire.getFire();
      return  new Promise((res, rej)=>{

        fb.auth().createUserWithEmailAndPassword(email, password).then(function() {
          // Update successful.
          fb.auth().onAuthStateChanged(user => {
            console.log('user image updated!!!')
            console.log("user: " + user);
            
            user.updateProfile({
              // photoURL: image,
              displayName: username
            }).then(function() {
              console.log("add worker code deployed")
              // Update successful. Add to workers table
              // /* 
              fb.database().ref("CaseWorkers/"+userid).set(
                {
                  displayName: username,
                  email: email,
                  firstName: firstName,
                  lastName: lastName,
                  nationality: nationality, 
                  country: country, 
                  town: town, 
                  zipcode: zipcode, 
                  cnic: cnic, 
                  contactNumber: contactNumber, 
                  address: address, 
                  dob: dobstring, 
                  title: title,
                  type: 'worker'
                }).then(function(){
                  fb.database().ref("users/"+user.uid).set(
                    {
                      displayName: username,
                      credit: 0,
                      email:email,
                      image:'',
                      type:'worker'
                    }).then(()=>{
                      res()
                    })
                })

              // */
  
          });
        });
      }).catch(function(error) {
        // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage)
        });
      })
      

  }
