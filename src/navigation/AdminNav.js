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
import addWorker from "../admin/Workers/addWorker";
import Hearings from "../admin/Tasks";
import addcasedetails from "../admin/NewCase/casedetails";
import PaymentOptions from "../admin/NewCase/PaymentOptions";
import Clients from "../admin/Clients";
import Cases from "../admin/Cases";
import ClientDetails from "../admin/Clients/DisplayItem";
import CaseDetails from "../admin/Cases/DisplayItem";
import LogSheet from "../admin/LogSheet";

// import Tracker from "../admin/Tracker";
import Workers from "../admin/Workers";

class AdminNav extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/newcase" component={NewCase} />
          <Route exact path="/calender" component={Calender} />
          <Route exact path="/hearings" component={Hearings} />
          <Route exact path="/consultations" component={Consultations} />
          <Route exact path="/accounts" component={Accounts} />
          <Route exact path="/addclient" component={Addclient} />
          <Route exact path="/addworker" component={addWorker} />
          <Route exact path="/addcasedetails" component={addcasedetails} />
          <Route exact path="/paymentoptions" component={PaymentOptions} />
          <Route exact path="/casedetails" component={CaseDetails} />
          <Route exact path="/clientdetails" component={ClientDetails} />
          <Route exact path="/clients" component={Clients} />
          <Route exact path="/cases" component={Cases} />
          <Route exact path="/logsheet" component={LogSheet} />
          {/* <Route exact path="/tracker" component={Tracker} /> */}
          <Route exact path="/workers" component={Workers} />

          {/* <Route exact path="/products" component={ProductList} />
          <Route component={Default} /> */}
        </Switch>
      </Fragment>
    );
  }
}

export default AdminNav;
