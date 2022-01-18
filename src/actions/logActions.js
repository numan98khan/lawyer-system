// import axios from 'axios';
// import { returnMsg } from './msgActions';
// import history from '../components/history';
import {
  LOGS_LOADED,
  LOGS_LOADING,
  ADD_LOG,
  DELETE_LOG
  // FILTER_CASE
} from '../actions/types';
import fire from  '../fire';




  // load case
  export const loadLogs = (casePath) => (
    dispatch, getState
  ) => {
    dispatch({ type: LOGS_LOADING });
    
    return new Promise((res,rej)=>{
      var peshis = []
    var fb=fire.getFire();
    fb.database().ref('/')
      .child('hearing_logs/' + casePath + '/')
      .on("value", function(snapshot) {
        snapshot.forEach((doc) => {
          
          // // console.log(doc.toJSON())
          var tempJSON = doc.toJSON()
          tempJSON['key'] = doc.key

          for(var obj in tempJSON){          
            if (obj !== 'key'){

              peshis.push(tempJSON[obj]);
            }
          }

        });
        var peshisList = peshis.sort((a, b) => new Date(a.next_proceedings_date) - new Date(b.next_proceedings_date))

        var counter = 0;
        var item;
        for (item of peshisList) {
          // ... do something with s ...
          counter += 1 
          item['id'] = counter
        }
        
        dispatch({ 
          type: LOGS_LOADED,
          payload: peshisList
        });
        res()

    });

    })
    
  };

