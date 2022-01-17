import React, { Component } from "react";
import { storeProducts, detailProduct } from "../data";
import fire from  '../fire';

const ProductContext = React.createContext();

// fb.database().ref('/')
//   .child('offers')
//   .orderByChild('email')
//   .equalTo('noma@gmail.com')
//   .once("value", function(snapshot) {
//     // // console.log(snapshot.val().key();

//     snapshot.forEach(function(data) {
//         // console.log(data.key);
//     });
// });

class ProductProvider extends Component {
  
  constructor(props)
  {
    super(props);
    this.signUp=this.signUp.bind(this)
    this.signIn=this.signIn.bind(this)
  }
  

  state = {
    products: [],
    productsDup: [],
    caseWorkers: [],
    // productsLive: [],
    categories: [],
    offers: [],
    productReviews: [],
    buyerOrders: [],
    sellerOrders: [],
    categories: [],
    reviews: [],
    hire: [],
    ads: [],
    specials: [],
    hireNotifs: [],
    offerNotifs: [],
    hireCount: 0,
    offerCount: 0,
    detailProduct: detailProduct,
    reviewDetail: {
      "firstName" : "SHVwr8W2YTZMazMHFDudldLtlJD2",
      "companyName" : "-M4g6ifSMTQ5ZovvEBjZ",
      },
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    currentScreen: 'products',
    isDrawerVisible: false,
    // isDrawerVisible: true,
    // isSeller: false,
    isSeller: true,
    // uid: "uHrYlhp39KS7Bsl5FYsSQzm9m8x2",
    isRDetailsPopUp: false,
    user:null,
    userData: null,

    // case vars
    clientsList: [],
    casesList: [],
    filesList: [],
    peshiList: [],
    logSheetList: []
    // peshiList: [{
    //   key: 1,
    //   id: "haaaaah",
    //   file_n: "haaaaah",
    //   case_n: "haaaaah",
    //   court_case_n: 'sca',
    //   caseTitle: "haaaaah",
    //   nature_of_case: "haaaaah",
    //   category: "haaaaah",
    //   court: "haaaaah",
    //   district: "haaaaah",
    //   judge: "haaaaah",
    //   previous_proceedings: "haaaaah",
    //   prev_proceedings_date: "haaaaah",
    //   next_proceedings_date: "haaaaah",
    //   next_proceedings: "haaaaah",
    //   remarks: "haaaaah",
    //   caseSrc: "haaaaah",
    //   caseSupervisor: "haaaaah",
    //   caseWorker: "haaaaah",
    //   case_clerk: "haaaaah",
    //   other_party: "haaaaah",
    //   updated_by: "haaaaah",
    // },
    // {
    //   key: 1,
    //   id: "haaaaah",
    //   file_n: "haaaaah",
    //   case_n: "haaaaah",
    //   caseTitle: "haaaaah",
    //   court_case_n: 'sca',
    //   nature_of_case: "haaaaah",
    //   category: "haaaaah",
    //   court: "haaaaah",
    //   district: "haaaaah",
    //   judge: "haaaaah",
    //   previous_proceedings: "haaaaah",
    //   prev_proceedings_date: "haaaaah",
    //   next_proceedings_date: "haaaaah",
    //   next_proceedings: "haaaaah",
    //   remarks: "haaaaah",
    //   caseSrc: "haaaaah",
    //   caseSupervisor: "haaaaah",
    //   caseWorker: "haaaaah",
    //   case_clerk: "haaaaah",
    //   other_party: "haaaaah",
    //   updated_by: "haaaaah",
    // },{
    //   key: 1,
    //   id: "haaaaah",
    //   file_n: "haaaaah",
    //   case_n: "haaaaah",
    //   court_case_n: 'sca',
    //   caseTitle: "haaaaah",
    //   nature_of_case: "haaaaah",
    //   category: "haaaaah",
    //   court: "haaaaah",
    //   district: "haaaaah",
    //   judge: "haaaaah",
    //   previous_proceedings: "haaaaah",
    //   prev_proceedings_date: "haaaaah",
    //   next_proceedings_date: "haaaaah",
    //   next_proceedings: "haaaaah",
    //   remarks: "haaaaah",
    //   caseSrc: "haaaaah",
    //   caseSupervisor: "haaaaah",
    //   caseWorker: "haaaaah",
    //   case_clerk: "haaaaah",
    //   other_party: "haaaaah",
    //   updated_by: "haaaaah",
    // }, 
    // ]
  };


