import React, { Component } from "react";
// import { storeProducts, detailProduct } from "./data";
import fire from  '../fire';

const PeshiContext = React.createContext();



class PeshiProductProvider extends Component {
  
  constructor(props)
  {
    super(props);
  }
  

  state = {
    user:null,
    userData: [],
    peshiList: [],
  };


  componentWillMount() {
    // this.setProducts();
    // this.setOffers();
    // this.setProductReviews();
    // this.setProductOrders();

    fire.getFire().auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("USER +> " + user.uid)
        this.setState({user:user})
        console.log(user)
        
        // this.setProducts();
        // this.setOffers();
        // this.setProductReviews();
        // this.setReviews();
        // this.setProductOrders();
        // this.setSellerOrders();
        
        this.setUserData();
        this.setPeshiList();

      } else {
        // No user is signed in.
      }
      // // console.log("what", this.state.user)
    }.bind(this));




    // fire.getFire().auth().signOut().then(function() {
    //   // Sign-out successful.
    // }).catch(function(error) {
    //   // An error happened.
    // });

  }

  setPeshiList = () => {
    // console.log(this.state.user.email)
    console.log("setting peshi list")
    var fb = fire.getFire();
    var peshis = [];

    fb.database().ref('/')
      .child('hearings')
      .on("value", function(snapshot) {
        peshis = []
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

        console.log("debug it")
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

        console.log(orderedData);
        for (item of orderedData) {
          // ... do something with s ...
          // counter += 1 
          // item['id'] = counter
          console.log(item.peshis); 
          // const results = peshisList.filter(entry => entry === item.peshis.at(-1));
          const index = peshisList.findIndex(x => x === item.peshis.at(-1));

          // console.log(index); 
          peshisList[index]['isLast'] = true;
          console.log(peshisList[index]); 
          
        }



        this.setState(
           { peshiList: peshisList}
           , ()=>{console.log(this.state.peshiList)}
        );

        // console.log(this.state.clientsList)

    }.bind(this));    
  }
  
  //add hearing entry
  addHearingEntry = (details, initCase) => {
    console.log(details)
    const {next_proceedings, next_proceedings_date, previous_proceedings, previous_proceedings_date, updated_by, ...remaining_keys} = details;
    // const {next_proceedings, next_proceedings_date, previous_proceedings, previous_proceedings_date, updated_by, ...remaining_init} = initCase;
    
    
    return new Promise((resolve, reject)=> {
      console.log(initCase);
       
      // console.log(initCase)
      fire.getFire().database()
      .ref("/hearings")
      .push(details).then((snapshot)=>{
        console.log("added entry to hearings", snapshot.key);
        for (var key in remaining_keys) {
          if (remaining_keys.hasOwnProperty(key)) {
              if (remaining_keys[key] !== initCase[key]) {
                // console.log(key + " -> " + remaining_keys[key], initCase[key]);
                this.updateHearingField(remaining_keys['file_n']+'/'+remaining_keys['case_n'], snapshot.key, key, remaining_keys[key], initCase[key]);
                      
              }
          }
        }
        resolve()
      })
      .catch((err)=>{
        reject(err)
      })
    })
   
  }

  updateHearingField = (case_path, key, cell, value, old_value) => {
    // console.log(this.state)
    fire.getFire().database()
      .ref("/hearing_logs/" + case_path + "/" + key + '/')
      .push(
        {
          'date': new Date().toLocaleDateString('en-US'),
          'time':new Date().toLocaleTimeString(),
          'updated_by':this.state.user.email,
          'key': cell,
          'new_value': value,
          'prev_value': old_value
        }
      )
  }

  updateHearing(cell, value, key, old_value, case_path){
    var update = {}


    update[cell] = value

    // console.log(update, temp)
    console.log("update!",cell, value, key, old_value)
    fire.getFire().database()
                .ref("/hearings/" + key + '/')
                .update(update).then(
                  (snap)=> {
                    this.updateHearingField(case_path, key, cell, value, old_value);
                    
                  }
                )
  }



  setUserData = () => {
    var fb=fire.getFire();
    var userData=[];

    fb.database().ref('/')
      .child('users')
      // .orderByChild('buyerId')
      // .equalTo(this.state.user.uid)
      .once("value", function(snapshot) {
        userData=[];
        snapshot.forEach((doc) => {
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
          // console.log(tempJSON)            
          userData.push(tempJSON);
        });
        // // console.log(offers)
        // // console.log(userData)

        this.setState(() => {
          return { userData: userData };
        });

    }.bind(this));
  };

  
  render() {
    return (
      <PeshiContext.Provider
        value={{
          ...this.state,
          addHearingEntry: this.addHearingEntry,
          updateHearing: this.updateHearing,
          updateHearingField: this.updateHearingField,
          setPeshiList: this.setPeshiList
        }}
      >
        {this.props.children}
      </PeshiContext.Provider>
    );
  }
}
const PeshiProductConsumer = PeshiContext.Consumer;
export { PeshiProductProvider, PeshiProductConsumer, PeshiContext };
