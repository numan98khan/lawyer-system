// import axios from 'axios';
// import { returnMsg } from './msgActions';
// import history from '../components/history';
import {
  HEARINGS_LOADED,
  HEARINGS_LOADING,
  DELETE_HEARING
} from './types';
import fire from  '../fire';




  // load case
  export const loadHearings = () => (
    dispatch, getState
  ) => {

    dispatch({ type: HEARINGS_LOADING });
    
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

          // console.log(index); 
          peshisList[index]['isLast'] = true;
          // console.log(peshisList[index]); 
          
        }
        dispatch({ 
          type: HEARINGS_LOADED,
          payload: peshisList
        });
        

        // console.log(this.state.clientsList)

    });

    
  };


  // Register User
export const register = (user) => (
    dispatch
  ) => {
    
  };