  componentWillMount() {
    

  }

  setTracker = () => {
    var fb=fire.getFire();
    var workers = [];


    fb.database().ref('/')
      .child('workers')
      .on("value", function(snapshot) {
        workers = []
        // console.log(snapshot)
        snapshot.forEach((doc) => {
          
          // // console.log(doc.toJSON())
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
              // tempJSON['inCart'] = false
            
              workers.push(tempJSON);
              // console.log(tempJSON)

        });
        // console.log('hires ', hires.filter(function(el){ return el.state === 'REQUESTED' }).length)
        
        // console.log(this.state.clientsList)
        this.setState(
          { workerCoords: workers}, 
        );

        // this.setState(() => {
        //   { workerCoords: workers};
        // },
        //   ()=>{console.log('workers set!!!', this.state.workerCoords)}
        // );

        // console.log(this.state.clientsList)

    }.bind(this));
    
}

  setLogSheet = (casePath) => {
    // console.log(this.state.user.email)
    console.log("setting log sheet", casePath)
    var fb = fire.getFire();
    var peshis = [];

    fb.database().ref('/')
      .child('hearing_logs/' + casePath + '/')
      .on("value", function(snapshot) {
        snapshot.forEach((doc) => {
          // // console.log(doc.toJSON())
          var tempJSON = doc.toJSON()
          tempJSON['key'] = doc.key
          // if(tempJSON.length<1)
          // return;
              // tempJSON['inCart'] = false
          
          // console.log(tempJSON);
          // for (item of tempJSON) {
          //   // ... do something with s ...
          //   // counter += 1 
          //   // item['id'] = counter
          //   console.log(item);
          // }

          for(var obj in tempJSON){
            // console.log(tempJSON[obj])
          
            if (obj !== 'key'){

              peshis.push(tempJSON[obj]);
            }
          }
          // console.log(tempJSON)

        });
        // console.log('hires ', hires.filter(function(el){ return el.state === 'REQUESTED' }).length)
        
        // console.log("DEBUG IT!")
        // console.log(new Date(peshis[0].next_proceedings_date))
        var peshisList = peshis.sort((a, b) => new Date(a.next_proceedings_date) - new Date(b.next_proceedings_date))

        var counter = 0;
        var item;
        for (item of peshisList) {
          // ... do something with s ...
          counter += 1 
          item['id'] = counter
        }

        this.setState(
           { logSheetList: peshisList}
        );

        // console.log(this.state.clientsList)

    }.bind(this));    
  }

