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


  // Register User
export const register = (user) => (
    dispatch
  ) => {
    
  };

