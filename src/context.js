import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
import fire from  './fire';

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
    uid: "uHrYlhp39KS7Bsl5FYsSQzm9m8x2",
    isRDetailsPopUp: false,
    user:null,
    userData: [],

    // case vars
    clientsList: [],
    casesList: [],
    filesList: []
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
        
        // this.setProducts();
        // this.setOffers();
        // this.setProductReviews();
        // this.setReviews();
        // this.setProductOrders();
        // this.setSellerOrders();
        
        this.setUserData();
        // this.setCategories();
        // this.cartFetchDB();
        // this.setHire();
        // this.setAds();
        // this.setFeatured();
        // this.setNotifData();

        // this.signOut();
        // this.userGoLive();
        // this.setState(() => {
        //   return {
        //     user: user,
        //   };
        // });
        // User is signed in.


        // case functions
        this.setClients();
        this.setCases();
        this.setFiles();

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

  setFiles = () => {
    console.log("setting files")
    var fb=fire.getFire();
    var files = [];

    fb.database().ref('/')
      .child('files')
      .on("value", function(snapshot) {
        files = []
        snapshot.forEach((doc) => {
          
          // // console.log(doc.toJSON())
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
              // tempJSON['inCart'] = false
            
              files.push(tempJSON);
              // console.log(tempJSON)

        });
        // console.log('hires ', hires.filter(function(el){ return el.state === 'REQUESTED' }).length)
        
        // console.log(this.state.clientsList)

        this.setState(
           { filesList: files}
          //  , ()=>{console.log(this.state.filesList)}
        );

        // console.log(this.state.clientsList)

    }.bind(this));
  }

  //add hearing entry
  addHearingEntry = (details) => {
    return new Promise((resolve, reject)=> {
      fire.getFire().database()
      .ref("/hearings")
      .push(details).then(()=>{
        console.log("added entry to hearings")
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
          
          // // console.log(doc.toJSON())
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
              // tempJSON['inCart'] = false
            
              clients.push(tempJSON);
              // console.log(tempJSON)

        });
        // console.log('hires ', hires.filter(function(el){ return el.state === 'REQUESTED' }).length)
        
        // console.log(this.state.clientsList)

        this.setState(() => {
          return { clientsList: clients};
        },
        // ()=>{console.log(this.state.clientsList)}
        );

        // console.log(this.state.clientsList)

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

  // add case and payments to existing client
  addCaseAndPayments = (payload) => {
    payload.caseDetails.clientId = payload.clientDetails.id
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
      fb.auth().createUserWithEmailAndPassword(email, '123456').then(function() {
        
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


          // fire.getFire().database().ref("files/"+case_key).once("value")

          /*
          fire.getFire().database().ref("files").orderByChild("case_id").equalTo(case_key).once("value",snapshot => {
            // console.log("checking this", snapshot.val());
            if (snapshot.exists()){
                
                const userData = snapshot.val();
                // console.log("exists!", Object.keys(snapshot.toJSON())[0]);
                
                var file_key = Object.keys(snapshot.toJSON())[0];
                fire.getFire().database().ref("files/" + file_key.toString() + "/").transaction(function(file_) {
                  console.log("transact!");
                  if (file_) {
                    
                    file_.no++;
                     
                  }
                  // console.log("post:" , post);
                  // console.log("liked: ", liked);
                  return file_;
                });
                // liked = false;
              }
          });
          //*/
          
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
          // Code for case addition to the same client file
          /*
          client_key = "-MjQPM-yOQGsKRb79SII"

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
                .set({case_id: case_key})
            
              });

                // fire.getFire().database().ref("files/" + file_key.toString() + "/cases/").child
            }
          });

          //*/

          /*
          fire.getFire().database().ref("files/"+client_key).once("value")
            .then(function(snapshot) {
              var a = snapshot.exists();  // true
              console.log(a);
              
              if (a) {
                console.log(case_key)
                
                // fire.getFire().database()
                // .ref("/files")
                // .child().set()
              } else {
                
                fire.getFire().database().ref("/files").once("value")
                  .then(function(snapshot) {
                    // console.log(snapshot.numChildren()); 
                      
                    fire.getFire().database().ref("/files").once("value")
                      .then(function(snapshot) {
                        
                    });

                    fire.getFire().database()
                    .ref("/files")
                    .child(client_key).set({no:0, case_id:case_key})
                    .then(function(snapshot) { 
                      fire.getFire().database()
                      .ref("/files")
                      .child(client_key).set({no:0, case_id:case_key})
                    })

                    // console.log(ref_file.numChildren())

                  });

              }
            });
            //*/

            // console.log(a);

          // fire.getFire().database()
          // .ref("/cases")
          // .push()
          // console.log(snap.doc)
          
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
    
    
    // // console.log("sign in", email, password);
    var USER=fire.getFire().auth().signInWithEmailAndPassword(email, password).then(
      user => {
        console.log("ewfew",user.uid);

        fire.getFire().auth().onAuthStateChanged(function(user) {
          if (user) {

            fire.getFire().database()
            .ref('/')
            .child('blocks')
            .orderByChild('userid')
            .equalTo(user.uid)
            .on("value", function(snapshot) {
              // uHrYlhp39KS7Bsl5FYsSQzm9m8x2  
            // console.log(snapshot);
              var orderList = [];
              // alert("DEBUG")
              console.log('Debug 2')
              console.log(user.uid)
              console.log(snapshot.val())
                
              snapshot.forEach(function(data) {
                console.log(data.val().userid)
                if (data.val().userid === user.uid){
                  // this.signOutUser()
                  fire.getFire().auth().signOut();
                  this.signOut();
                  console.log("You are blocked!!!")
                  // this.setState({ errorMessage: "You are blocked!!!" })
                } else {
                  this.setState(() => {
                    return {
                      user: user,
                    };
                  });
                }
                orderList.push(data.val());
              }.bind(this));
                // this.setState({orderList: orderList});
                // this.countTotalSpending();
                // this.orderProducts();
                // console.log(orderList)
          }.bind(this));

          }
        }.bind(this));

        
        // this.setState(() => {
        //   return {
        //     user: user,
        //   };
        // });
      }
    ).catch(error => {
      console.error("Error signing in with password and email", error);
    });
  
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

  signOut = () => {
    // alert("SIGNED OUT")
    fire.getFire().auth().signOut();
    this.setState({user:null} , () => {
    //   this.setState({
    //     reset:func
    //   
  })
    
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
          // userGoLive: this.userGoLive,
          // updateLiveP: this.updateLiveP,
          
          getProduct: this.getProduct,
          
          // pushProductOffer: this.pushProductOffer,
          // pushProductReview: this.pushProductReview,
          
          signIn: this.signIn,
          signUp: this.signUp,
          storeInDatabase: this.storeInDatabase,
          signOut: this.signOut,
          addHearingEntry: this.addHearingEntry,
          handleRDetailClose: this.handleRDetailClose,
          handleRDetailToggle: this.handleRDetailToggle,
          
          // searchProducts: this.searchProducts,
          searchClients: this.searchClients,
          
          toggleAppMode: this.toggleAppMode,
          handleDrawerClose: this.handleDrawerClose,
          handleDrawerOpen: this.handleDrawerOpen,
          switchScreen: this.switchScreen, // Register
          handleDetail: this.handleDetail,
          
          // addToCart: this.addToCart,
          
          openModal: this.openModal,
          closeModal: this.closeModal,

          // increment: this.increment,
          // decrement: this.decrement,
          // removeItem: this.removeItem,
          // clearCart: this.clearCart,
          // checkoutCart: this.checkoutCart, 

          // case function exports
          addClientAndCase :this.addClientAndCase, 
          addClientUser: this.addClientUser
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer, ProductContext };