  setPeshiList = () => {
    // console.log(this.state.user.email)
    // console.log("setting peshi list")
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



        this.setState(
           { peshiList: peshisList}
          //  , ()=>{console.log(this.state.peshiList)}
        );

        // console.log(this.state.clientsList)

    }.bind(this));    
  }

  setFiles = () => {
    // console.log("setting files")
    var fb=fire.getFire();
    var files = [];

    fb.database().ref('/')
      .child('files')
      .on("value", function(snapshot) {
        files = []
        snapshot.forEach((doc) => {
          
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
              //filter the cases if user type is worker and then push
              files.push(tempJSON);

        });
        

        this.setState(
           { filesList: files}
          //  , ()=>{console.log(this.state.filesList)}
        );


    }.bind(this));
  }
  setCaseWorkers = () => {
    // console.log("setting case workers")
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

        this.setState(
           { caseWorkers: workers}
          //  , ()=>{console.log(this.state.caseWorkers)}
        );

        // console.log(this.state.clientsList)

    }.bind(this));
  }

  
  //add hearing entry
  addHearingEntry = (details, initCase) => {
    // console.log(details)
    const {next_proceedings, next_proceedings_date, previous_proceedings, previous_proceedings_date, updated_by, ...remaining_keys} = details;
    // const {next_proceedings, next_proceedings_date, previous_proceedings, previous_proceedings_date, updated_by, ...remaining_init} = initCase;
    
    
    return new Promise((resolve, reject)=> {
      // console.log("INSIDE PROMISE")
      // console.log(initCase);
      delete details["isLast"]; 
      // console.log(details);
       
      // console.log(initCase)
      fire.getFire().database()
      .ref("/hearings")
      .push(details).then((snapshot)=>{
        // console.log("added entry to hearings", snapshot.key);
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
  setClients = () => {
    var fb=fire.getFire();
    var clients = [];

    fb.database().ref('/')
      .child('clients')
      .on("value", function(snapshot) {
        clients = []
        snapshot.forEach((doc) => {

          // console.log("tempJSON");
          
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
              // console.log(tempJSON);
              //if user type is worker then filter client ids according to case ids in files list
              clients.push(tempJSON);

        });

        this.setState(
          { clientsList: clients}
          , ()=>{console.log(this.state.clientsList)}
       );

        // this.setState(() => {
        //   return { clientsList: clients};
        // },
      // );


    }.bind(this));
    
  }

  setCases = () => {
    var fb=fire.getFire();
    var cases = [];

    fb.database().ref('/')
      .child('cases')
      .on("value", function(snapshot) {
        cases = []
        snapshot.forEach((doc) => {
          
            // console.log("cases tempsjon")


          // // console.log(doc.toJSON())
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
              // tempJSON['inCart'] = false
            
              cases.push(tempJSON);
              // console.log(tempJSON)

        });
        // console.log('hires ', hires.filter(function(el){ return el.state === 'REQUESTED' }).length)
        
        // console.log(this.state.clientsList)

        this.setState(
           { casesList: cases}
          //  , ()=>{console.log(this.state.casesList)}
        );

        // console.log(this.state.clientsList)

    }.bind(this));
    
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

  // add case and payments to existing client
  addCaseAndPayments = (payload) => {
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

  //add client user account
  addClientUser = (email) => {
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
        
      }.bind(this)
      ).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // ...
      });
  }

  //adds new client or details for existing client
  addClientAndCase = (payload) => {
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
      this.addCaseAndPayments(payload);
    }
  });
  //return if id exists
  if (id)
    return;
  
  //if new users then add client and make new client user, case, payment options
  //convert dates to strings
  // payload.paymentOptions.installmentDate = payload.paymentOptions.installmentDate.toLocaleString();
  this.uploadPayload(payload);
  }

  uploadPayload = (payload) => {
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
                this.addClientUser(payload.clientDetails.email);
                console.log("case and client added successfully");
                
      
        });
      });  
    });  
  }


