// import axios from 'axios';
// import { returnMsg } from './msgActions';
// import history from '../components/history';
import {
    CLIENTS_LOADED,
    CLIENTS_LOADING,
    DELETE_CLIENT
  } from './types';
  import fire from  '../fire';
  
  
  
  
    // load case
    export const loadClients = () => (
      dispatch, getState
    ) => {
  
      dispatch({ type: CLIENTS_LOADING });
      
      var fb=fire.getFire();
      var clients = []
      fb.database().ref('/')
      .child('clients')
      .on("value", function(snapshot) {
        snapshot.forEach((doc) => {

          // console.log("tempJSON");
          
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
              // console.log(tempJSON);
              //if user type is worker then filter client ids according to case ids in files list
              clients.push(tempJSON);

        });

        dispatch({
            type: CLIENTS_LOADED,
            payload: clients
        })

    })
  
      
    };
  
  
    // Register User
  export const register = (user) => (
      dispatch
    ) => {
      
    };
  
  