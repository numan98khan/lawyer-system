// import axios from 'axios';
// import { returnMsg } from './msgActions';
// import history from '../components/history';
import {
  HEARINGS_LOADED,
  HEARINGS_LOADING,
  ADD_HEARING,
  DELETE_HEARING,
  ADD_HEARING_FAILED
} from './types';
import fire from  '../fire';

const updateHearingField = (case_path, key, cell, value, old_value) => (
  dispatch, getState
) => {
  const state = getState();
  const user_email = state.user.user.email;
  // console.log(this.state)
  fire.getFire().database()
    .ref("/hearing_logs/" + case_path + "/" + key + '/')
    .push(
      {
        'date': new Date().toLocaleDateString('en-US'),
        'time':new Date().toLocaleTimeString(),
        'updated_by':user_email,
        'key': cell,
        'new_value': value,
        'prev_value': old_value
      }
    )
}

//add hearing entry
export const addHearingEntry = (details, initCase) => (
  dispatch, getState
) => {
  // dispatch({ type: HEARINGS_LOADING });

  const {next_proceedings, next_proceedings_date, previous_proceedings, previous_proceedings_date, updated_by, ...remaining_keys} = details;
  // const {next_proceedings, next_proceedings_date, previous_proceedings, previous_proceedings_date, updated_by, ...remaining_init} = initCase;
  
  
  return new Promise((resolve, reject)=> {
    // console.log("INSIDE PROMISE")
    // console.log(initCase);
    delete details["isLast"]; 
    // console.log(details);
     
    fire.getFire().database()
    .ref("/hearings")
    .push(details).then((snapshot)=>{
      console.log("added entry to hearings", snapshot);
      console.log(initCase)
      for (var key in remaining_keys) {
        if (remaining_keys.hasOwnProperty(key)) {
            if (remaining_keys[key] !== initCase[key]) {
              // console.log(key + " -> " + remaining_keys[key], initCase[key]);
              // updateHearingField(remaining_keys['file_n']+'/'+remaining_keys['case_n'], snapshot.key, key, remaining_keys[key], initCase[key]);
                    
            }
        }
      }
      dispatch({ type: ADD_HEARING });
      resolve()

    })
    .catch((err)=>{
      console.log(err)
      dispatch({ type: ADD_HEARING_FAILED });
      
      reject(err)
    })
  })
 
}

  // load case
  export const loadHearings = () => (
    dispatch, getState
  ) => {

    dispatch({ type: HEARINGS_LOADING });
    return new Promise((resolve, reject)=> {
      var fb=fire.getFire();
      var peshis = []

      fb.database().ref('/')
        .child('hearings')
        .on("value", function(snapshot) {
          snapshot.forEach((doc) => {
            
            // // console.log(doc.toJSON())
            var tempJSON = doc.toJSON()
            tempJSON['key'] = doc.key
            // if(tempJSON.length<1)
            // return;
                // tempJSON['inCart'] = false
              
                peshis.push(tempJSON);
                // console.log(tempJSON)

          });
          // console.log('hires ', hires.filter(function(el){ return el.state === 'REQUESTED' }).length)

          // console.log("debug it")
          // console.log(new Date(peshis[0].next_proceedings_date))
          var peshisList = peshis.sort((a, b) => new Date(a.next_proceedings_date) - new Date(b.next_proceedings_date))

          var counter = 0;
          var item;
          for (item of peshisList) {
            // ... do something with s ...
            counter += 1 
            item['id'] = counter
          }

          // reduce iterates over each item, using accumulator
          var orderedData = peshisList.reduce((acc, next) => {

            // reusable product var
            var nextProduct = next;
            // find similar orders, and join them
            var exist = acc.find(v => v.case_id === next.case_id);
            if (exist) {

              // order exists, update its products
              exist.peshis.push(nextProduct);
            } else {

              // create new order
              acc.push({
                case_id: next.case_id,
                peshis: [nextProduct]
              })
            }
            return acc
          }, [])

          // console.log(orderedData);
          for (item of orderedData) {
            // ... do something with s ...
            // counter += 1 
            // item['id'] = counter
            // console.log(item.peshis); 
            // const results = peshisList.filter(entry => entry === item.peshis.at(-1));
            // const index = peshisList.findIndex(x => x === item.peshis.at(-1));
            const index = peshisList.findIndex(x => x === item.peshis[item.peshis.length -1]);

            console.log(index); 
            peshisList[index]['isLast'] = true;
            console.log(peshisList[index]); 
            
          }

          dispatch({ 
            type: HEARINGS_LOADED,
            payload: peshisList
          });

          resolve()
          

          // console.log(this.state.clientsList)

      });
    })
    
  };




  // Register User
export const register = (user) => (
    dispatch
  ) => {
    
  };

