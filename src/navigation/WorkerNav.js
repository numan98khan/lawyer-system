import { Switch, Route } from "react-router-dom";
import React, { Component, Fragment } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

        </Switch>
      </Fragment>
    );
  }
}

export default WorkerNav;
