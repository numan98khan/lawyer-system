import { Switch, Route } from "react-router-dom";
import React, { Component, Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import ProductList from "./components/Buyer/ProductList";
// import Details from "./components/Details";
// import Cart from "./components/Cart";
// import Default from "./components/Default";
// import Modal from "./components/Modal";

import { ProductConsumer } from "./contexts/context.js";
// import { MapConsumer } from "./contexts/mapContext.js";
import AuthNav from "./navigation/AuthNav"
import ClientDrawer from "./navigation/ClientDrawer"
import Navbar from "./navigation/Navbar";
import AdminDrawer from "./navigation/AdminDrawer"
import WorkerDrawer from "./navigation/WorkerDrawer"

import ClientNav from "./navigation/ClientNav"
import AdminNav from "./navigation/AdminNav"
import WorkerNav from "./navigation/WorkerNav"

import Tracker from "./admin/Tracker";

// class App extends Component {
//   render() {
//     // const { isAuthenticated, isVerifying } = this.props;
//     // // console.log("isAuthenticated +++ " + isAuthenticated)
//     return (
//       <Tracker/>
//     );
//   }
// }


class App extends Component {
  render() {
    // const { isAuthenticated, isVerifying } = this.props;
    // // console.log("isAuthenticated +++ " + isAuthenticated)
    return (
      <div className="d-flex flex-column">
        <ProductConsumer>
          {value => {
            if(value.user!==null){
              return <Navbar />   
            }
          }}
          {/*value => {
              return value.isSeller ?  <SellerDrawer /> : <BuyerDrawer />   
          }*/}
        </ProductConsumer>
        
          <ProductConsumer>
            {value => {
              // // console.log(value.user)
              if(value.user!==null && value.user.type === 'admin'){
                return (<AdminDrawer />)   
              }
              else if(value.user!==null && value.user.type === 'worker'){
                // return (<WorkerDrawer />)   
                return (<WorkerDrawer />)   
              }
              else if(value.user!==null && value.user.type === 'client'){
                return (<ClientDrawer />)   
            }
              else{
                return (<AuthNav/>)
              }
            }}
          </ProductConsumer>

          {/* <MapConsumer> */}
          <ProductConsumer>
            {value => {
              if(value.user!=null && value.user.type === 'admin'){
                return <AdminNav/> 
              }
              else if(value.user!=null && value.user.type === 'worker'){
                return <WorkerNav/>  
              }
              else if(value.user!=null && value.user.type === 'client'){
                return (<ClientNav />)   
              }

            }}
            {/*value => {
                return value.isSeller ?  <SellerNav /> : <BuyerNav />   
            }*/}
          </ProductConsumer>
          {/* </MapConsumer> */}
        {/* <Modal /> */}
      </div>
    );
  }
}

// <MainDrawer />
// <BuyerNav />

// <Switch>
//           <Route exact path="/" component={ProductList} />
//           <Route exact path="/products" component={ProductList} />
//           <Route exact path="/categories" component={ProductList} />
//           <Route exact path="/details" component={Details} />
//           <Route exact path="/cart" component={Cart} />
//           <Route component={Default} />
//         </Switch>
        

export default App;
