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

