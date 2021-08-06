import { Switch, Route } from "react-router-dom";
import React, { Component, Fragment } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../admin/Home";
import Accounts from "../admin/Accounts";
import Calender from "../admin/Calender";
import Consultations from "../admin/Consultations";
import NewCase from "../admin/NewCase";
import Addclient from "../admin/NewCase/Addclient";
import Tasks from "../admin/Tasks";
import casedetails from "../admin/NewCase/casedetails";
import PaymentOptions from "../admin/NewCase/PaymentOptions";

import ClientDetails from "../admin/Home/DisplayItem";

class AdminNav extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          
          <Route exact path="/" component={Home} />
          
          <Route exact path="/newcase" component={NewCase} />
          <Route exact path="/calender" component={Calender} />
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/consultations" component={Consultations} />
          <Route exact path="/accounts" component={Accounts} />
          <Route exact path="/addclient" component={Addclient} />
          <Route exact path="/casedetails" component={casedetails} />
          <Route exact path="/paymentoptions" component={PaymentOptions} />
          
          <Route exact path="/clientdetails" component={ClientDetails} />
          
          {/* <Route exact path="/products" component={ProductList} />
          <Route component={Default} /> */}

        </Switch>
      </Fragment>
    );
  }
}

export default AdminNav;
