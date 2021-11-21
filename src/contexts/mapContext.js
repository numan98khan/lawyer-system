import React, { Component } from "react";
import fire from  '../fire';

const MapContext = React.createContext();


class MapProvider extends Component {
  
    constructor(props)
    {
      super(props);
    //   this.signUp=this.signUp.bind(this)
    //   this.signIn=this.signIn.bind(this)
    }
    
  
    state = {
      workerCoords: []
    }

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

            this.setTracker();
    
          } else {
            // No user is signed in.
          }
        }.bind(this));
    }

    setTracker = () => {
        var fb=fire.getFire();
        var workers = [];
    
        fb.database().ref('/')
          .child('workers')
          .on("value", function(snapshot) {
            workers = []
            snapshot.forEach((doc) => {
              
              // // console.log(doc.toJSON())
              var tempJSON = doc.toJSON()  
                  tempJSON['id'] = doc.key
                  // tempJSON['inCart'] = false
                
                  workers.push(tempJSON);
                  console.log(tempJSON)
    
            });
            // console.log('hires ', hires.filter(function(el){ return el.state === 'REQUESTED' }).length)
            
            // console.log(this.state.clientsList)
    
            this.setState(() => {
              return { workerCoords: workers};
            },
            // ()=>{console.log(this.state.clientsList)}
            );
    
            // console.log(this.state.clientsList)
    
        }.bind(this));
        
    }

    render() {
        return (
            <MapContext.Provider
            value={{
                ...this.state,
                getProduct: this.getProduct
            }}
            >
            {this.props.children}
            </MapContext.Provider>
        );
    }
}
const MapConsumer = MapContext.Consumer;
export { MapProvider, MapConsumer, MapContext };
    