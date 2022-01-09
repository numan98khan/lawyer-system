import { Switch, Route } from "react-router-dom";
import React, { Component, Fragment } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tasks from "../admin/Tasks";
import Clients from "../admin/Clients";
import Cases from "../admin/Cases";

import Home from "../worker/Home";


class WorkerNav extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          
          <Route exact path="/" component={Home} />
          
          {/*
            peshi adding and editting
            viewing peshis
            view own cases
            view own clients
          */}

          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/clients" component={Clients} />
          <Route exact path="/cases" component={Cases} />



        </Switch>
      </Fragment>
    );
  }
}

export default WorkerNav;
