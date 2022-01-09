import { Switch, Route } from "react-router-dom";
import React, { Component, Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from './store';
import { loadUser } from "./actions/userActions";
import { connect } from 'react-redux';
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
  componentDidMount()
  {
    store.dispatch(loadUser());
  }

  render() {
    // const { isAuthenticated, isVerifying } = this.props;
    // // console.log("isAuthenticated +++ " + isAuthenticated)
    return (
      <div className="d-flex flex-column">
        {
          this.props.user.user!==null?
          <Navbar/>:
          null
        }
        {
          this.props.user.user.type?null:
          (
            this.props.user.user.type === 'admin'?
            <AdminDrawer/>:
            (
              this.props.user.user.type === 'worker'?
              <WorkerDrawer/>
              :
              (
                this.props.user.user.type === 'client'?
                <ClientDrawer/>:
                null
                // console.log(this.props.user.user.type)
              )
            )
          )
        }
          {/* <ProductConsumer>
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
          </ProductConsumer> */}

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
        

const mapStateToProps = (state) => ({
  user: state.user,
  type: state.type
});
export default connect(mapStateToProps, { })(
  App
);
