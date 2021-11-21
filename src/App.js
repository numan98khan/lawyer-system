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

import AdminNav from "./navigation/AdminNav"

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
      <Fragment>
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
              if(value.user!==null){
              // return (<ClientDrawer />)   
              return (<AdminDrawer />)   
            }
              else{
                return (<AuthNav/>)
              }
            }}
          </ProductConsumer>

          {/* <MapConsumer> */}
          <ProductConsumer>
            {value => {
              if(value.user!=null){
                return <AdminNav/> 
              }

            }}
            {/*value => {
                return value.isSeller ?  <SellerNav /> : <BuyerNav />   
            }*/}
          </ProductConsumer>
          {/* </MapConsumer> */}
        {/* <Modal /> */}
      </Fragment>
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