//   storeInDatabase(Email,Display,Password)
// {
//     var fb=fire.getFire();
//     fb.database().ref().child('users').push({
//       email:Email,
//       displayName: Display,
//     });
//     //   // console.log(id.key)
//     //   this.props.setUserId(id.key)
// }

  signIn(email,password)
  {
    
    
    
  
  }

  signUp(email,displayname,password, image)
  {

    // user => {
    //   // // console.log("ewfew",user);
    // //  history.push('/products')

    // user.updateProfile({
    //   photoURL: image,
    //   displayName: displayname
    // }).then(function() {
    //   // Update successful.
    //   fb.auth().onAuthStateChanged(user => {
    //     console.log('user image updated!!!')
    //     console.log("user: " + user);
    //     fb.database().ref("users/"+user.uid).set(
    //       {
    //         displayName: user.displayName,
    //         credit: 0,
    //         email: user.email,
    //         image: user.photoURL,
    //       })
    //   });
      
    // }

    //const history = useHistory()
    // // console.log('bih ', email, displayname, password)
      var fb= fire.getFire();
      fb.auth().createUserWithEmailAndPassword(email, password).then(function() {
        // Update successful.
        fb.auth().onAuthStateChanged(user => {
          console.log('user image updated!!!')
          console.log("user: " + user);
          
          user.updateProfile({
            photoURL: image,
            displayName: displayname
          }).then(function() {
            // Update successful.

            this.setState(() => {
              return {
                user: user,
              };
            }); 

            fb.auth().onAuthStateChanged(user => {
              console.log('user image updated!!!')
              console.log("user: " + user);
              fb.database().ref("users/"+user.uid).set(
                {
                  displayName: user.displayName,
                  credit: 0,
                  email: user.email,
                  image: user.photoURL,
                })
            });

        }.bind(this));
        
      }).bind(this);

          // this.setState(() => {
          //   return {
          //     user: user,
          //   };
          // }); 
        }.bind(this)
      ).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
      // ...
      });
      // this.storeInDatabase(email,displayname)
      // this.setState(() => {
      //   return {
      //     user: USER,
      //   };
      // });
    //this.props.setUser(user)

  }
  addWorker(payload)
  {
    const {username, email, firstName, lastName, password, nationality, country, town, zipcode, cnic, contactNumber, address, dob, title } = payload;
    var dobstring = dob.toLocaleDateString('en-US')
     
    
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
              // Update successful. Add to workers table
              fb.database().ref("CaseWorkers/"+user.uid).set(
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
  
          }.bind(this));
          
        }).bind(this);
          }.bind(this)
        ).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        });
      })
      

  }

  signOut = () => {
    // alert("SIGNED OUT")
    fire.getFire().auth().signOut();
    this.setState({user:null} , () => {
    //   this.setState({
    //     reset:func
    //   
  })
    
  }


  // setUserData = (uid) => {
  //   console.log(uid)
  //   return new Promise(async (resolve, reject)=>{
  //     var fb=fire.getFire();
  //     // var userData=[];
  //     fb.database().ref('/')
  //       .child('users/'+uid)
  //       // .orderByChild('')
  //       // .equalTo(uid)
  //       .once("value", function(snapshot) {
  //         const userData = snapshot.val()
  
  //         this.setState({
  //           userData: userData
  //         },()=>{
  //           return resolve(userData)
  //         })
  
  //     }.bind(this));
  //   })
 
  // };

  // getProductReviewsByProductId

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    // const product = this.getItem(id);
    // console.log('setting ', id.name)
    this.setState(() => {
      return { detailProduct: id };
    });
  };
  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;

    const price = product.price;
    product.total = price;

    fire.getFire().database()
      .ref("cartWeb/"+this.state.user.uid)
      // .push()
      .set(
        {
          product: tempProducts,
          cart: [...this.state.cart, product],
        })

    this.setState(
      () => {
        return { product: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotals();
      }
    );
  };
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return {
        modalProduct: product,
        modalOpen: true
      };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return {
        modalOpen: false
      };
    });
  };
  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count += 1;
    product.total = product.count * product.price;

    // console.log('consola ', product)

    this.setState(
      () => {
        return {
          cart: [...tempCart]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count -= 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return {
            cart: [...tempCart]
          };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };
  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id != id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removeProduct = tempProducts[index];
    removeProduct.inCart = false;
    removeProduct.count = 0;
    removeProduct.total = 0;
    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  clearCart = () => {
    fire.getFire().database().ref('/')
    .child('cartWeb/'+this.state.user.uid)//+this.state.user.uid
    // .orderByChild('buyerId')
    // .equalTo(this.state.user.uid)
    .remove();

    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  addTotals = () => {
    let subtotal = 0;
    this.state.cart.map(item => (subtotal += item.total));
    const tempTax = subtotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subtotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subtotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };

  switchScreen = screen => {
    // let subtotal = 0;
    // this.state.cart.map(item => (subtotal += item.total));
    // const tempTax = subtotal * 0.1;
    // const tax = parseFloat(tempTax.toFixed(2));
    // const total = subtotal + tax;
    this.setState(() => {
      return {
        currentScreen: screen,
      };
    });
  };

  handleDrawerOpen = () => {
    this.setState(() => {
      return {
        isDrawerVisible: true,
      };
    });
  };

  handleDrawerClose = () => {
    this.setState(() => {
      return {
        isDrawerVisible: false,
      };
    });
  };

  toggleAppMode = () => {
    // console.log('TOGGLER')
    this.setState(() => {
      return {
        isSeller: this.state.isSeller ? false : true,
      };
    });
  };

  searchProducts = query => {
    // // console.log('nigger '+query.target.value)
    var newArray = this.state.productsDup.filter(function (el) {
      return el.name.toLowerCase().indexOf(query.target.value.toLowerCase()) !== -1
    });
    this.setState(() => {
      return {
        products: newArray,
      };
    });
  }

  handleRDetailClose = () => {
    // this.setState({open: false});
    this.setState(() => {
      return {
        isRDetailsPopUp: false,
      };
    });
  }

  getProduct = id => {
    if (this.state.products.length > 0){
      // console.log(this.state.products[0])
      // console.log(id)
      // console.log('getProduct ', this.state.products.filter(function (el) {
      //   return el.id === id
      // })[0]);

      return this.state.products.filter(function (el) {
        return el.id === id
      })[0]
    }
}

  handleRDetailToggle = (review) => {
    // setOpen(!open);
    // this.setState({open: !this.state.open});
    console.log("toggleed", review)
    this.setState(() => {
      return {
        isRDetailsPopUp: !this.state.isRDetailsPopUp,
        reviewDetail: review,
      };
    });
  }

  pushProductReview = review => {

    const reference = fire.getFire().database().ref(`/products/${this.state.detailProduct.id}/aggregateRating`);

    // // console.log('DOOBIE '+reference.value)

    var counter;
    reference.once('value').then(function(snapshot) {
      counter = snapshot.val() ;
      // ...
      return reference.transaction(reviewCount => {
        reviewCount.ratingValue = (((parseInt(reviewCount.ratingValue)*parseInt(reviewCount.reviewCount))+review[0])/
                                  (parseInt(reviewCount.reviewCount)+1)).toString()
        reviewCount.reviewCount = (parseInt(reviewCount.reviewCount)+1).toString()
        // // console.log('DOOBIE '+reviewCount.ratingValue, reviewCount.reviewCount);
        return reviewCount;
      });
    });

    // console.log('thissssss', this.state.user.uid)
    fire.getFire().database()
        .ref("productReviews")
        .push()
        .set(
          {
            buyerId: this.state.user.uid,
            // buyerEmail: this.state.buyerEmail,
            productId: this.state.detailProduct.id,
            productName: this.state.detailProduct.name,
            rating: review[0],
            review: review[1],
            // sellerId: this.props.products.userObj.uid 
          })
  }

  pushProductOffer = offer => {
    // console.log('thissssss', this.state.user.uid)
    fire.getFire().database()
        .ref("offers")
        .push()
        .set(
          {
            buyerId: this.state.user.uid,
            // buyerEmail: this.state.buyerEmail,
            productId: this.state.detailProduct.id,
            productName: this.state.detailProduct.name,
            price: offer,
            status: 'PENDING'
            // sellerId: this.props.products.userObj.uid 
          })
  }


  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          
          signIn: this.signIn,
          signUp: this.signUp,
          signOut: this.signOut,

          // addHearingEntry: this.addHearingEntry,
          
          handleDrawerClose: this.handleDrawerClose,
          handleDrawerOpen: this.handleDrawerOpen,
          
          // addWorker: this.addWorker,


          setTracker: this.setTracker,

          // case function exports
          addClientAndCase :this.addClientAndCase, 

          // this is a utility function 
          addClientUser: this.addClientUser,

          updateHearing: this.updateHearing,
          updateHearingField: this.updateHearingField
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer, ProductContext };
